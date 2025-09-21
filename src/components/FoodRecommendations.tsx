// FoodRecommendations.tsx
import React from 'react';
import '../styles/FoodRecommendations.css'; // We'll define CSS below

const FoodRecommendations: React.FC = () => {
  const foods = [
    {
      name: 'Leafy Greens (Spinach)',
      description: 'Rich in iron to combat fatigue during periods.',
      image: 'https://tse3.mm.bing.net/th/id/OIP.SOYyGhU7Pa2ShLA7FwqqDQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3', // Replace with actual image URL, e.g., from Unsplash or your assets
    },
    {
      name: 'Bananas',
      description: 'High in potassium to reduce bloating and cramps.',
      image: 'https://th.bing.com/th/id/R.23df0da20a830884ac67a35d6385bdad?rik=dlrEMxmYR5f1aw&riu=http%3a%2f%2fwww.womendailymagazine.com%2fwp-content%2fuploads%2f2014%2f05%2fThe-amazing-benefits-of-bananas-1.jpg&ehk=DB3vt8XokGz4mg24D7pw1Sl3uW1HcyP%2b2%2fAiJRh%2b8Rw%3d&risl=&pid=ImgRaw&r=0',
    },
    {
      name: 'Dark Chocolate',
      description: 'Boosts serotonin for mood improvement; choose 70%+ cocoa.',
      image: 'https://cdn.nunuchocolates.com/is_dark_chocolate_ba.jpg',
    },
    {
      name: 'Salmon',
      description: 'Omega-3s help reduce inflammation and PMS symptoms.',
      image: 'https://www.thedailymeal.com/img/gallery/11-ways-salmon-is-enjoyed-around-the-world/l-intro-1677258545.jpg',
    },
    {
      name: 'Ginger Tea',
      description: 'Soothes menstrual cramps and nausea.',
      image: 'https://th.bing.com/th/id/R.aacdd8bb08bf0dcd4f2df804d762efc8?rik=Fc7dQ2TjNauNjA&pid=ImgRaw&r=0',
    },
  ];

  return (
    <div className="food-recs-container">
      <h2>Food Recommendations for Menstrual Health</h2>
      <div className="food-grid">
        {foods.map((food, index) => (
          <div key={index} className="food-card">
            <img src={food.image} alt={food.name} className="food-image" />
            <h3>{food.name}</h3>
            <p>{food.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodRecommendations;
