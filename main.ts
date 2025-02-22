namespace table {

    /**
     * Creates a Table with the given amount of `rows` and `cols`
     * @param rows the number of rows
     * @param cols the number of columns
     * @param defaultValue the default value for the matrix
     */
    //% block="Table with $rows rows and $cols cols|| default value $defaultValue"
    //% rows.min=1 rows.defl=5
    //% cols.min=1 cols.defl=5
    //% expandableArgumentMode="toggle"
    //% defaultValue.defl=0
    //% group="Create"
    export function createTable(cols: number, rows: number, defaultValue?: number): number[][] {
        if (rows < 1 || cols < 1) return undefined;
        let table: number[][] = [];
        for (let i = 0; i < rows; i++) {
            table[i] = [];
            for (let j = 0; j < cols; j++) {
                table[i][j] = defaultValue;
            }
        }
        return table;
    }

    const directions = [
        [1, 0],   // right
        [0, 1],   // down
        [-1, 0],  // left
        [0, -1]   // up
    ];

    function carvePathIterative(maze: number[][], startX: number, startY: number) {
        const stack = [[startX, startY]]; // Initialize the stack with the starting position
        maze[startY][startX] = 0; // Mark the starting cell as a path

        while (stack.length > 0) {
            const [x, y] = stack.pop(); // Get the current cell

            const directions2 = [
                [1, 0],   // right
                [0, 1],   // down
                [-1, 0],  // left
                [0, -1]   // up
            ];
            const shuffledDirections = directions2.sort(() => Math.random() - 0.5); // Randomize directions

            for (let chosenDirection of shuffledDirections) {
                const chooseX = x + chosenDirection[0] * 2; // Move two steps in the x direction
                const chooseY = y + chosenDirection[1] * 2; // Move two steps in the y direction

                // Check if the new position is within bounds and is a wall
                if (chooseX >= 0 && chooseX < maze[0].length && chooseY >= 0 && chooseY < maze.length && maze[chooseY][chooseX] === 1) {
                    maze[y + chosenDirection[1]][x + chosenDirection[0]] = 0; // Remove the wall between the cells
                    maze[chooseY][chooseX] = 0; // Mark the new cell as a path
                    stack.push([chooseX, chooseY]); // Push the new cell onto the stack
                }
            }
        }
    }


    /**
     * Creates a Maze with the given amount of `rows` and `cols`
     * @param rows the number of rows
     * @param cols the number of columns
     */
    //% block="Maze table with $rows rows and $cols cols"
    //% rows.min=1 rows.defl=21
    //% cols.min=1 cols.defl=21
    //% group="Create"
    export function createMaze(cols: number, rows: number) {
        const maze = table.createTable(cols, rows, 1);
        carvePathIterative(maze, 0, 0);
        return maze;
    }

    /**
     * Sets a value in the table or does nothing if the location does not exist
     * @param row the row number of the value to set
     * @param col the column number of the value to set
     */
    //% block="in table $table| set value at row $row col $col| to $value"
    //% row.min=0
    //% col.min=0
    //% group="Access"
    export function setValue(table: number[][], col: number, row: number, value: number): void {
        if (table[row] && table[row][col] !== undefined) {
            table[row][col] = value;
        }
    }

    /**
     * Gets a value from the table or `undefined` if the given cell does not exist
     * @param table the table to get the value from
     * @param row the row number
     * @param col the column number
     */
    //% block="from table $table| get value at row $row| col $col"
    //% row.min=0
    //% col.min=0
    //% group="Access"
    export function getValue(table: number[][], col: number, row: number): number {
        if (table[row] && table[row][col] !== undefined) {
            return table[row][col];
        }
        return undefined;
    }

    /**
     * Writes the table to the led.
     * Optionally give the `row` and `col` of the cell to start drawing.
     * The starting cell would come in the top left corner
     */
    //% block="Write $table| to led|| starting from row $row and col $col or else $defaultValue"
    //% expandableArgumentMode="toggle"
    //% row.min=0 row.defl=0
    //% col.min=0 col.defl=0
    //% group="Operations"
    export function plot(table: number[][], col: number, row: number, defaultValue: number) {
        for (let k = 0; k < 5; k++) {
            for (let l = 0; l < 5; l++) {
                let value = getValue(table, row + k, col + l);
                if (value == undefined) {
                    value = defaultValue;
                }
                if (value && value != 0) {
                    led.plot(k, l);
                }
                else {
                    led.unplot(k, l);
                }
            }
        }
    }

    /**
    * Writes the table to the led. Starting at the given `row` and `col` on the led-grid
    * Optionally give the `row` and `col` of the cell of the table to start drawing.
    * The defaultValue will fill the rest of the grid
    */
    //% block="Write $table| to led starting at row $gridRow and col $gridCol| selecting row $row and col $col from table or else $defaultValue"
    //% expandableArgumentMode="toggle"
    //% gridRow.min=0 gridRow.max=4 gridRow.defl=0
    //% gridCol.min=0 gridcol.max=4 gridCol.defl=0
    //% row.min=0 row.defl=0
    //% col.min=0 col.defl=0
    //% group="Operations"
    export function plotAt(table: number[][], gridCol: number, gridRow: number, col: number = 0, row: number = 0, defaultValue: number = 0) {
        if (gridRow < 0 ||
            gridCol < 0 ||
            gridRow > 4 ||
            gridCol > 4) return;
        for (let m = 0; m < 5; m++) {
            for (let n = 0; n < 5; n++) {
                let plotAtValue = defaultValue;
                if (m >= gridRow && n >= gridCol) {
                    plotAtValue = getValue(table, col + m - gridCol, row + n - gridRow);
                }
                if (plotAtValue == undefined) {
                    plotAtValue = defaultValue;
                }
                if (plotAtValue && plotAtValue != 0) {
                    led.plot(m, n);
                }
                else {
                    led.unplot(m, n);
                }
            }
        }
    }
}
