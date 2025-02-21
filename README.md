
> Open this page at [https://moxventura.github.io/ptx-table/](https://moxventura.github.io/ptx-table/)

## Table Extension for microbit makecode

Creates a 2D array of numbers using blocks

Provides an easy way to display the table to the display allowing creation of maps, tracks or images.

### Create
Supply the number of rows and columns and optionally a default value for all the fields.

Note that the table is zero-based, so a 5x5 table wil have rows numbered 0, 1, 2, 3 and 4

### Access
Get columns or rows as arrays
Get a specific value from a cell providing `row` and `col` number

### Operations
Write the table to the led display. Values which are not 0 will be displayed.

Optionally provide `row` and `col` to select the cell that should be displayed on the top-left. If the Table runs out of bounds, the `defaultValue` will decide if out of bound cells are displayed or not. (Default = not)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/moxventura/ptx-table** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/moxventura/ptx-table** and click import

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
