import React, { useEffect, useState } from "react";
import { useMusic } from "../../context";
import st from "./Playercard.module.css";

const Playercard = () => {
  const { songs, currentSongIndex, playNextSong, setSongs, playPreviousSong, setCurrentSongIndex } = useMusic();
  const [isPlaying, setIsPlaying] = useState(false);
  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const audio = new Audio(currentSong.mp3);
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
    return () => {
      audio.pause();
    };
  }, [isPlaying, currentSong]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const shuffleSongs = () => {
    const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);
    setSongs(shuffledSongs);
    setCurrentSongIndex(0);
    setIsPlaying(true);
  };

  return (
    <div className={st.playerCard}>
      <span>Now playing</span>
      <div className={st.songDetails}>
        <img src={currentSong.cover} alt={currentSong.title} />
        <div>
          <h4>{currentSong.title}</h4>
          <p>{currentSong.album}</p>
        </div>
      </div>
      <input type="range" min="0" max="100" />
      <div className={st.controls}>
        <img src="/repeatControl.svg" alt="Repeat" />
        <img src="/prevControl.svg" alt="Previous" onClick={playPreviousSong} />
        <img
          id={st.ncontrol}
          onClick={togglePlayPause}
          src={isPlaying ? '/pauseControl.svg' : '/playControl.svg'}
          alt="Play/Pause"
        />
        <img src="/nextControl.svg" alt="Next" onClick={playNextSong} />
        <img src="/randomControl.svg" alt="Shuffle" onClick={shuffleSongs} />
      </div>
    </div>
  );
};

export default Playercard;