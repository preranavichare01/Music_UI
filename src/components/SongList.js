import React from 'react';
//import styled from 'styled-components';
import SongItem from './SongItem';


const SongList = ({ songs, onSelect }) => {
  return (
    <div>
      {songs.map(song => (
        <SongItem key={song.id} song={song} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default SongList;
