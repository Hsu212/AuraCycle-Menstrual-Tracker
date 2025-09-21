import HydrationTracker from './HydrationTracker';
import FoodRecommendations from './FoodRecommendations';
import LoFiMusic from './LoFiMusic';

const SelfCarePage: React.FC = () => {
  return (
    <div>
      <HydrationTracker />
      <FoodRecommendations />
      <LoFiMusic />
    </div>
  );
};


export default SelfCarePage;
