class Sudoku {
    constructor() {
        this.grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        this.solution = Array.from({ length: 9 }, () => Array(9).fill(0));
    }

    isSafe(row, col, num) {
        for (let x = 0; x < 9; x++)
            if (this.grid[row][x] === num || this.grid[x][col] === num) return false;

        let startRow = row - row % 3, startCol = col - col % 3;
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (this.grid[startRow + i][startCol + j] === num) return false;

        return true;
    }

    solveGrid() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.grid[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (this.isSafe(row, col, num)) {
                            this.grid[row][col] = num;
                            if (this.solveGrid()) return true;
                            this.grid[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    fillDiagonal() {
        for (let i = 0; i < 9; i += 3) this.fillBox(i, i);
    }

    fillBox(row, col) {
        let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        nums = nums.sort(() => Math.random() - 0.5);
        let idx = 0;
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                this.grid[row + i][col + j] = nums[idx++];
    }

    removeDigits(count) {
        let removed = 0;
        while (removed < count) {
            let i = Math.floor(Math.random() * 9);
            let j = Math.floor(Math.random() * 9);
            if (this.grid[i][j] !== 0) {
                this.grid[i][j] = 0;
                removed++;
            }
        }
    }

    generate(difficulty = "medium") {
        this.grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        this.fillDiagonal();
        this.solveGrid();
        this.solution = this.grid.map(row => [...row]);

        let removeCount;
        if (difficulty === "easy") removeCount = 30;
        else if (difficulty === "medium") removeCount = 40;
        else removeCount = 50;

        this.removeDigits(removeCount);
    }
}
