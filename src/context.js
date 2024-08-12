import React, { createContext, useState, useContext } from 'react';
import songsData from './songs.json';

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState(songsData);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isShuffleOn, setShuffleOn] = useState(false);
  const [isRepeatOn, setRepeatOn] = useState(false);

  const playNextSong = () => {
    if (isRepeatOn && !isShuffleOn) {
      return;
    }

    if (isShuffleOn) {
      const nextSongIndex = Math.floor(Math.random() * songs.length);
      setCurrentSongIndex(nextSongIndex);
    } else {
      setCurrentSongIndex((prevIndex) =>
        prevIndex === songs.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const playPreviousSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  const moveSong = (fromIndex, toIndex) => {
    const updatedList = [...songs];
    const [movedSong] = updatedList.splice(fromIndex, 1);
    updatedList.splice(toIndex, 0, movedSong);
    setSongs(updatedList);
    setCurrentSongIndex(updatedList.findIndex(song => song.id === movedSong.id));
  };

  return (
    <MusicContext.Provider
      value={{
        songs,
        currentSongIndex,
        setCurrentSongIndex,
        playNextSong,
        playPreviousSong,
        moveSong,
        setSongs,
        setShuffleOn,
        setRepeatOn,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
