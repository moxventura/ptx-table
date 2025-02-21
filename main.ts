//% color="#AA278D" weight=50 icon="\uf0ce" block="Tables" advanced=true
//% groups=['Create', 'Access', 'Operations']
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
     * Gets a row from the table or `undefined` if the given row does not exist
     * @param table the table to get the value from
     * @param row the row number
     */
    //% block="from table $table get row $row"
    //% row.min=0
    //% group="Access"
    export function getRow(table: number[][], row: number): number[] {
        if (table[row] !== undefined) {
            return table[row];
        }
        return undefined;
    }

    /**
     * Gets a column from the table or `undefined` if the given column does not exist
     * @param table the table to get the value from
     * @param col the column number
     */
    //% block="from table $table get column $col"
    //% col.min=0
    //% group="Access"
    export function getColumn(table: number[][], col: number): number[] | undefined {
        if (table.length === 0 || col < 0) {
            return undefined;
        }

        const column: number[] = [];
        for (let row = 0; row < table.length; row++) {
            if (table[row][col] !== undefined) {
                column.push(table[row][col]);
            }
        }

        return column.length > 0 ? column : undefined;
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
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                let value = getValue(table, row + i, col + j);
                if (value == undefined) {
                    value = defaultValue;
                }
                if (value && value != 0) {
                    led.plot(j, i);
                }
                else {
                    led.unplot(j, i);
                }
            }
        }
    }
}