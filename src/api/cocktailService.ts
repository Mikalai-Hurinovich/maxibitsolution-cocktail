import axios from 'axios';
import type { CocktailCode, CocktailsResponse } from '../shared/types/cocktail';

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const fetchCocktailsByCode = async (code: CocktailCode): Promise<CocktailsResponse> => {
  try {
    const response = await axios.get<CocktailsResponse>(`${API_BASE_URL}/search.php?s=${code}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cocktails for code ${code}:`, error);
    throw error;
  }
};
