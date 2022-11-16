import React from 'react';
import Players from '../players.json';

function Stats(props){
    const fGP1 = (props.playerOneStats.fgm/props.playerOneStats.fga*100).toFixed(1);
    const fGP2 = (props.playerTwoStats.fgm/props.playerTwoStats.fga*100).toFixed(1);
    const fG3p1 = ((props.playerOneStats.fg3m/props.playerOneStats.fg3a*100).toFixed(1));
    const fG3p2 = ((props.playerTwoStats.fg3m/props.playerTwoStats.fg3a*100).toFixed(1));
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

    let playerNameOne = props.playerOneName
    let playerNameTwo = props.playerTwoName
    let playerOneID = Players[`${playerNameOne}`].PlayerID
    let playerTwoID = Players[`${playerNameTwo}`].PlayerID

    function changeColor1(){
        if (props.playerOneStats.pts > props.playerTwoStats.pts){
            colorPts1 = "green";
        }else{
            colorPts2 = "green";
        }
        if (props.playerOneStats.reb > props.playerTwoStats.reb){
            colorReb1 = "green";
        }else{
            colorReb2 = "green";
        }
        if (props.playerOneStats.ast > props.playerTwoStats.ast){
            colorAst1 = "green";
        }else{
            colorAst2 = "green";
        }
        if (props.playerOneStats.blk > props.playerTwoStats.blk){
            colorBlk1 = "green";
        }else{
            colorBlk2 = "green";
        }
        if (props.playerOneStats.stl > props.playerTwoStats.stl){
            colorStl1 = "green";
        }else{
            colorStl2 = "green";
        }
        if (fGP1 > fGP2){
            colorfGP1 = "green";
        }else{
            colorfGP2 = "green";
        }
        if (fG3p1 > fG3p2){
            colorfG3p1 = "green";
        }else{
            colorfG3p2= "green";
        }
        
    }
    changeColor1();

    return(
        <div><h1 className="stats-title">Season Averages</h1>
            <div className="container-stats">
                <div className="stats-one">
                    <p>{props.playerOneName.toUpperCase()}</p>
                    <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerOneID}.png`}/>
                    <ul>
                        <li>
                            Points:  <span className={colorPts1}>{Math.round(props.playerOneStats.pts)}</span>
                        </li>
                        <li>
                            Rebounds: <span className={colorReb1}>{Math.round(props.playerOneStats.reb)}</span>
                        </li>
                        <li>
                            Assists: <span className={colorAst1}>{Math.round(props.playerOneStats.ast)}</span>
                        </li>
                        <li>
                            Blocks: <span className={colorBlk1}>{(props.playerOneStats.blk)}</span>
                        </li>
                        <li>
                            Steals: <span className={colorStl1}>{props.playerOneStats.stl}</span>
                        </li>
                        <li>
                            Field-goal percentage: <span className={colorfGP1}>{fGP1}</span>%
                        </li>
                        <li>
                            3-pt percentage: <span className={colorfG3p1}>{fG3p1}</span>%
                        </li>
                    </ul>
                </div>
                <div className="stats-two">
                    <p>{props.playerTwoName.toUpperCase()}</p>
                    <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerTwoID}.png`}/>
                    <ul>
                        <li>
                            Points: <span className={colorPts2}>{Math.round(props.playerTwoStats.pts)}</span>
                        </li>
                        <li>
                            Rebounds: <span className={colorReb2}>{Math.round(props.playerTwoStats.reb)}</span>
                        </li>
                        <li>
                            Assists: <span className={colorAst2}>{Math.round(props.playerTwoStats.ast)}</span>
                        </li>
                        <li>
                            Blocks: <span className={colorBlk2}>{(props.playerTwoStats.blk)}</span>
                        </li>
                        <li>
                            Steals: <span className={colorStl2}>{props.playerTwoStats.stl}</span>
                        </li>
                        <li>
                            Field-goal percentage: <span className={colorfGP2}>{fGP2}</span>%
                        </li>
                        <li>
                            3-pt percentage: <span className={colorfG3p2}>{fG3p2}</span>%
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Stats;