const sudoku = new Sudoku();
const gridDiv = document.getElementById("sudokuGrid");
let selectedCell = null;

function renderGrid() {
    gridDiv.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            if (sudoku.grid[i][j] !== 0) {
                cell.textContent = sudoku.grid[i][j];
                cell.classList.add("prefilled");
            }
            cell.addEventListener("click", () => selectCell(cell));
            gridDiv.appendChild(cell);
        }
    }
}

function selectCell(cell) {
    if (cell.classList.contains("prefilled")) return;
    if (selectedCell) selectedCell.classList.remove("selected");
    selectedCell = cell;
    cell.classList.add("selected");
}

document.addEventListener("keydown", (e) => {
    if (!selectedCell) return;
    const num = parseInt(e.key);
    if (num >= 1 && num <= 9) {
        let row = selectedCell.dataset.row;
        let col = selectedCell.dataset.col;
        selectedCell.textContent = num;
        sudoku.grid[row][col] = num;
    }
    if (e.key === "Backspace" || e.key === "Delete") {
        let row = selectedCell.dataset.row;
        let col = selectedCell.dataset.col;
        selectedCell.textContent = "";
        sudoku.grid[row][col] = 0;
    }
});

document.getElementById("newGame").addEventListener("click", () => {
    const diff = document.getElementById("difficulty").value;
    sudoku.generate(diff);
    renderGrid();
});

document.getElementById("solve").addEventListener("click", () => {
    sudoku.grid = sudoku.solution.map(row => [...row]);
    renderGrid();
});

document.getElementById("reset").addEventListener("click", () => {
    sudoku.generate(document.getElementById("difficulty").value);
    renderGrid();
});

// Initial Game
sudoku.generate();
renderGrid();
x