import React from 'react';

function Fighters(props){
    return(
        <div className="fighter">
            <div>
                <form className="player-one" onSubmit={props.onSubmitOne}>
                    <input type="text" onChange={props.onChangeOne}></input>
                    <button type="submit"></button>
                </form>
            </div>
            <div>
                <form className="player-two" onSubmit={props.onSubmitTwo}>
                    <input type="text" onChange={props.onChangeTwo}></input>
                    <button type="submit"></button>
                </form>
            </div>
        </div>
    )
}

export default Fighters