import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { COCKTAIL_CODES } from '@/shared/types/cocktail';
import '@/styles/global.scss';

import CocktailList from '@/features/cocktails';
import MainLayout from '@/layouts';
import NotFound from '@/pages';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={`/${COCKTAIL_CODES[0]}`} />} />
          <Route element={<MainLayout />}>
            <Route path="/:cocktailCode" element={<CocktailList />} />
            <Route path="/not-found" element={<NotFound />} />
          </Route>
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
