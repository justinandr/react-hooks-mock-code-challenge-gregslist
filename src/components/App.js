import React, { useEffect, useState } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {

  const [listings, setListings] = useState([])

  useEffect(() => {
    fetch('http://localhost:6001/listings')
    .then(res => res.json())
    .then(data => setListings(data))
  }, [])

  function handleDelete(id){
    const updatedListings = listings.filter(listing => listing.id !== id)

    fetch(`http://localhost:6001/listings/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => setListings(updatedListings))
  }

  function handleSearchSubmit(search) {
    const listingsToDisplay = listings.filter(listing => listing.description.includes(search))
    setListings(listingsToDisplay)
  }

  return (
    <div className="app">
      <Header onSearch={handleSearchSubmit} />
      <ListingsContainer onDelete={handleDelete} listings={listings} />
    </div>
  );
}

export default App;
