1. Player
   1. Allow users to register
   2. Allow users to log-in with registered account
   3. Add user avatar that defaults to https://avatars.dicebear.com/
   4. Player can change the name and avatar on separate panel
3. Ad-hoc Tournament
   1. [**⩗**] Add new tournament with specified players
      1. [**⩗**] Players will be picked from multipicker 
      2. [**⩗**] Players have to be distinct (one player can play in one team per tournament)
   2. [**⩗**] Generate teams with randomized players
   3. [**⩗**] Generate match tree - number of matches in each tournament is dependant on number of teams generated
   4. Add POST endpoint to which team has won current match.
      1. This will find the match where specified team is part of and make it a winner
      2. If there is a next match -> move this team to the next match as one of the participants
      3. If there is no next match -> this team is a winner
      4. Only tournament's creator has the ability to make this call
