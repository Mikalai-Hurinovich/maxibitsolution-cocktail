import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Cocktail, CocktailCode, CocktailsResponse } from '@/shared/types/cocktail.ts';
import { fetchCocktailsByCode } from '@/api/cocktailService.ts';

interface CocktailsState {
  cocktails: Record<CocktailCode, Cocktail[]>;
  loading: Record<CocktailCode, boolean>;
  error: Record<CocktailCode, string | null>;
}

const initialState: CocktailsState = {
  cocktails: {
    margarita: [],
    mojito: [],
    a1: [],
    kir: [],
  },
  loading: {
    margarita: false,
    mojito: false,
    a1: false,
    kir: false,
  },
  error: {
    margarita: null,
    mojito: null,
    a1: null,
    kir: null,
  },
};

export const fetchCocktails = createAsyncThunk<
  { code: CocktailCode; data: CocktailsResponse },
  CocktailCode,
  { rejectValue: string }
>('cocktails/fetchCocktails', async (code, { getState, rejectWithValue }) => {
  try {
    const state = getState() as { cocktails: CocktailsState };
    if (state.cocktails.cocktails[code].length > 0) {
      return {
        code,
        data: { drinks: state.cocktails.cocktails[code] },
      };
    }

    const data = await fetchCocktailsByCode(code);
    return { code, data };
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
  }
});

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state, action) => {
        const code = action.meta.arg;
        state.loading[code] = true;
        state.error[code] = null;
      })
      .addCase(fetchCocktails.fulfilled, (state, action) => {
        const { code, data } = action.payload;
        state.loading[code] = false;
        state.cocktails[code] = data.drinks || [];
      })
      .addCase(fetchCocktails.rejected, (state, action) => {
        const code = action.meta.arg;
        state.loading[code] = false;
        state.error[code] = action.payload || 'Failed to fetch cocktails';
      });
  },
});

export default cocktailsSlice.reducer;
