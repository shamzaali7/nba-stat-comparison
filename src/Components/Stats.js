import React from 'react';

function Stats(props){
    let colorBox1= "red";
    let colorBox2= "red";
    function changeColor1(){
        if (props.playerOneStats.pts > props.playerTwoStats.pts){
            colorBox1 = "green";
        }else{
            colorBox2 = "green";
        }
    }
    changeColor1();
    // {(props.playerOneStats.pts > props.playerTwoStats.pts) && }

    return(
        <div><h1 className="stats-title">Season Averages</h1>
            <div className="container-stats">
            <div className="stats-one">
                <ul>
                    <li>
                        Points:  <span className={colorBox1}>{Math.round(props.playerOneStats.pts)}</span>
                    </li>
                    <li>
                        Rebounds: {Math.round(props.playerOneStats.dreb + props.playerOneStats.oreb)}
                    </li>
                    <li>
                        Assists: {Math.round(props.playerOneStats.ast)}
                    </li>
                    <li>
                        Blocks: {(props.playerOneStats.blk)}
                    </li>
                    <li>
                        Steals: {props.playerOneStats.stl}
                    </li>
                    <li>
                        Field-goal percentage: {(props.playerOneStats.fgm/props.playerOneStats.fga*100).toFixed(1)}%
                    </li>
                    <li>
                        3-pt percentage: {(props.playerOneStats.fg3m/props.playerOneStats.fg3a*100).toFixed(1)}%
                    </li>
                </ul>
            </div>
            <div className="stats-two">
                <ul>
                    <li>
                        Points: <span className={colorBox2}>{Math.round(props.playerTwoStats.pts)}</span>
                    </li>
                    <li>
                        Rebounds: {Math.round(props.playerTwoStats.dreb + props.playerTwoStats.oreb)}
                    </li>
                    <li>
                        Assists: {Math.round(props.playerTwoStats.ast)}
                    </li>
                    <li>
                        Blocks: {(props.playerTwoStats.blk)}
                    </li>
                    <li>
                        Steals: {props.playerTwoStats.stl}
                    </li>
                    <li>
                        Field-goal percentage: {(props.playerTwoStats.fgm/props.playerTwoStats.fga*100).toFixed(1)}%
                    </li>
                    <li>
                        3-pt percentage: {(props.playerTwoStats.fg3m/props.playerTwoStats.fg3a*100).toFixed(1)}%
                    </li>
                </ul>
            </div>
            </div>
        </div>
    )
}

export default Stats;