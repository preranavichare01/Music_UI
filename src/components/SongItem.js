import React from 'react';
import styled from 'styled-components';

const SongItemContainer = styled.div`
  display: flex;
  align-items: center;

  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #282828;
    
  }
`;

const CoverImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 30px;
   @media (max-width: 768px) {
    width: 20px;
    height: 20px;}
`;

const SongInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
   
  margin-left: 10px;
    @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const SongName = styled.div`
  font-size: 14px;
    @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const SongArtist = styled.div`
  font-size: 12px;
  color: #b3b3b3;
    @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const SongDuration = styled.div`
  font-size: 12px;
  color: #b3b3b3;
    @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const SongItem = ({ song, onSelect }) => {
  const { name, artist, cover } = song;

  
  const songDurations = {
    Colors: '1:36',
    August: '2:20',
    'Fallen Leaves': '1:37',
    November: '1:54',
    Uplift: '0:55',
    'First Touch': '2:17',
    Sunflowers: '2:20',
    'Illusion Feel': '2:58',
  };

  // Retrieve duration based on the song name 
  const duration = songDurations[name] || '0:00';

  const handleClick = () => {
    onSelect(song);
  };
  
  return (
    <SongItemContainer onClick={handleClick}>
      <CoverImage src={`https://cms.samespace.com/assets/${cover}`} alt={name} />
      <SongInfo>
        <div>
          <SongName>{name}</SongName>
          <SongArtist>{artist}</SongArtist>
        </div>
        <SongDuration>{duration}</SongDuration>
      </SongInfo>
    </SongItemContainer>
  );
};

export default SongItem;
