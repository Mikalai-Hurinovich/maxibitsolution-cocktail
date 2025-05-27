import './CocktailCardSkeleton.scss';
import { Skeleton } from '@/shared/components';

const CocktailCardSkeleton = () => {
  return (
    <div className="cocktail-card skeleton-card">
      <div className="image-container">
        <Skeleton height="100%" className="image-skeleton" />
      </div>

      <div className="cocktail-info">
        <Skeleton height="2rem" width="70%" className="title-skeleton" />

        <div className="cocktail-meta">
          <Skeleton height="1rem" width="60%" className="meta-skeleton" />
          <Skeleton height="1rem" width="40%" className="meta-skeleton" />
          <Skeleton height="1rem" width="50%" className="meta-skeleton" />
        </div>

        <div className="cocktail-instructions">
          <Skeleton height="1.2rem" width="30%" className="subtitle-skeleton" />
          <Skeleton height="1rem" width="100%" className="text-skeleton" />
          <Skeleton height="1rem" width="90%" className="text-skeleton" />
          <Skeleton height="1rem" width="95%" className="text-skeleton" />
        </div>

        <div className="cocktail-ingredients">
          <Skeleton height="1.2rem" width="30%" className="subtitle-skeleton" />
          <div className="ingredients-list">
            <Skeleton height="1rem" width="80%" className="ingredient-skeleton" />
            <Skeleton height="1rem" width="70%" className="ingredient-skeleton" />
            <Skeleton height="1rem" width="75%" className="ingredient-skeleton" />
            <Skeleton height="1rem" width="65%" className="ingredient-skeleton" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailCardSkeleton;
