# CasinoAPI

<!-- ABOUT THE PROJECT -->
## About The Project

APIs to play the casino game roulette


### Built With

* Node.js

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.


### Run

* install dependancies
```sh
   npm install
  ```

* run using nodemon
```sh
   nodemon
  ```
  
<!-- APIS -->
## APIs
### Casino
* POST /casino/register <br />
  payload {"name": "Casino Name"}  <br />
  To create casino

* GET /casino/ <br />
  To retrieve list of casinos

* PUT /casino/\<casinoId>/recharge <br />
  payload {"amount": Amount}  <br />
  To recharge a casino

* POST /casino/\<casinoId>/dealer <br />
  payload {"name": "Dealer Name"}  <br />
  To register a dealer under the casino
  
* GET /casino/\<casinoId>/dealer <br />
  To list dealers under a casino  <br />
 
### Dealer
* POST /dealer/\<dealerId>/startGame <br />
  To start a game <br />
  
* POST /dealer/\<dealerId>/stopGame/\<gameId> <br />
  To stop a game <br />
  
* POST /dealer/\<dealerId>/throwBall/\<gameId> <br />
  To throw ball of a game <br />
  
### User
* POST /user/register <br />
  payload {"name": "User Name"}  <br />
  To register a user <br />
  
* PUT /user/\<userId>/enterCasino/\<casinoId> <br />
  To register a user <br />
  
* PUT /user/\<userId>/recharge <br />
  payload {"amount": Amount}  <br />
  To recharge a user <br />
  
* GET /user/\<userId>/bettableGames <br />
  To list bettable games for in current casino <br />
  
* POST /user/\<userId>/makeBet <br />
  payload {"betNumber": Bet Number, "amount": Amount, "gameId": Game Id}  <br />
  To place a bet <br />
  
* POST /user/\<userId>/cashOut <br />
  To cash out all the balance <br />
