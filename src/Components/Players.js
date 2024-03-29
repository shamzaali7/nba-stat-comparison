import React from 'react';
import {Link} from 'react-router-dom';

function Players(props){

    return(
        <div>
            <div className="container-question">
                <div className="question-img1">
                    <img height="300px" src="https://i.imgur.com/XMN6vJF.jpg" alt="Random Player"></img>
                </div>
                <div className="question-img2">
                    <img height="300px"src="https://i.imgur.com/XMN6vJF.jpg" alt="Random Player"></img>
                </div>
            </div>
            <div className="fighter">
                <div className="player-one">
                    <form onSubmit={props.handleSubmitOne}>
                        <input type="text" className="input-area" onChange={props.handleChangeOne} placeholder="Enter full name"></input>
                        <button type="submit" className="input-btn">Choose Player</button>
                        {props.countCheckOne > 0 && <span> ✅</span>}
                    </form>
                </div>
                <div className="player-two">
                    <form onSubmit={props.handleSubmitTwo}>
                        <input type="text" className="input-area" onChange={props.handleChangeTwo} placeholder="Enter full name"></input>
                        <button type="submit" className="input-btn">Choose Player</button>
                        {props.countCheckTwo > 0 && <span> ✅</span>}
                    </form>
                </div>
            </div>
            {props.countCheckOne + props.countCheckTwo === 2 &&
            (<div className="button-continue">
                <Link to="/stats">
                    <button className="input-btn">Click here to continue</button>
                </Link>
            </div>
            )}
        </div>
    )
}

export default Players;