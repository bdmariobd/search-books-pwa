import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import Favourites from './components/Favourites';


const root = ReactDOM.createRoot(document.getElementById('root'));
if (localStorage.getItem('favs') === null) {
  localStorage.setItem('favs', JSON.stringify([]));
}
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/search-books-pwa" element={<App />}>
          <Route index element={<SearchBooks />} />
          <Route path="/search-books-pwa/favs" element={<Favourites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorkerRegistration.register({scope: '/search-books-pwa/'});


