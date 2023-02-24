/** @format */

import React, { useState, useRef } from "react";
// import styles from '../assets/AudioPlayer.module.css'

import styles from "../assets/CusAudioPlayer.module.css";
import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

export const Audio = ({ audio }) => {
  // console.log(ImgUrl+audio);
  // console.log(audio);
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef(); // reference our audio component
  const progressBar = useRef(); // reference our progress bar
  const animationRef = useRef(); // reference the animation

  const readyHandle = () => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  };

  // useEffect(() => {
  //   const seconds = Math.floor(audioPlayer.current.duration)
  //   setDuration(seconds)
  //   progressBar.current.max = seconds
  // }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const backRange = () => {
    progressBar.current.value = Number(progressBar.current.value - 15);
    changeRange();
  };

  const forwardRange = () => {
    progressBar.current.value = Number(progressBar.current.value + 15);
    changeRange();
  };

  return (
    <div className={styles.audioContainer}>
      <div className={styles.logo}></div>
      <div className={styles.audioDiv}>
        <div className={styles.audioPlayer}>
          <audio
            ref={audioPlayer}
            src={audio}
            onLoadedMetadata={readyHandle}></audio>
          <div className={styles.audioOptions}>
            <button className={styles.forwardBackward} onClick={backRange}>
              <FaBackward />
            </button>
            <button onClick={togglePlayPause} className={styles.playPause}>
              {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
            </button>
            <button className={styles.forwardBackward} onClick={forwardRange}>
              <FaForward />
            </button>
          </div>

          <div className={styles.showprograssbar}>
            {/* current time */}
            <div className={styles.currentTime}>
              {calculateTime(currentTime)}
            </div>

            {/* progress bar */}
            <div className={styles.range}>
              <input
                type="range"
                className={styles.progressBar}
                defaultValue="0"
                ref={progressBar}
                onChange={changeRange}
              />
            </div>

            {/* duration */}
            <div className={styles.duration}>
              {duration && !isNaN(duration) && calculateTime(duration)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
