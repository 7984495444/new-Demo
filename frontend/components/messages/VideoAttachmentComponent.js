import React, { useState, useRef, useEffect } from "react";
import { Pause, Play } from "iconsax-react";

const VideoAttachmentComponent = ({ src, alt }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const handleLoadedData = () => {
    setIsLoading(false);
  };
  return (
    <div className="video-container">
      <video
        className="video-player object-cover-center h-xl-18 w-xl-18 h-lg-14 w-lg-14 h-10 w-10 flex-none rounded-2"
        ref={videoRef}
        src={src}
        alt={alt}
        onLoadedData={handleLoadedData}
      />

      <div className="button-container">
        {isLoading && <div className="loader"></div>}
        {!isLoading &&
          (isPlaying ? (
            <Pause size="16" color="#ffffff" onClick={togglePlay} />
          ) : (
            <Play size="16" color="#ffffff" onClick={togglePlay} />
          ))}
      </div>
    </div>
  );
};

export default VideoAttachmentComponent;
