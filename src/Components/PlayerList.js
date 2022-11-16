import eact, {useState} from 'react';
import axios, { AxiosHeaders } from 'axios';

function PlayerList(){
    return(
        <div>
            <p className="playerlist-title">Top 20 NBA players by NBCSports</p>
            <p className="player-link"><a target="blank" href="https://www.nba.com/players">Link to nba player names</a></p>
            <div className="top-list">
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203507.png`}/>
                    <p>Giannis Antetokounmpo</p>
                </div>
                <div  className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201142.png`}/>
                    <p>Kevin Durant</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201939.png`}/>
                    <p>Stephen Curry</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203999.png`}/>
                    <p>Nikola Jokic</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203954.png`}/>
                    <p>Joel Embiid</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628369.png`}/>
                    <p>Jayson Tatum</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629029.png`}/>
                    <p>Luka Doncic</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/2544.png`}/>
                    <p>Lebron James</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202695.png`}/>
                    <p>Kawhi Leonard</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629630.png`}/>
                    <p>Ja Morant</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1626164.png`}/>
                    <p>Devin booker</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202710.png`}/>
                    <p>Jimmy Butler</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201935.png`}/>
                    <p>James Harden</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1626157.png`}/>
                    <p>Karl-Anthony Towns</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629027.png`}/>
                    <p>Trae Young</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203076.png`}/>
                    <p>Anthony Davis</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628378.png`}/>
                    <p>Donovan Mitchell</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203081.png`}/>
                    <p>Damien Lillard</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203078.png`}/>
                    <p>Bradley Beal</p>
                </div>
                <div className="player-top20">
                <img src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202331.png`}/>
                    <p>Paul George</p>
                </div>
            </div>
        </div>
    )
}

export default PlayerList