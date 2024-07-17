'use client'
import React from 'react';
import { CldVideoPlayer } from 'next-cloudinary';
import Vid from '@public/assets/vid/a.mp4';


const Page = () => {

  

  return (
    <div className="video-player" >
     <CldVideoPlayer
        width="1920"
        height="1080"
        src="https://res.cloudinary.com/dpjugqjnn/video/upload/v1719463538/samples/dance-2.mp4"
      />
    
    </div>
  );
};

export default Page;
