import React from 'react';

function Fighters(props){
    return(
        <div className="fighter">
            <div>
                <form className="player-one" onSubmit={props.handleSubmitOne}>
                    <input type="text" onChange={props.handleChangeOne}></input>
                    <button type="submit"></button>
                </form>
            </div>
            <div>
                <form className="player-two" onSubmit={props.handleSubmitTwo}>
                    <input type="text" onChange={props.handleChangeTwo}></input>
                    <button type="submit"></button>
                </form>
            </div>
        </div>
    )
}

export default Fighters