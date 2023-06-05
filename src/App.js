import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import Home from './components/Home';
import SongPreview from './components/SongPreview';
import FavoritesPage from './components/FavoritesPage';
import FavoritesPreview from './components/FavoritesPreview';


function App() {
  const [songs, setSongs] = useState([]); //Stores the results from the api in the state.
  const [count, setCount] = useState(0); //State for How much items where found.
  
  //Makes sure that the data is always updated in the homepage/searchpage.
  useEffect(() => {
    getData()
  })

  
  //Function for getting the data from the backend and storing it in the state.
  const getData = () => {
    fetch('https://itunes-app-project-backend.onrender.com').then(res => res.json()).then(data => {

      setCount(data.resultCount);
      setSongs(data.results);
      //console.log(data);
      //console.log(data.results);
    }).catch(err => {
      console.log(err);
    })
  }

  //Function that gets the information typed in the search bar and sends it to the backend when the user presses the search button.
  const searchSong = (params) => {
    let {term, entity, limit} = params;
    let newSearch = {term, entity, limit};

    fetch('https://itunes-app-project-backend.onrender.com', {
      method: "PUT",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(newSearch)
    }).catch((err) =>{
      console.log(err.message)
    })

  }

  return (
    <div >
      <div className="App container bg-dark">
        <Header/>
        <SearchBox searchSong={searchSong}/>
        
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home songs={songs} count={count}/>} />
            <Route path='/preview' element={<SongPreview />} />
            <Route path='/favorites' element={<FavoritesPage />} />
            <Route path='/favoritesPreview' element={<FavoritesPreview />} />
          </Routes>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
