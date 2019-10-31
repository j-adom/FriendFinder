 
// ===============================================================================
// LOAD DATA
// Here we link routes to our friend database
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

 // API Route Requests

 //Serves full list of friends in database
 app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

 
  // Below code handles when a user submits a form and thus submits data to the server.
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    
    let newFriendScore = req.body.scores
    let bestFriend = 0
    let newFriend = 0

    //Function compares scores between two arrays of scores and calcultates total difference
    function compareScores (a, b){
        let totalDifference = 0
        for(i = 0; i < 10; i++){
            let difference = parseInt(a[i]) - parseInt(b[i])
            let net = Math.abs(difference)
            totalDifference += net
        }
        return totalDifference
    };

    //This loop compares user to each friend in database and saves the index of the friend with the least difference
    for(j = 1; j < friends.length; j++){
        let friendScore = friends[j].scores
        thisFriendDifference = compareScores(newFriendScore, friendScore)
        if(thisFriendDifference > bestFriend){
            newFriend = j
        } 
    }

    //Add user to friend database
    friends.push(req.body);

    //Return friend match 
    res.json(friends[newFriend])

     
  });

};