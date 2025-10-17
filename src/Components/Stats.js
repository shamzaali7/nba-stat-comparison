import React, {useEffect, useState} from 'react';
import Players from '../players.json';

function Stats(props){
    // Helper function to safely get numeric values
    const safeValue = (value, defaultValue = 0) => {
        return value !== null && value !== undefined && !isNaN(value) ? value : defaultValue;
    };

    // Calculate percentages with null/undefined checks
    const fGP1 = props.playerOneStats.fga && props.playerOneStats.fga > 0 
        ? (safeValue(props.playerOneStats.fgm) / props.playerOneStats.fga * 100).toFixed(1)
        : "0.0";
    
    const fGP2 = props.playerTwoStats.fga && props.playerTwoStats.fga > 0
        ? (safeValue(props.playerTwoStats.fgm) / props.playerTwoStats.fga * 100).toFixed(1)
        : "0.0";
    
    const fG3p1 = props.playerOneStats.fg3a && props.playerOneStats.fg3a > 0
        ? (safeValue(props.playerOneStats.fg3m) / props.playerOneStats.fg3a * 100).toFixed(1)
        : "0.0";
    
    const fG3p2 = props.playerTwoStats.fg3a && props.playerTwoStats.fg3a > 0
        ? (safeValue(props.playerTwoStats.fg3m) / props.playerTwoStats.fg3a * 100).toFixed(1)
        : "0.0";

    let colorPts1= "red";
    let colorPts2= "red";
    let colorReb1= "red";
    let colorReb2= "red";
    let colorAst1= "red";
    let colorAst2= "red";
    let colorStl1= "red";
    let colorStl2= "red";
    let colorBlk1= "red";
    let colorBlk2= "red";
    let colorfGP1= "red";
    let colorfGP2= "red";
    let colorfG3p1= "red";
    let colorfG3p2= "red";
    
    const [playerOneID, setPlayerOneID] = useState();
    const [playerTwoID, setPlayerTwoID] = useState();

    function changeColor1(){
        if (safeValue(props.playerOneStats.pts) > safeValue(props.playerTwoStats.pts)){
            colorPts1 = "green";
        }else if (safeValue(props.playerOneStats.pts) < safeValue(props.playerTwoStats.pts)){
            colorPts2 = "green";
        }
        
        if (safeValue(props.playerOneStats.reb) > safeValue(props.playerTwoStats.reb)){
            colorReb1 = "green";
        }else if (safeValue(props.playerOneStats.reb) < safeValue(props.playerTwoStats.reb)){
            colorReb2 = "green";
        }
        
        if (safeValue(props.playerOneStats.ast) > safeValue(props.playerTwoStats.ast)){
            colorAst1 = "green";
        }else if (safeValue(props.playerOneStats.ast) < safeValue(props.playerTwoStats.ast)){
            colorAst2 = "green";
        }
        
        if (safeValue(props.playerOneStats.blk) > safeValue(props.playerTwoStats.blk)){
            colorBlk1 = "green";
        }else if (safeValue(props.playerOneStats.blk) < safeValue(props.playerTwoStats.blk)){
            colorBlk2 = "green";
        }
        
        if (safeValue(props.playerOneStats.stl) > safeValue(props.playerTwoStats.stl)){
            colorStl1 = "green";
        }else if (safeValue(props.playerOneStats.stl) < safeValue(props.playerTwoStats.stl)){
            colorStl2 = "green";
        }
        
        if (parseFloat(fGP1) > parseFloat(fGP2)){
            colorfGP1 = "green";
        }else if (parseFloat(fGP1) < parseFloat(fGP2)){
            colorfGP2 = "green";
        }
        
        if (parseFloat(fG3p1) > parseFloat(fG3p2)){
            colorfG3p1 = "green";
        }else if (parseFloat(fG3p1) < parseFloat(fG3p2)){
            colorfG3p2= "green";
        }
    }

    useEffect(() => {
        props.handleCountCheck();
        if (props.playerOneFullName && Players[props.playerOneFullName]) {
            setPlayerOneID(Players[props.playerOneFullName].PlayerID);
        }
        if (props.playerTwoFullName && Players[props.playerTwoFullName]) {
            setPlayerTwoID(Players[props.playerTwoFullName].PlayerID);
        }
    }, [])

    changeColor1();

    // Check if stats are available
    const hasPlayerOneStats = props.playerOneStats && Object.keys(props.playerOneStats).length > 0;
    const hasPlayerTwoStats = props.playerTwoStats && Object.keys(props.playerTwoStats).length > 0;

    return(
        <div>
            <h1 className="stats-title">Season Averages</h1>
            {props.playerOneStats.season && (
                <p style={{textAlign: 'center'}}>Season: {props.playerOneStats.season}</p>
            )}
            <div className="container-stats">
                <div className="stats-one">
                    <p>{props.playerOneFullName.toUpperCase() || "Player One"}</p>
                    {playerOneID && (
                        <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerOneID}.png`} 
                             alt={props.playerOneFullName}
                             onError={(e) => {e.target.src = 'https://via.placeholder.com/260x190?text=No+Image'}}/>
                    )}
                    {hasPlayerOneStats ? (
                        <ul>
                            <li>Points: <span className={colorPts1}>{safeValue(props.playerOneStats.pts).toFixed(1)}</span></li>
                            <li>Rebounds: <span className={colorReb1}>{safeValue(props.playerOneStats.reb).toFixed(1)}</span></li>
                            <li>Assists: <span className={colorAst1}>{safeValue(props.playerOneStats.ast).toFixed(1)}</span></li>
                            <li>Blocks: <span className={colorBlk1}>{safeValue(props.playerOneStats.blk).toFixed(1)}</span></li>
                            <li>Steals: <span className={colorStl1}>{safeValue(props.playerOneStats.stl).toFixed(1)}</span></li>
                            <li>Field-goal percentage: <span className={colorfGP1}>{fGP1}</span>%</li>
                            <li>3-pt percentage: <span className={colorfG3p1}>{fG3p1}</span>%</li>
                            <li>Games played: {safeValue(props.playerOneStats.games_played, 'N/A')}</li>
                        </ul>
                    ) : (
                        <p>No stats available</p>
                    )}
                </div>
                <div className="stats-two">
                    <p>{props.playerTwoFullName.toUpperCase() || "Player Two"}</p>
                    {playerTwoID && (
                        <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerTwoID}.png`} 
                             alt={props.playerTwoFullName}
                             onError={(e) => {e.target.src = 'https://via.placeholder.com/260x190?text=No+Image'}}/>
                    )}
                    {hasPlayerTwoStats ? (
                        <ul>
                            <li>Points: <span className={colorPts2}>{safeValue(props.playerTwoStats.pts).toFixed(1)}</span></li>
                            <li>Rebounds: <span className={colorReb2}>{safeValue(props.playerTwoStats.reb).toFixed(1)}</span></li>
                            <li>Assists: <span className={colorAst2}>{safeValue(props.playerTwoStats.ast).toFixed(1)}</span></li>
                            <li>Blocks: <span className={colorBlk2}>{safeValue(props.playerTwoStats.blk).toFixed(1)}</span></li>
                            <li>Steals: <span className={colorStl2}>{safeValue(props.playerTwoStats.stl).toFixed(1)}</span></li>
                            <li>Field-goal percentage: <span className={colorfGP2}>{fGP2}</span>%</li>
                            <li>3-pt percentage: <span className={colorfG3p2}>{fG3p2}</span>%</li>
                            <li>Games played: {safeValue(props.playerTwoStats.games_played, 'N/A')}</li>
                        </ul>
                    ) : (
                        <p>No stats available</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Stats;