// Player one information
var player1 = prompt("Enter the player name. You will be Blue");
var player1Color = 'rgb(86, 151, 255)';

// Player two information
var player2 = prompt("Enter the player2 name. You will be Red");
var player2Color = 'rgb(237, 45, 73)';

// Game state
var gameOn = true;

// jQuery to select the table rows
var table = $('table tr');

// Winning move check
function reportWin(rowNum, colNum) {
    console.log("You won starting at this row, col");
    console.log(rowNum);
    console.log(colNum);
}

// Change color of a cell
function changeColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

// Return color of a cell
function returnColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// Check the bottom row that is still grey: take in the column index and then return the bottom row
function checkBottom(colIndex) {
    var colorReport = returnColor(5, colIndex);
    for (var row = 5; row > -1; row--) {
        colorReport = returnColor(row, colIndex);
        if (colorReport == 'rgb(128, 128, 128)') {
            return row;
        }
    }
}

// Check for a win horizontally
function horizontalWinCheck() {
    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 4; col++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row, col + 1), returnColor(row, col + 2), returnColor(row, col + 3))) {
                console.log('horizontal');
                reportWin(row, col);
                return true;
            }
        }
    }
}

// Check for a win vertically
function verticalWinCheck() {
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 3; row++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col))) {
                console.log('vertical');
                reportWin(row, col);
                return true;
            }
        }
    }
}

// Check for a win diagonally
function diagonalWinCheck() {
    for (var col = 0; col < 4; col++) {
        for (var row = 0; row < 3; row++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col + 1), returnColor(row + 2, col + 2), returnColor(row + 3, col + 3))) {
                console.log('diagonal');
                reportWin(row, col);
                return true;
            } else if (colorMatchCheck(returnColor(row, col), returnColor(row - 1, col + 1), returnColor(row - 2, col + 2), returnColor(row - 3, col + 3))) {
                console.log('diagonal');
                reportWin(row, col);
                return true;
            }
        }
    }
}

// Check if four colors match
function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

// Start with player 1
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1 + " it is your turn. Pick a column to drop in!");

$('.board button').on('click', function () {
    var col = $(this).closest('td').index();
    var bottomAvail = checkBottom(col);

    changeColor(bottomAvail, col, currentColor);

    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        $('h1').text(currentName + " You have won!");
        $('h3').fadeOut('fast');
        $('h2').fadeOut('fast');
    }

    currentPlayer = currentPlayer * -1;

    if (currentPlayer === 1) {
        currentName = player1;
        $('h3').text(currentName + " it is your turn.");
        currentColor = player1Color;
    } else {
        currentName = player2;
        $('h3').text(currentName + " it is your turn.");
        currentColor = player2Color;
    }
});
