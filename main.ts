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
    export function createTable(rows: number, cols: number, defaultValue?: number): number[][] {
        let table: number[][] = [];
        for (let i = 0; i < rows; i++) {
            table[i] = [];
            for (let j = 0; j < cols; j++) {
                table[i][j] = defaultValue;
            }
        }
        return table;
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
    export function setValue(table: number[][], row: number, col: number, value: number): void {
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
    export function getValue(table: number[][], row: number, col: number): number {
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
    export function plot(table: number[][], row: number = 0, col: number = 0, defaultValue: number = 0) {
        for (let k = 0; k < 5; k++) {
            for (let l = 0; l < 5; l++) {
                let value = getValue(table, row + k, col + l);
                if (value == undefined) {
                    value = defaultValue;
                }
                if (value && value != 0) {
                    led.plot(l, k);
                }
                else {
                    led.unplot(l, k);
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
    //% row.min=0 row.defl=0
    //% col.min=0 col.defl=0
    //% group="Operations"
    export function plotAt(table: number[][], gridRow: number, gridCol: number, row: number = 0, col: number = 0, defaultValue: number = 0) {
        for (let m = 0; m < 5; m++) {
            for (let n = 0; n < 5; n++) {
                let plotAtValue = defaultValue;
                if (m >= gridRow && n >= gridCol) {
                    plotAtValue = getValue(table, row + m - gridRow, col + n - gridCol);
                }
                if (plotAtValue == undefined) {
                    plotAtValue = defaultValue;
                }
                if (plotAtValue && plotAtValue != 0) {
                    led.plot(n, m);
                }
                else {
                    led.unplot(n, m);
                }
            }
        }
    }
}
