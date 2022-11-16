import React from 'react';
import {Link} from 'react-router-dom';

function Fighters(props){
    return(
        <div>
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
                        {props.countCheckTwo > 0 && <span> ✅</span>}
                    </form>
                </div>
            </div>
            <div className="button-continue">
                <Link to="/stats">
                    <button>Click here to continue</button>
                </Link>
            </div>
        </div>
    )
}

export default Fighters;