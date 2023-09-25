const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            return gameBoard[a];
        }
    }
    if (!gameBoard.includes('')) {
        gameActive = false;
        return 'T';
    }
    return null;
}

function handleClick(e) {
    const cellIndex = e.target.dataset.cellIndex;
    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cells[cellIndex].textContent = currentPlayer;
        const winner = checkWinner();
        if (winner === 'T') {
            status.textContent = "Empate!";
        } else if (winner) {
            status.textContent = `Jogador ${winner} venceu!`;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Próximo jogador: ${currentPlayer}`;
        }
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = '';
    cells.forEach((cell, index) => {
        cell.textContent = '';
        cell.dataset.cellIndex = index;
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
    cell.dataset.cellIndex = cell.id.split('-')[1];
});
resetButton.addEventListener('click', resetGame);
