import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';
import { TiMediaFastForward, TiMediaRewind } from "react-icons/ti";
import { PiDotsThreeBold } from "react-icons/pi";


const PlayerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;


const CoverImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: center; 
    @media (max-width: 768px) {
    flex-direction: column;
`;

const PlayPauseButton = styled.button`
  background-color: white;
  color: black;
  border: solid black 1px;
  border-radius: 70%;
  font-size: 18px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 10px; /* Adjust margin for spacing */

  @media (max-width: 768px) {
    margin: 10px 0; /* Adjust vertical spacing */
  }
`;

const SkipButton = styled.button`
  background-color: black;
  color: azure;
  opacity: 0.7;
  border: none;
  border-radius: 50%;
  font-size: 28px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 10px; /* Adjust margin for spacing */

  @media (max-width: 768px) {
    margin: 10px 0; /* Adjust vertical spacing */
  }
`;

const ForwardButton = styled.button`
  background-color: black;
  color: azure;
  opacity: 0.7;
  border: none;
  border-radius: 50%;
  font-size: 28px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 10px; /* Adjust margin for spacing */

  @media (max-width: 768px) {
    margin: 10px 0; /* Adjust vertical spacing */
  }
`;

const VolumeButton = styled.button`
  background-color: #181818;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 10px; /* Adjust margin for spacing */

  @media (max-width: 768px) {
    margin: 10px 0; /* Adjust vertical spacing */
  }
`;

const OptionsButton = styled.button`
  background-color: #181818;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 10px; /* Adjust margin for spacing */

  @media (max-width: 768px) {
    margin: 10px 0; /* Adjust vertical spacing */
  }
`;


const VolumeControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px; /* Adjust margin for spacing */
`;


const VolumeControl = styled.input`
  width: 100px;
  margin-left: 20px;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;


const ProgressBar = styled.input`
  width: 300px;
  height: 3px;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 0px;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const SongName = styled.h2`
   font-size: 25px;
  color:white ;
 
margin:0;
  margin-bottom: 1%;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  text-align: left;
margin-top:10px;
 width:100%;
 margin-left:250px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;
const ArtistName = styled.h3`
  font-size: 12px;
  color: #ffffff;
  opacity: 0.7;
  margin:0;
  margin-bottom: 1%;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  text-align: left;
margin-top:10px;
 width:100%;
 margin-left:250px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;


const Player = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const handleCanPlay = () => {
      if (isPlaying) {
        audio.play().catch((error) => {
          console.error('Failed to play audio:', error);
        });
      }
    };

    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [isPlaying, song]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const updateCurrentTime = () => setCurrentTime(audio.currentTime);
    const setAudioData = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateCurrentTime);
    audio.addEventListener('loadeddata', setAudioData);

    return () => {
      audio.removeEventListener('timeupdate', updateCurrentTime);
      audio.removeEventListener('loadeddata', setAudioData);
    };
  }, [volume]);

  useEffect(() => {
    // Play the audio when song changes
    if (song && isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error('Failed to play audio:', error);
      });
    }
  }, [song, isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSkipForward = () => {
    const newTime = audioRef.current.currentTime + 10; // Skip forward 10 seconds
    if (newTime < audioRef.current.duration) {
      audioRef.current.currentTime = newTime;
    } else {
      audioRef.current.currentTime = audioRef.current.duration;
    }
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSkipBackward = () => {
    const newTime = audioRef.current.currentTime - 10; // Skip backward 10 seconds
    if (newTime > 0) {
      audioRef.current.currentTime = newTime;
    } else {
      audioRef.current.currentTime = 0;
    }
    setCurrentTime(audioRef.current.currentTime);
  };

  return (
    <PlayerContainer>
      <SongName>{song.name}</SongName>
      <ArtistName>{song.artist}</ArtistName>
      <CoverImage src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} />

      <audio
        ref={audioRef}
        src={song.url}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <ProgressBar
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleProgressChange}
      />

      <Controls>
        <OptionsButton>
          <PiDotsThreeBold style={{ fontSize: '24px' }} />
        </OptionsButton>
        <SkipButton onClick={handleSkipBackward}>
          <TiMediaRewind />
        </SkipButton>
        {isPlaying ? (
          <PlayPauseButton onClick={handlePause}>
            <FaPause />
          </PlayPauseButton>
        ) : (
          <PlayPauseButton onClick={handlePlay}>
            <FaPlay />
          </PlayPauseButton>
        )}
        <ForwardButton onClick={handleSkipForward}>
          <TiMediaFastForward />
        </ForwardButton>
        <VolumeButton onClick={() => setShowVolumeControl(!showVolumeControl)}>
          <FaVolumeUp />
        </VolumeButton>
      </Controls>

      <VolumeControlContainer>
        <VolumeControl
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          show={showVolumeControl}
        />
      </VolumeControlContainer>
    </PlayerContainer>
  );
};

export default Player;
