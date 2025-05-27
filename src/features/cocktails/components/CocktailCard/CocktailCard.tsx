import { useEffect, useRef, useState } from 'react';
import type { Cocktail } from '@/shared/types/cocktail.ts';
import './CocktailCard.scss';

interface CocktailCardProps {
  cocktail: Cocktail;
}

const CocktailCard = ({ cocktail }: CocktailCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail];
    const measure = cocktail[`strMeasure${i}` as keyof Cocktail];

    if (ingredient) {
      ingredients.push({
        name: ingredient,
        measure: measure || '',
      });
    }
  }

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            imgRef.current.src = cocktail.strDrinkThumb;
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [cocktail.strDrinkThumb]);

  return (
    <div className="cocktail-card">
      <div className="cocktail-info">
        <h2 className="cocktail-name">{cocktail.strDrink}</h2>

        <div className="cocktail-meta">
          <p>
            <strong>Category:</strong> {cocktail.strCategory}
          </p>
          <p>
            <strong>Type:</strong> {cocktail.strAlcoholic}
          </p>
          <p>
            <strong>Glass:</strong> {cocktail.strGlass}
          </p>
        </div>

        <div className="cocktail-instructions">
          <h3>Instructions:</h3>
          <p>{cocktail.strInstructions}</p>
        </div>

        <div className="cocktail-ingredients">
          <h3>Ingredients:</h3>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>
                <span className="measure">{item.measure}</span>
                <span className="ingredient">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="image-container">
        <img
          ref={imgRef}
          alt={cocktail.strDrink}
          className={`cocktail-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={handleImageLoad}
        />
        {!imageLoaded && <div className="image-placeholder" />}
      </div>
    </div>
  );
};

export default CocktailCard;
