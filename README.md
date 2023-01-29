# Project Description
- The function of this app is to allow NBA fans to search for their favorite players and compare their current season stats with other players with a similiar caliber. It is oriented for everyone but is specifically a useful source for people that play fantasy basketball and need updated stats.

# Project Links
- [Github Repo](https://github.com/shamzaali7/nba-stat-comparison)
- [Deployed Site](https://nba-stat-comparison-gkoi.vercel.app/)

# Wireframes & React Component Hierarchy
- [Wireframes](https://whimsical.com/project-2-basketball-AiSRB8yEHakkXUDv4VLWyn)
- [React Architecture](src/Assets/ReactComponentHierarchy.jpg)

# MVP/PostMVP
- MVP for this website consists of a useable "compare players" page that allows the user to input two of their preferred players and be redirected to a stats page that provides them with a comparison of the current season averages of the two players.

- Post MVP is the players list page that provides the users with a current top 20 players list as well as a link to all current NBA players. 

### MVP
- Grab information from an NBA API through a fetch request with axios
- Provide the user with an input field to access the API data
- Take that data and output the values of the player requested by the user

### Post MVP
- Use another NBA API to grab player ID's
- Interpolate user ID's in the url of a png website to access player pictures
- Print pictures of the selected players along with the stats

# Components

| Components  | Description                                                                                 |
|-------------|:-------------------------------------------------------------------------------------------:|
| App         | Contains the main functions and API as well as the Router and its components and the nav bar|
| Fighter     | Shows two form inputs that interact with the user                                           |
| Stats       | Renders multiple stat values of the selected players and their headshots                    |
| PlayerList  | Provides a set of the current top 20 NBA players                                            |
| Home        | Has a video embedded in the background showing a basketball clip                            |
| Header      | Retains the title of the webpage that is rendered on all pages                              |
| Footer      | Retains a rights statement that is rendered on all pages                                    |

# Time Frames

Component | Priority | Estimated Time | Time Invested | Actual Time
---- | ---- | ---- | ---- | ----
Creating Components | H | 1hr | 2hrs | 2hrs   
Setting up + Initializing API | H | 4hrs | 6hrs | 6hrs
Making links and lining routes | M | 1hr | 2hrs | 2hrs
Adding Form and passing its changes | M | 3hrs | 3hrs | 3hrs
Passing state and updating stats component | H | 2hrs | 3hrs | 3hrs
Retrieving and implementing new API with separate url | H | 4hrs | 4hrs | 4hrs
Total | N/A | 15hrs | 20hrs | 20hrs

# Additional Libraries
- Axios was used to assist the import of API's onto the code

# Code Snippet
[Personal favorite](src/Assets/Code-Snippet.jpg)

# Issues and Resolutions

#### Error: I looked around everywhere for an API that contains NBA player headshots but didn't manage to find any. I came across an article that had a url for nba player headshots based on player ID's but couldnt use that because the NBA api they were using to get the player pictures had a blocked CORS policy. 
#### Resolution: I searched deep and found an nba api client that could be installed through the terminal. Within that API was player ID's in a json file. With the url from the previous website and the newly obtained ID's, I was finally able to retrieve all of the player headshots.

#### Error: Cannot read properties of undefined reading State
#### Resolution: Was supposed to use props (accidental)

#### Error: Cannot read properties of undefined reading PlayerID, Syntax error for calling object wihtin object
#### Resolution: Had to put brackets and back quotes around the players name which was being interpolated

#### Error: {props.playerOneName &&}
#### Resolution: Replaced playerOneName with a counter to see if a player name was submitted and show a check mark.
