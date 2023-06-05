import React, { useEffect, useState } from 'react';


//This component is for adding an item/track to the favorites list. It gets the information from the Song component via props.
function FavoriteButton(props) {
    const [favoritesScan, setFavoritesScan] = useState([]); //Data from the backend is stored in state, this is for scaning items that are already in your favourites list.

    useEffect(() => {
      //this.timeout(5000); // Set timeout to 5 seconds
      fetch('https://itunes-app-project-backend.onrender.com/favorites/')
      .then(res => res.json())
      .then(data => {
        setFavoritesScan(data);
      })
      .catch(err => {
        console.log(err);
      })
    })

    let trackName = props.trackName;
    let artistName = props.artistName;
    let trackPrice = props.trackPrice;
    let currency = props.currency;
    let artworkUrl100 = props.artworkUrl100;
    let previewUrl = props.previewUrl;
    
    
    //Once the information of the favorite track has been received from the Song component it is then sent and stored in the backend via the POST fetch method.
    const addToFav = (e) => {
      e.preventDefault();

      const favorite = {trackName, artistName, trackPrice, currency, artworkUrl100, previewUrl};



      if(favoritesScan.find((song) => song.trackName === favorite.trackName)){
        console.log('This is in the basket');
        alert("This is already in your Favorites List");
      }
      else{
        fetch('https://itunes-app-project-backend.onrender.com/favorites/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            trackName: favorite.trackName,
            artistName: favorite.artistName,
            trackPrice: favorite.trackPrice,
            currency: favorite.currency,
            artworkUrl100: favorite.artworkUrl100,
            previewUrl: favorite.previewUrl
          })
        })
        .then(() => {
            console.log('New Favorite Added')
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
      }


    }

    
  return (
      <div>
        <button className='btn btn-md btn-outline-warning' onClick={addToFav}>Add To Favorites</button>
      </div>
    
  )
}

export default FavoriteButton;