import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useMusic } from "../../context";
import st from "./List.module.css";
import Playercard from "../playercard/Playercard";

const List = () => {
  const { songs, setSongs, currentSongIndex, setCurrentSongIndex } = useMusic();
  const [selectedSong, setSelectedSong] = useState(songs[currentSongIndex]?.id);
  const [isPlayercardVisible, setIsPlayercardVisible] = useState(false);

  useEffect(() => {
    setSelectedSong(songs[currentSongIndex]?.id);
  }, [currentSongIndex, songs]);

  const handleClick = (id) => {
    const songIndex = songs.findIndex((song) => song.id === id);
    setCurrentSongIndex(songIndex);
    setSelectedSong(id);
    if (window.innerWidth < 700) {
      setIsPlayercardVisible(true);
    }
  };

  const moveSong = (fromIndex, toIndex) => {
    const updatedList = [...songs];
    const [movedSong] = updatedList.splice(fromIndex, 1);
    updatedList.splice(toIndex, 0, movedSong);
    setSongs(updatedList);
  };

  const ListItem = ({ song, index }) => {
    const [, ref] = useDrag({
      type: "SONG",
      item: { index },
    });

    const [, drop] = useDrop({
      accept: "SONG",
      hover: (item) => {
        if (item.index !== index) {
          moveSong(item.index, index);
          item.index = index;
        }
      },
    });

    return (
      <div
        ref={(node) => ref(drop(node))}
        className={`${st.musicListItem} ${
          selectedSong === song.id ? st.active : ""
        }`}
        onClick={() => handleClick(song.id)}
      >
        <div className={st.inner}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {selectedSong === song.id ? (
              <img
                src="/Playing.svg"
                alt="Playing"
                className={st.playingIcon}
              />
            ) : (
              index + 1
            )}
          </div>
          <div id={st.coverCont}>
            <img src={song.cover} alt="" />
          </div>
          <div>{song.title}</div>
          <div>{song.plays}</div>
          <div>{song.time}</div>
          <div>{song.album}</div>
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={st.musicListContainer}>
        <div className={st.musicListHeader}>
          <div className={st.headsb}>
            <span>Popular</span>
            <span>See All</span>
          </div>
          <div className={st.innerh}>
            <div style={{ display: "flex", justifyContent: "center" }}>#</div>
            <div></div>
            <div>Title</div>
            <div>Playing</div>
            <div>Time</div>
            <div>Album</div>
          </div>
        </div>
        <div className={st.musicListBody}>
          {songs.map((song, index) => (
            <ListItem key={song.id} song={song} index={index} />
          ))}
        </div>
        {isPlayercardVisible && (
          <div className={st.contcn}>
            <div className={st.cardCont}>
              <Playercard />
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default List;
