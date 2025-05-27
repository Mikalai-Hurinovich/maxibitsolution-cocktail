import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { fetchCocktails } from '@/store/slices/cocktailsSlice.ts';
import { COCKTAIL_CODES, type CocktailCode } from '@/shared/types/cocktail.ts';
import CocktailCard from '../CocktailCard/CocktailCard.tsx';
import CocktailCardSkeleton from '../CocktailCardSkeleton/CocktailCardSkeleton.tsx';
import './CocktailList.scss';

const CocktailList = () => {
  const { cocktailCode } = useParams<{ cocktailCode: string }>();
  const dispatch = useAppDispatch();

  const isValidCode = cocktailCode && COCKTAIL_CODES.includes(cocktailCode as CocktailCode);
  const code = cocktailCode as CocktailCode;

  const { cocktails, loading, error } = useAppSelector((state) => ({
    cocktails: state.cocktails.cocktails[code],
    loading: state.cocktails.loading[code],
    error: state.cocktails.error[code],
  }));

  useEffect(() => {
    if (code) {
      dispatch(fetchCocktails(code));
    }
  }, [dispatch, code]);

  if (!isValidCode) {
    return <Navigate to="/not-found" />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">❌</div>
        <h2>Error</h2>
        <p>{error}</p>
        <button className="retry-button" onClick={() => dispatch(fetchCocktails(code))}>
          Try Again
        </button>
      </div>
    );
  }

  if (!cocktails || cocktails.length === 0) {
    if (!loading) {
      return (
        <div className="no-results-container">
          <div className="no-results-icon">🔍</div>
          <h2>No Cocktails Found</h2>
          <p>We couldn't find any cocktails matching your search.</p>
        </div>
      );
    }
  }

  return (
    <div className="cocktail-list">
      <h1 className="title">{code.charAt(0).toUpperCase() + code.slice(1)} Cocktails</h1>
      <div className="cards">
        {loading
          ? Array(1)
              .fill(0)
              .map((_, index) => <CocktailCardSkeleton key={index} />)
          : cocktails.map((cocktail) => (
              <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
            ))}
      </div>
    </div>
  );
};

export default CocktailList;
