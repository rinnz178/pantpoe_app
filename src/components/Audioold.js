/** @format */

import React, { useState, useRef, useEffect } from "react";

import styles from "../assets/AudioPlayer.module.css";
//import styles from '../assets/CusAudioPlayer.module.css'

import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
export const Audio = () => {
  // useReference
  const audioPlayer = useRef(); //for our audio

  const progressBar = useRef(0);

  const animationRef = useRef();

  // state

  const [isplaying, setPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  console.log(audioPlayer);
  const audio = document.getElementById("audioloading");

  useEffect(() => {
    if (audio.onloadedmetadata()) {
      console.log(audio.duration);
    }

    // console.log(audioPlayer.current.duration)
    // const seconds = Math.floor(audio.duration)
    // console.log(seconds)
    // setDuration(seconds)
    // console.log(duration)
    // //set audio second num as max amount of progress bar
    // progressBar.current.max = seconds
  }, []);

  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    let prevValue = isplaying;

    setPlaying(!prevValue);

    if (!prevValue) {
      animationRef.current = requestAnimationFrame(whilePlaying);
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 30);
    changeRange();
  };

  const nextThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30);
    changeRange();
  };

  return (
    <div className={styles.audioPlayer}>
      <audio id="audioloading" ref={audioPlayer} preload="metadata">
        <source src={audio} />
      </audio>
      <div className={styles.audioOptions}>
        <button className={styles.forwardBackward} onClick={backThirty}>
          <FaBackward />
        </button>
        <button onClick={togglePlayPause} className={styles.playPause}>
          {isplaying ? <FaPause /> : <FaPlay className={styles.play} />}
        </button>
        <button className={styles.forwardBackward} onClick={nextThirty}>
          <FaForward />
        </button>
      </div>
      {/* current time */}
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

      {/* progress rate */}
      <input
        type="range"
        ref={progressBar}
        className={styles.progressBar}
        defaultValue="0"
        onChange={changeRange}
      />

      {/* duration time */}
      <div className={styles.duration}>
        {/* {duration && !isNaN(duration) && calculateTime(duration)} */}

        {duration}
      </div>
    </div>
  );
};
