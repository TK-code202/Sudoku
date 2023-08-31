import $ from 'jquery';
import { refreshPage, generatePuzzle, puzzles, solutions } from './js/sudoku';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

$(document).ready( ()=> {
    let numSelected = null;
    // let tileSelected = null;

    let checks = 0;
    let board = [];
    let solution = [];


    $("#newGame").on("click", refreshPage);

    let idArray = [];

    const random = generatePuzzle();
    board = puzzles[random];
    solution = solutions[random];

    
    function selectNumber () {
        if (numSelected != null) {
            numSelected.removeClass("number-selected");
        }
        numSelected = $(this);
        numSelected.addClass("number-selected");
    }

    function selectTile () {
        if (numSelected) {
            $(this).removeClass("correct wrong").text(numSelected.attr("id"));
        }
    }

    const setGame = () => {
        // Digits 1-9
        for (let i = 1; i <= 9; i++) {
            let number = $("<div>").attr("id", i).addClass("number").text(i).on("click", selectNumber);
            $("#key-digits").append(number);
        }

        // Board 9x9
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                let tile = $("<div>")
                    .attr("id", r + "-" + c).addClass("tile")
                    .on("click", selectTile);
                    if (r == 2 || r == 5) {
                        tile.addClass("horizontal-line");
                    }
                    if (c == 2 || c == 5) {
                        tile.addClass("vertical-line");
                    }

                idArray.push(tile.attr("id"));

                if (board[r][c] != "-") {
                    tile.text(board[r][c]).addClass("tile-start").off("click", selectTile);
                }

                $("#board").append(tile);
            }
        }
    };



    const Validate = ()=> {
        checks += 1;
        $(".checks-count").text(checks);
        let checker = [];
        let checker2 = [];

        idArray.forEach((element) =>  {
            let numberTile = $("#" + element);
            let coords = element.split("-"); // ["0", "0"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            if (solution[r][c] == numberTile.text()) {
                numberTile.removeClass("wrong").addClass("correct").off("click", selectTile);
            } else {
                numberTile.removeClass("correct").addClass("wrong");
            }

            checker.push(solution[r][c]);
            checker2.push(numberTile.text());

        });
        if (checker.join("") == checker2.join("")) {
            $(".mode-alert").show(1000);
            $("body").addClass("winner");
            $("#check-button").off("click", Validate);

            if(checks = 1) {
                $(".grade").text("⭐⭐⭐⭐⭐");
            } else if (checks >= 2 && checks <= 4) {
                $(".grade").text("⭐⭐⭐⭐");
            } else if (checks >= 5 && checks <= 8) {
                $(".grade").text("⭐⭐⭐");
            } else {
                $(".grade").text("⭐⭐");
            }
        }
    };

    $("#check-button").on("click", Validate);

    setGame();
    $(".btn-close").click(function() {
        $(".mode-alert").hide();
    });
});