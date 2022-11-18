import React from 'react';
import {Link} from 'react-router-dom';

function Fighters(props){
    let counter = 0;
    function handleOnClick(){
        counter--;
    }
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
                        <input type="text" onChange={props.handleChangeOne} placeholder="Enter full name"></input>
                        <button type="submit">Choose Player</button>
                        {props.countCheckOne > 0 && <span> ✅</span>}
                    </form>
                </div>
                <div className="player-two">
                    <form onSubmit={props.handleSubmitTwo}>
                        <input type="text" onChange={props.handleChangeTwo} placeholder="Enter full name"></input>
                        <button type="submit">Choose Player</button>
                        {(props.countCheckTwo+counter)> 0 && <span> ✅</span>}
                    </form>
                </div>
            </div>
            <div className="button-continue">
                <Link to="/stats">
                    <button onClick={handleOnClick} >Click here to continue</button>
                </Link>
            </div>
        </div>
    )
}

export default Fighters;