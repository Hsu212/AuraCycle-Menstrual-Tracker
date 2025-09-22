import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CycleForm from './components/CycleForm';
import CycleCalendar from './components/CycleCalendar';
import CyclePredictions from './components/CyclePredictions';
import SelfCarePage from './components/SelfCare';
import HygienePage from './components/Hygiene';
import Knowledge from './components/Knowledge';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import UserProfile from './components/UserProfile';
import Community from './components/Community';
import './App.css';
import { supabase } from './supabase';
import { Session, User } from '@supabase/supabase-js';

interface Cycle {
  id?: string;
  startDate: string;
  endDate: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
}

// ScrollToTop component to reset scroll position on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      setSession(session);
      setIsAuthenticated(!!session);
      if (session?.user) {
        setUser(extractUserData(session.user));
        fetchCycles(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: Session | null) => {
      setSession(session);
      setIsAuthenticated(!!session);
      if (session?.user) {
        setUser(extractUserData(session.user));
        fetchCycles(session.user.id);
      } else {
        setUser(null);
        setCycles([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const extractUserData = (supabaseUser: User): UserData => {
    const fullName = supabaseUser.user_metadata?.full_name || '';
    const [firstName, lastName] = fullName.split(' ').filter(Boolean);
    return {
      firstName: firstName || '',
      lastName: lastName || '',
      email: supabaseUser.email || '',
      profilePicture: supabaseUser.user_metadata?.avatar_url || 'https://avatar.iran.liara.run/public',
    };
  };

  const fetchCycles = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('cycles')
        .select('id, start_date, end_date')
        .eq('user_id', userId);
      if (error) throw error;
      setCycles(data?.map(cycle => ({
        id: cycle.id,
        startDate: cycle.start_date,
        endDate: cycle.end_date,
      })) || []);
    } catch (error: any) {
      console.error('Error fetching cycles:', error.message);
    }
  };

  const addCycle = async (startDate: string, endDate: string) => {
    if (!session?.user) {
      console.error('No user logged in');
      throw new Error('No user logged in');
    }
    try {
      const newStart = new Date(startDate);
      const newStartMonth = newStart.getMonth();
      const newStartYear = newStart.getFullYear();
      const hasOverlap = cycles.some(cycle => {
        const cycleStart = new Date(cycle.startDate);
        return cycleStart.getMonth() === newStartMonth && cycleStart.getFullYear() === newStartYear;
      });
      if (hasOverlap) {
        throw new Error('A cycle already exists for this month');
      }

      const { data, error } = await supabase
        .from('cycles')
        .insert([{ user_id: session.user.id, start_date: startDate, end_date: endDate }])
        .select('id, start_date, end_date')
        .single();
      if (error) throw error;
      setCycles([...cycles, { id: data.id, startDate: data.start_date, endDate: data.end_date }]);
    } catch (error: any) {
      console.error('Error adding cycle:', error.message);
      throw error;
    }
  };

  const deleteCycle = async (cycleId: string) => {
    if (!session?.user) {
      console.error('No user logged in');
      return;
    }
    try {
      const { error } = await supabase
        .from('cycles')
        .delete()
        .eq('id', cycleId)
        .eq('user_id', session.user.id);
      if (error) throw error;
      setCycles(cycles.filter(cycle => cycle.id !== cycleId));
    } catch (error: any) {
      console.error('Error deleting cycle:', error.message);
    }
  };

  const resetCycles = async () => {
    if (!session?.user) {
      console.error('No user logged in');
      return;
    }
    try {
      const { error } = await supabase
        .from('cycles')
        .delete()
        .eq('user_id', session.user.id);
      if (error) throw error;
      setCycles([]);
    } catch (error: any) {
      console.error('Error resetting cycles:', error.message);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const handleSignUp = async (formData: { firstName: string; lastName: string; email: string; password: string; profilePicture: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: `${formData.firstName} ${formData.lastName}`,
          avatar_url: formData.profilePicture || 'https://avatar.iran.liara.run/public',
        },
      },
    });
    if (error) throw error;
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: `${formData.firstName} ${formData.lastName}`,
        avatar_url: formData.profilePicture || 'https://avatar.iran.liara.run/public',
      });
      if (profileError) throw profileError;
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/signin" replace />;
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        <Routes>
          <Route
            path="/signin"
            element={isAuthenticated ? <Navigate to="/" replace /> : <SignInPage onSignIn={handleSignIn} />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" replace /> : <SignUpPage onSignUp={handleSignUp} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="main-content">
                  <Navbar onLogout={handleLogout} />
                  <div className="content">
                    <CycleForm addCycle={addCycle} resetCycles={resetCycles} />
                    <CycleCalendar cycles={cycles} deleteCycle={deleteCycle} />
                    <CyclePredictions cycles={cycles} />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/self-care"
            element={
              <ProtectedRoute>
                <div className="main-content">
                  <Navbar onLogout={handleLogout} />
                  <div className="content">
                    <SelfCarePage />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/hygiene"
            element={
              <ProtectedRoute>
                <div className="main-content">
                  <Navbar onLogout={handleLogout} />
                  <div className="content">
                    <HygienePage />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/knowledge"
            element={
              <ProtectedRoute>
                <div className="main-content">
                  <Navbar onLogout={handleLogout} />
                  <div className="content">
                    <Knowledge />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <div className="main-content">
                  <Navbar onLogout={handleLogout} />
                  <div className="content">
                    <Community />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div className="main-content">
                  <Navbar onLogout={handleLogout} />
                  <div className="content">
                    <UserProfile user={user} />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
