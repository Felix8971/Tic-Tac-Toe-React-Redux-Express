const express = require('express');
const os = require('os');

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const winTest = (id, grid) => {
    let line = (id,idList) => {
        return (grid[idList[0]] == id && grid[idList[1]] == id && grid[idList[2]] == id)
    }
    if (   line(id,[0,1,2]) || line(id,[3,4,5]) || line(id,[6,7,8]) 
        || line(id,[0,3,6]) || line(id,[1,4,7]) || line(id,[2,5,8]) || line(id,[3,4,5])
        || line(id,[0,4,8]) || line(id,[2,4,6]) 
    ){
        return true;
    }else{
        return false;
    }

}

app.use(express.static('dist'));

var grid = [];

app.get('/api/newgame', (req, res) => { 
    grid = [null,null,null,null,null,null,null,null,null];
    if ( getRandomInt(0,1) === 0 ){
        grid[getRandomInt(0,8)] = 0;//the server play somewhere
    }
    res.send({ grid:grid});

    //computer id : 0
    //human player id : 1
});

app.post('/api/action', function(req, res){ 
    console.log('action');;
    if (!req.body) { 
        console.log("probleme au post");
        return res.sendStatus(400);
    }else{
        console.log("post:",req.body.squareId);
        let human_index = req.body.squareId
        let nb0 = grid.filter( elem => elem === 0 ).length;
        let nb1 = grid.filter( elem => elem === 1 ).length;
        console.log("nb0:",nb0);
        console.log("nb1:",nb1);
        if ( nb0 + nb1 < 9 ){
            if ( (nb0 - nb1 == 0 || nb0 - nb1 == 1) && grid[human_index] === null){
                grid[human_index] = 1;
                //check if human win 
                if ( winTest(1,grid) ){
                    res.send({ grid:grid, winner: 1});
                }else{
                    //then we let the server play
                    let server_index = getRandomInt(0,8);
                    while( grid[server_index] != null ){
                        server_index = getRandomInt(0,8);
                    }
                    grid[server_index] = 0;
                    if ( winTest(0,grid) ){
                        res.send({ grid:grid, winner: 0});
                    }else{
                        res.send({ grid:grid});
                    }
                }
            }
        }

    }
});

app.listen(8080, () => console.log('Listening on port 8080 !'));
