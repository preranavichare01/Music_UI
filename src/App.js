import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import Player from './components/Player';
import SongList from './components/SongList';
import Profile from './components/Profile';

// Global styles for the application
const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    background-color: black;
    color: white;
    margin: 0;
    padding: 0;
  }
`;

// Container for the entire app
const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

// Container for the song list and search functionality
const SongListContainer = styled.div`
  width: 350px;
  padding: 20px;
 
  margin-left: 200px;


@media (min-width: 768px) {
    width: 350px; 
    margin-left: 200px;}

`;

// Container for the search input and icon
const SearchContainer = styled.div`
  display: flex;
  align-items: center;



`;

// Search input box styling
const SearchBox = styled.input`
  width: calc(100% - 40px);
  background: #181818;
  padding: 10px;
  border: solid black 1px;
  border-radius: 5px 0 0 5px;
  font-size: 16px;
  color: white;
  transition: border-color 0.3s ease-in-out;
margin:0;
margin-bottom:15px;
  &:focus {
    outline: none;
    border-color: white;
  }
`;

// Styling for the search button with the icon
const SearchButton = styled.button`
  width: 40px;
  height: 40px;
  background: #181818;
  border: none;
  border-radius: 0 5px 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
margin-bottom:15px;
  &:hover {
    background: #282828;
  }

  & svg {
    fill: white;
  }
`;

// Container for headings to align them side by side
const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

// Styled component for the "For You" heading
const ForYouHeading = styled.h2`
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  font-size: 22px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-right: 20px;
  margin-left:10px;
  cursor: pointer;
 margin-top:10px;
 margin-bottom:2%;
  
`;

// Styled component for the "Top Tracks" heading
const TopTracksHeading = styled.h2`
  color: ${props => props.active ? 'rgba(255, 255, 255, 0.7)' : 'white'};
  font-size: 22px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  opacity: 0.7;
  cursor: pointer;
  margin-top:10px;
  margin-bottom:2%;
`;

const App = () => {
  // State to store songs, the current song, search term, and search status
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const [activeTab, setActiveTab] = useState('For You');
  const [topTrendingSongs, setTopTrendingSongs] = useState([]);

  // Fetch songs from the API on component mount
  useEffect(() => {
    axios.get('https://cms.samespace.com/items/songs')
      .then(response => {
        setSongs(response.data.data);
        setCurrentSong(response.data.data[0]);
      })
      .catch(error => console.error(error));
  }, []);

  // Fetch top trending songs when activeTab changes to "Top Tracks"
  useEffect(() => {
    if (activeTab === 'Top Tracks') {
      axios.get('https://cms.samespace.com/items/top-trending-songs')
        .then(response => {
          setTopTrendingSongs(response.data.data);
        })
        .catch(error => console.error(error));
    }
  }, [activeTab]);

  // Handle selecting a song

const handleSongSelect = (song) => {
  setCurrentSong(song);
};


  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSearchClicked(false);
  };

  // Handle search button click
  const handleSearchClick = () => {
    setSearchClicked(true);
  };

  // Toggle active tab
  const toggleTab = (tabName) => {
    setActiveTab(tabName);
  };

  // Determine which list of songs to display based on activeTab
  let displayedSongs;
  if (activeTab === 'Top Tracks') {
    displayedSongs = topTrendingSongs;
  } else {
    displayedSongs = searchClicked ? songs.filter(song =>
      song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    ) : songs;
  }

  return (
    <AppContainer>
      <GlobalStyle />
      <SongListContainer>
        <HeadingContainer>
          <ForYouHeading
            active={activeTab === 'For You'}
            onClick={() => toggleTab('For You')}
          >
            For You
          </ForYouHeading>
          <TopTracksHeading
            active={activeTab === 'Top Tracks'}
            onClick={() => toggleTab('Top Tracks')}
          >
            Top Tracks
          </TopTracksHeading>
        </HeadingContainer>
        <SearchContainer>
          <SearchBox
            type="text"
            placeholder="Search Song, Artist"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <SearchButton onClick={handleSearchClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M10 2a8 8 0 0 1 8 8c0 1.845-.635 3.534-1.689 4.876L22 20.689 20.689 22l-5.69-5.69A7.963 7.963 0 0 1 10 18a8 8 0 1 1 0-16zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"/>
            </svg>
          </SearchButton>
        </SearchContainer>
        <SongList songs={displayedSongs} onSelect={handleSongSelect} />
      </SongListContainer>
      {currentSong && <Player song={currentSong} />}
      <Profile />
    </AppContainer>
  );
};

export default App;
