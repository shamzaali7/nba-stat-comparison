import React from 'react';

function Stats(props){
    return(
        <div><span>Season Averages</span>
            <div>
                <ul>
                    <li>
                        Points: {Math.round(props.playerOneStats.pts)}
                    </li>
                    <li>
                        Rebounds: {Math.round(props.playerOneStats.dreb + props.playerOneStats.oreb)}
                    </li>
                    <li>
                        Assists: {Math.round(props.playerOneStats.ast)}
                    </li>
                    <li>
                        Field-goal percentage: {(props.playerOneStats.fgm/props.playerOneStats.fga*100).toFixed(1)}
                    </li>
                    <li>
                        Points: {Math.round(props.playerOneStats.pts)}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Stats;