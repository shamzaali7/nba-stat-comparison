import React from 'react';
import AnkleBreaker from '../Assets/AnkleBreaker.mp4'


function Home(){
    return(
        <div className="video-background">
            <video src={AnkleBreaker} autoPlay loop muted/>
        </div>
    )
}

export default Home