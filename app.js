const info = document.querySelector(".info");
const cells = document.querySelectorAll(".cell");

let lock = true;
let currentPlayer = "X";

info.textContent = `Au tour de ${currentPlayer}`;

let comboWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let game = ["", "", "", "", "", "", "", "", ""];

// Ad click
cells.forEach(cell => {
    cell.addEventListener("click", boxClick);
});

// After click on box
function boxClick(e) {
    const box = e.target;
    const indexBox = box.getAttribute('data-index');

    if (currentPlayer === "X") {
        box.classList.add("X");
    }
    else if(currentPlayer === "O") {
        box.classList.add("O");
    }
    
    if(game[indexBox]  !== "" || !lock){
        return;
    }

    game[indexBox] = currentPlayer;
    box.textContent =  currentPlayer;

    CheckRound()
}

// Check all cells
function CheckRound() {
    let gameOver = false;

    for(let i = 0; i < comboWin.length; i++) {
        
        const checkWin = comboWin[i];

        let a = game[checkWin[0]];
        let b = game[checkWin[1]];
        let c = game[checkWin[2]];

        if(a === "" || b === "" || c === ""){
            continue;
        }
    
        if(a === b && b === c) {
            gameOver = true;
            break;
        }
    }

    if(gameOver) {

        info.textContent = `Le joueur ${currentPlayer} a gagné`;
        lock = false;
        return;
    }

    let equality = !game.includes("");
    
    if(equality) {
        info.textContent = "Match Nul !";
        lock = false;
        return;
    }

    nextPlayer();
}

// Change the current player
function nextPlayer(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    
    info.textContent = `Au tour de ${currentPlayer}`;
}