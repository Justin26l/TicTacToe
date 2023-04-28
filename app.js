
var clicks = 0;
var player = 0;
var matrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];
var score = {
    1: 0, 
    2: 0
};

function QS(selector){
    return document.querySelector(selector);
}
function QSA(selector){
    return document.querySelectorAll(selector);
}
function checkGame(){
    // check same num in row
    for (let i = 0; i < 3; i++) {
        if(matrix[i][0] > 0 && matrix[i][0] == matrix[i][1] && matrix[i][0] == matrix[i][2]){
            gameOver(matrix[i][0]);
            return;
        }
        else if (matrix[0][i] > 0 && matrix[0][i] == matrix[1][i] && matrix[0][i] == matrix[2][i]){
            gameOver(matrix[0][i]);
            return;
        };
    };
    if (matrix[0][0] > 0 && matrix[0][0] > 0 && matrix[0][0] == matrix[1][1] && matrix[0][0] == matrix[2][2]){
        gameOver(matrix[0][0]);
        return;
    }
    else if (matrix[0][2] > 0 && matrix[0][2] > 0 && matrix[0][2] == matrix[1][1] && matrix[0][2] == matrix[2][0]){
        gameOver(matrix[0][2]);
        return;
    }
    else if (clicks == 9){// check table full
        gameOver(0);
        return;
    };
}

function gameOver(winnerID){
    if (winnerID == 0){
        QS("#game-result").innerHTML = `its a Draw!`;
        QS(".gameOver").classList.add("show");
        return;
    };
    score[winnerID] = score[winnerID] + 1;
    QS(`.P1-score`).innerHTML = score[1];
    QS(`.P2-score`).innerHTML = score[2];
    QS("#game-result").innerHTML = `Player ${winnerID} wins!`;
    QS(".gameOver").classList.add("show");
    // console.log(`Player ${winnerID} Win !`);
}

function switchPlayer(playerID){
    player=playerID;
    QS(`#switch${playerID}`).classList.add("active");
    QS(`#switch${playerID==1 ? 2 : 1}`).classList.remove("active");
}

// initialize the game
switchPlayer(1);
QSA(".cell").forEach((cell) => {
    cell.addEventListener("click", () => {
        cell.classList.add("active");
        const row = cell.getAttribute('row');
        const col = cell.getAttribute('col');

        // check if the cell is already marked
        if (matrix[row][col] !== 0) {
            // console.log("Marked Cell")
            return;
        };
        // console.log({input:matrix,output:[parseInt(row),parseInt(col)]});
        if(player==2){
            QS("#history").innerHTML += `
            {"input":{"matrix":[[${matrix[0]}],[${matrix[1]}],[${matrix[2]}]]},"output":{"[${row},${col}]":1}},`;
        }
        //mark the cell
        clicks++;
        matrix[row][col] = player;
        if(player == 1){
            cell.innerHTML = `<div class="circle"></div>`;
        }else{
            cell.innerHTML = `<svg class="cross"><use xlink:href="#cross"/></svg>`;
        };

        // check if the game is over
        checkGame();

        // player's turn
        switchPlayer(player==1 ? 2 : 1);

        // computer's turn
    });
});

// reset the game
QS("#reset").addEventListener("click", () => {

    //reset the game
    QSA(".cell").forEach((cell) => {
        cell.innerHTML = "";
        cell.classList.remove("active");
        cell.classList.add("deactive");
        setTimeout(() => {cell.classList.remove("deactive");}, 400);
    });
    QS(".gameOver").classList.remove("show");
    matrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    clicks = 0;
    // if no reset, loser starts first
    switchPlayer(1);
});

// switch player
QS("#switch1").addEventListener("click", () => {
    switchPlayer(1);
});
QS("#switch2").addEventListener("click", () => {
    switchPlayer(2);
});