// tests go here; this will not be compiled when this package is used as an extension.
// Run the Test Suite or not?
const runTests = true

if (runTests) {

    let errors = 0
    let testsRun = 0
    function assert(where: string, expected: any, actual: any) {
        if (expected == actual) {
            serial.writeLine(where + " : Passed")
            testsRun += 1
        } else {
            errors += 1
            serial.writeLine(where + " : FAILED\t Expected: " + expected + ' got: ' + actual)
        }
    }

    function testingDone() {
        if (errors == 0) {
            serial.writeLine("All " + testsRun + " tests passed")
            basic.showIcon(IconNames.Happy)
        } else {
            serial.writeLine("Failed " + errors + " of " + testsRun)
            while (true) {
                basic.showIcon(IconNames.Sad)
                basic.showNumber(errors)
                break
            }
        }
    }
    assert("We should not be able to create a 0x0 table", undefined, table.createTable(0, 0))
    serial.writeLine("Create 3x3 table and check defaultvalues")
    let m = table.createTable(3, 3, 1)
    assert("Table row size is 3", 3, m.length)
    assert("Table column size is 3", 3, m[0].length)
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            assert("Default value is 1 at " + i + "," + j, 1, m[i][j])
        }
    }
    serial.writeLine("Setting invalid rows or cols to 0 should not change anything")
    assert("Set value at -1, -1 to 0", undefined, table.setValue(m, -1, -1, 0))
    assert("Set value at 3, 3 to 0", undefined, table.setValue(m, 3, 3, 0))
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            assert("Default value is 1 at " + i + "," + j, 1, m[i][j])
        }
    }
    serial.writeLine("Set value at 1,1 to 0")
    table.setValue(m, 1, 1, 0)
    assert("Table has 0 value at 1,1", 0, m[1][1])
    assert("getValue returns 0 value at 1,1", 0, table.getValue(m, 1, 1))
    serial.writeLine("Set value at 0,0 to -10")
    table.setValue(m, 0, 0, -10)
    assert("Table has -10 value at 0,0", -10, m[0][0])
    assert("getValue returns -10 value at 0,0", -10, table.getValue(m, 0, 0))
    serial.writeLine("Plot table and check led status")
    table.plot(m)
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let expected = true
            if (i == 1 && j == 1 || // We changed 1,1 to 0
                i >= 3 || // outside grid should be 0
                j >= 3
            ) {
                expected = false
            }
            assert("Check led status at " + i + "," + j, expected, led.point(i, j))
        }
    }
    serial.writeLine("Plot table from 1,1 and check led status")
    table.plot(m, 1, 1)
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let expected = true
            if (i == 0 && j == 0 || // We changed 1,1 to 0
                i >= 2 || // outside grid should be 0
                j >= 2
            ) {
                expected = false
            }
            assert("Check led status at " + i + "," + j, expected, led.point(i, j))
        }
    }
    serial.writeLine("Plot table from 1,1 with leds-on for out-of-bounds and check led status")
    table.plot(m, 1, 1, 1)
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let expected = true
            if (i == 0 && j == 0) {// We changed 1,1 to 0
                expected = false
            }
            assert("Check led status at " + i + "," + j, expected, led.point(i, j))
        }
    }
    serial.writeLine("Plot table at 1,1 from 1,1 with leds-on for out-of-bounds and check led status")
    table.plotAt(m, 1, 1, 1, 1, 1)
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let expected = true
            if (i == 1 && j == 1) {// We changed 1,1 to 0
                expected = false
            }
            assert("Check led status at " + i + "," + j, expected, led.point(i, j))
        }
    }
    serial.writeLine("Plot table at 1,1 from 1,1 with leds-off for out-of-bounds and check led status")
    table.plotAt(m, 1, 1, 1, 1, 0)
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let expected = true
            if (i < 1 || // top row should have defaultValue
                j < 1 || // left column should have defaultValue
                i > 2 || // bottom rows should have defaultValue
                j > 2 || // right columns should have defaultValue
                i == 1 && j == 1) {// We changed 1,1 to 0
                expected = false
            }
            assert("Check led status at " + i + "," + j, expected, led.point(i, j))
        }
    }
    serial.writeLine("Plot table at 4,4 from 0,0 with leds-off for out-of-bounds and check led status")
    table.plotAt(m, 4, 4, 0, 0, 0)
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let expected = false
            if (i == 4 && j == 4) {
                expected = true
            }
            assert("Check led status at " + i + "," + j, expected, led.point(i, j))
        }
    }
    serial.writeLine("Create 3, 4 table with defaultValue 8 and plot")

    let n = table.createTable(3, 4, 8)
    table.plot(n)
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let expected = false
            if (i < 3 && j < 4) {
                expected = true
            }
            assert("Check led status at " + i + "," + j, expected, led.point(i, j))
        }
    }
    serial.writeLine("Set value of 2,1 to off")
    table.setValue(n, 2, 1, 0)
    table.plot(n)
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let expected = false
            if (i < 3 && j < 4) {
                expected = true
            }
            if (i == 2 && j == 1) {
                expected = false
            }
            assert("Check led status at " + i + "," + j, expected, led.point(i, j))
        }
    }
    testingDone()
}