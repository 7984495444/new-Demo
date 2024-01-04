import React, { useState, useRef } from "react";
import { Pause, Play } from "iconsax-react";

const VideoPlayer = ({ src, poster }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleDoubleClick = async () => {
    const video = videoRef.current;
    if (isPlaying) {
      if (video.requestFullscreen) {
        await video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        await video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        await video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        await video.msRequestFullscreen();
      }
      setIsFullScreen(!isFullScreen);
    }
  };

  const handlePlayClick = async () => {
    const video = videoRef.current;
    if (!isLoading && !isPlaying) {
      setIsLoading(true);
      await video.load();
      await video.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = async () => {
    const video = videoRef.current;

    if (isPlaying) {
      await video.pause();
    } else {
      handlePlayClick();
    }
    setIsPlaying(!isPlaying);
  };

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handleHoverState = (state) => {
    setIsHovered(state);
  };

  return (
    <div
      className="video-container"
      onMouseOver={() => handleHoverState(true)}
      onMouseLeave={() => handleHoverState(false)}
      onDoubleClick={() => handleDoubleClick()}
    >
      <video
        onClick={() => handlePlayClick()}
        className="video-player"
        ref={videoRef}
        width="100%"
        height="100%"
        poster={poster}
        onLoadedData={() => handleLoadedData()}
        preload="none"
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className="button-container">
        {isLoading && <div className="loader"></div>}
        {!isLoading &&
          isHovered &&
          (isPlaying ? (
            <Pause size="32" color="#ffffff" onClick={() => togglePlay()} />
          ) : (
            <Play size="32" color="#ffffff" onClick={() => handlePlayClick()} />
          ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
