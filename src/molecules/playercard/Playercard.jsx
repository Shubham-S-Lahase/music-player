import React, { useEffect, useState, useRef } from "react";
import { useMusic } from "../../context";
import st from "./Playercard.module.css";

const Playercard = () => {
  const {
    songs,
    currentSongIndex,
    playNextSong,
    playPreviousSong,
    isRepeatOn,
    toggleRepeat,
    isShuffleOn,
    toggleShuffle,
  } = useMusic();

  const [isPlaying, setIsPlaying] = useState(false);
  const currentSong = songs[currentSongIndex];
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(currentSong.mp3);
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener("ended", () => {
      if (isRepeatOn) {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNextSong();
      }
    });

    if (isPlaying) {
      // audio.currentTime = currentTime;
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying, currentSong, playNextSong, isRepeatOn]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
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
      <div className={st.progressContainer}>
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleTimeChange}
        />
        <span>{formatTime(duration)}</span>
      </div>
      <div className={st.controls}>
      <div className={`${st.repeat} ${isRepeatOn ? st.repeatActive : ''}`}>
          <img src="/repeatControl.svg" alt="Repeat" onClick={toggleRepeat} />
        </div>
        <img src="/prevControl.svg" alt="Previous" onClick={playPreviousSong} />
        <img
          id={st.ncontrol}
          onClick={togglePlayPause}
          src={isPlaying ? "/pauseControl.svg" : "/playControl.svg"}
          alt="Play/Pause"
        />
        <img src="/nextControl.svg" alt="Next" onClick={playNextSong} />
        <div className={`${st.repeat} ${isShuffleOn ? st.repeatActive : ''}`}>
        <img src="/randomControl.svg" alt="Shuffle" onClick={toggleShuffle} />
        </div>
      </div>
    </div>
  );
};

export default Playercard;
