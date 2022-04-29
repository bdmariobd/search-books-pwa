import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bookField, setBookField] = useState('');
    const [authorField, setAuthorField] = useState('');
  
    const onSearch = () => {
      const query = `https://www.googleapis.com/books/v1/volumes?q=${bookField}+inauthor:${authorField}`;
      setLoading(true);
      setError(null);
      axios.get(query)
        .then(res => {
          const data = res.data.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            subtitle: item.volumeInfo.subtitle,
            description: item.volumeInfo.description,
            authors: item.volumeInfo.authors,
            publishedDate: item.volumeInfo.publishedDate,
            pageCount: item.volumeInfo.pageCount,
            categories: item.volumeInfo.categories,
            thumbnail: item.volumeInfo.imageLinks.thumbnail,
            language: item.volumeInfo.language,
            previewLink: item.volumeInfo.previewLink,
            infoLink: item.volumeInfo.infoLink
          }));
          setBooks(data);
          setLoading(false);
          console.log (books);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }
    
    const onChangeBook = (e) => {
      setBookField(e.target.value);
    }

    const onChangeAuthor = (e) => {
      setAuthorField(e.target.value);
    }

        return (
        <form className='search-books' onSubmit={onSearch}>
          <div className='app-searching'> 
              <input onChange={onChangeBook} id='search-books' className='app-search-field' type='text' placeholder='Book title...' />
              <input onChange={onChangeAuthor} id='search-authors' className='app-search-field' type='text' placeholder='Book authors...' />
              <input id='search-button' className='app-search-button' type='submit'>Search</input>
          </div>
          <div className='app-selection'>
            <input type={'radio'} name={'selection'} value={'books'} defaultChecked={false} />
            <label htmlFor={'books'}>Books</label>
            <input type={'radio'} name={'selection'} value={'magazines'} defaultChecked={false} />
            <label htmlFor={'magazines'}>Magazines</label>
            <input type={'radio'} name={'selection'} value={'all'} defaultChecked={true} />
            <label htmlFor={'all'}>All</label>
        </div>
      </form>
        )
}

export default SearchBooks