import logo from './logo.svg';
import './App.css';
import Books from './components/Books';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchBooks from './components/SearchBooks';





function App() {
  return (
    <div className="App container-fluid p-0">
      <header className="App-header">
        <p>Google search books</p>
      </header>
      <div className='app-body'> 
        <SearchBooks></SearchBooks>
        
        <div className='app-books'>

        </div>
      </div>
    </div>
  );
}

export default App;
