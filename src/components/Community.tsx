import React, { useState, useEffect } from 'react';
import '../styles/Community.css';
import { supabase } from '../supabase';

type Profile = {
  id: string;
  full_name: string;
  avatar_url: string;
  updated_at?: string;
};

type Post = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profile?: Profile;
  likes: number;
  liked: boolean;
  comments: Comment[];
};

type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profile?: Profile;
};

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newComments, setNewComments] = useState<{ [postId: string]: string }>({});
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserProfile, setCurrentUserProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile(userId: string, authUser: any): Promise<Profile | null> {
    let profile: Profile | null = null;

    if (authUser && authUser.user_metadata && authUser.user_metadata.full_name) {
      profile = {
        id: userId,
        full_name: authUser.user_metadata.full_name,
        avatar_url: authUser.user_metadata.avatar_url || 'https://avatar.iran.liara.run/public',
      };
    }

    if (!profile) {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url, updated_at')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
      } else if (data) {
        profile = data;
      }
    }

    if (!profile) {
      const fullName = authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Anonymous User';
      const avatarUrl = authUser.user_metadata?.avatar_url || 'https://avatar.iran.liara.run/public';

      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          full_name: fullName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error('Error creating profile:', insertError);
      } else {
        const { data: newProfileData, error: fetchError } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url, updated_at')
          .eq('id', userId)
          .single();

        if (fetchError) {
          console.error('Error fetching new profile:', fetchError);
        } else if (newProfileData) {
          profile = newProfileData;
        }
      }
    }

    return profile;
  }

  useEffect(() => {
    async function init() {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error);
        setLoading(false);
        return;
      }

      const userId = currentSession?.user?.id || null;
      setCurrentUserId(userId);

      if (userId && currentSession?.user) {
        const profile = await loadProfile(userId, currentSession.user);
        setCurrentUserProfile(profile);
      }

      await fetchData(userId);
      setLoading(false);
    }

    init();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const userId = session?.user?.id || null;
      setCurrentUserId(userId);

      if (userId && session?.user) {
        const profile = await loadProfile(userId, session.user);
        setCurrentUserProfile(profile);
      } else {
        setCurrentUserProfile(null);
      }

      await fetchData(userId);
    });

    const channels = [
      supabase.channel('posts').on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        () => fetchData(currentUserId)
      ).subscribe(),
      supabase.channel('comments').on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'comments' },
        () => fetchData(currentUserId)
      ).subscribe(),
      supabase.channel('likes').on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'likes' },
        () => fetchData(currentUserId)
      ).subscribe()
    ];

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchData = async (userId: string | null) => {
    try {
      setLoading(true);

      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('id, user_id, content, created_at')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      if (!postsData || postsData.length === 0) {
        setPosts([]);
        return;
      }

      const userIds = postsData.reduce<string[]>((acc, p) => {
        if (!acc.includes(p.user_id)) {
          acc.push(p.user_id);
        }
        return acc;
      }, []);

      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', userIds);

      if (profilesError) console.error('Error fetching profiles:', profilesError);

      const profilesMap: { [id: string]: Profile } = {};
      profilesData?.forEach(p => { profilesMap[p.id] = p; });

      const postIds = postsData.map(p => p.id);

      const { data: likesData, error: likesError } = await supabase
        .from('likes')
        .select('post_id, user_id')
        .in('post_id', postIds);

      if (likesError) console.error('Error fetching likes:', likesError);

      const likesByPost: { [postId: string]: any[] } = {};
      likesData?.forEach(l => {
        if (!likesByPost[l.post_id]) likesByPost[l.post_id] = [];
        likesByPost[l.post_id].push(l);
      });

      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('id, post_id, user_id, content, created_at')
        .in('post_id', postIds)
        .order('created_at', { ascending: true });

      if (commentsError) console.error('Error fetching comments:', commentsError);

      const commentsByPost: { [postId: string]: Comment[] } = {};
      commentsData?.forEach(c => {
        const comment: Comment = {
          id: c.id,
          post_id: c.post_id,
          user_id: c.user_id,
          content: c.content,
          created_at: c.created_at,
          profile: profilesMap[c.user_id],
        };
        if (!commentsByPost[c.post_id]) commentsByPost[c.post_id] = [];
        commentsByPost[c.post_id].push(comment);
      });

      const updatedPosts: Post[] = postsData.map(p => {
        const postLikes = likesByPost[p.id] || [];
        return {
          id: p.id,
          user_id: p.user_id,
          content: p.content,
          created_at: p.created_at,
          profile: profilesMap[p.user_id],
          likes: postLikes.length,
          liked: userId ? postLikes.some(l => l.user_id === userId) : false,
          comments: commentsByPost[p.id] || [],
        };
      });

      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error fetching community data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async () => {
    if (!newPostContent.trim() || !currentUserId || !currentUserProfile) {
      alert('Please sign in and enter some content to post');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({ user_id: currentUserId, content: newPostContent.trim() })
        .select('id, user_id, content, created_at')
        .single();

      if (error) throw error;

      const newPost: Post = {
        ...data,
        profile: currentUserProfile,
        likes: 0,
        liked: false,
        comments: [],
      };

      setPosts([newPost, ...posts]);
      setNewPostContent('');
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  const toggleLike = async (postId: string) => {
    if (!currentUserId) {
      alert('Please sign in to like posts');
      return;
    }

    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      if (post.liked) {
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', currentUserId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('likes')
          .insert({ post_id: postId, user_id: currentUserId });

        if (error) throw error;
      }

      setPosts(posts.map(p =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      ));
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('Failed to update like. Please try again.');
    }
  };

  const addComment = async (postId: string) => {
    const content = newComments[postId]?.trim();
    if (!content || !currentUserId || !currentUserProfile) {
      alert('Please sign in and enter a comment');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({ post_id: postId, user_id: currentUserId, content })
        .select('id, post_id, user_id, content, created_at')
        .single();

      if (error) throw error;

      const newComment: Comment = {
        id: data.id,
        post_id: data.post_id,
        user_id: data.user_id,
        content: data.content,
        created_at: data.created_at,
        profile: currentUserProfile,
      };

      setPosts(posts.map(p =>
        p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p
      ));

      setNewComments({ ...newComments, [postId]: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };

  const deletePost = async (postId: string) => {
    if (!currentUserId) return;

    const post = posts.find(p => p.id === postId);
    if (!post || post.user_id !== currentUserId) {
      alert('You can only delete your own posts');
      return;
    }

    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)
        .eq('user_id', currentUserId);

      if (error) throw error;

      setPosts(posts.filter(p => p.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!currentUserId) return;

    let targetComment: Comment | undefined;
    let targetPostId: string | undefined;

    for (const post of posts) {
      const comment = post.comments.find(c => c.id === commentId);
      if (comment) {
        targetComment = comment;
        targetPostId = post.id;
        break;
      }
    }

    if (!targetComment || targetComment.user_id !== currentUserId) {
      alert('You can only delete your own comments');
      return;
    }

    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', currentUserId);

      if (error) throw error;

      setPosts(posts.map(p => ({
        ...p,
        comments: p.id === targetPostId ? p.comments.filter(c => c.id !== commentId) : p.comments,
      })));
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="community-container">
        <div className="loading">
          <div className="spinner">
          <img src="Heart.gif" alt="Loading..." />
        </div>
          <p>Loading community posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="community-container">
      <h1 className="community-title">Community</h1>

      {currentUserId && currentUserProfile ? (
        <div className="post-form">
          <div className="current-user-info">
            <img
              src={currentUserProfile.avatar_url || 'https://via.placeholder.com/45'}
              alt="avatar"
              className="avatar small"
            />
            <span className="current-user-name">{currentUserProfile.full_name}</span>
          </div>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Share your thoughts about menstruation, self-care, or ask a question..."
            maxLength={1000}
          />
          <div className="post-form-actions">
            <span className="character-count">{newPostContent.length}/1000</span>
            <button onClick={addPost} disabled={!newPostContent.trim()}>
              Post
            </button>
          </div>
        </div>
      ) : (
        <div className="post-form guest-message">
          <p>Sign in to share your thoughts and connect with the community!</p>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="no-posts">
          <p>No posts yet. {currentUserId ? 'Be the first to share!' : 'Sign in to see and create posts.'}</p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <img
                src={post.profile?.avatar_url || 'https://via.placeholder.com/45'}
                alt="avatar"
                className="avatar"
              />
              <div className="post-user-info">
                <span className="post-name">{post.profile?.full_name || 'Anonymous'}</span>
                <span className="post-date">
                  {new Date(post.created_at).toLocaleDateString()} at {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {currentUserId === post.user_id && (
                <button
                  className="delete-post-btn"
                  onClick={() => deletePost(post.id)}
                  title="Delete post"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="post-content">{post.content}</div>

            <div className="post-reactions">
              <button
                className={`reaction-btn ${post.liked ? 'liked' : ''}`}
                onClick={() => toggleLike(post.id)}
              >
                {post.liked ? '❤️' : '🤍'} {post.likes > 0 && post.likes}
              </button>
              <span className="reaction-count">
                {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
              </span>
            </div>

            <div className="comments-section">
              {post.comments.length > 0 && (
                <div className="comments-list">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <div className="comment-header">
                        <img
                          src={comment.profile?.avatar_url || 'https://via.placeholder.com/35'}
                          alt="avatar"
                          className="avatar small"
                        />
                        <div className="comment-user-info">
                          <span className="post-name">{comment.profile?.full_name || 'Anonymous'}</span>
                          <span className="post-date">
                            {new Date(comment.created_at).toLocaleDateString()} at {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        {currentUserId === comment.user_id && (
                          <button
                            className="delete-comment-btn"
                            onClick={() => deleteComment(comment.id)}
                            title="Delete comment"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      <div className="comment-content">{comment.content}</div>
                    </div>
                  ))}
                </div>
              )}

              {currentUserId && currentUserProfile && (
                <div className="comment-form">
                  <div className="comment-user-preview">
                    <img
                      src={currentUserProfile.avatar_url || 'https://via.placeholder.com/35'}
                      alt="avatar"
                      className="avatar tiny"
                    />
                    <span>{currentUserProfile.full_name}</span>
                  </div>
                  <textarea
                    value={newComments[post.id] || ''}
                    onChange={(e) => setNewComments({ ...newComments, [post.id]: e.target.value })}
                    placeholder="Add a comment..."
                    maxLength={500}
                    rows={2}
                  />
                  <div className="comment-form-actions">
                    <span className="character-count">{(newComments[post.id] || '').length}/500</span>
                    <button
                      onClick={() => addComment(post.id)}
                      disabled={!(newComments[post.id]?.trim())}
                    >
                      Comment
                    </button>
                  </div>
                </div>
              )}

              {!currentUserId && (
                <div className="comment-form guest-message">
                  <p>Sign in to comment on posts!</p>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Community;