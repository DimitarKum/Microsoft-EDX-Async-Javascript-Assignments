var activeTileCount = 0;
var correctTiles = 0;
var activeTile;
var time = 0;
var gameOver = false;
var bestScore = 999999999999999999;

function init() {
    tiles = $(".inactiveTile");

    function setTileActive(tile){
        if(gameOver){
            return;
        }
        if(tile.className == "inactiveTile" && activeTileCount <= 1){
            if(activeTileCount == 1 && activeTile.assignedNumber == tile.assignedNumber){
                correctTiles += 2;
                activeTileCount = 0;
                setTileCorrect(tile);
                setTileCorrect(activeTile);
                if(correctTiles == 8){
                    gameOver = true;
                    if(time < bestScore){
                        bestScore = time;
                        $("#highScore")[0].innerHTML = "High Score: " + time;
                        setTimeout(function(){
                            alert("Congratulations, you've achieved a new best score: " + time + "!");
                        }, 150);
                    }else{
                        setTimeout(function(){
                            alert("Congratulations, you've completed the game in " + time + " seconds!");
                        }, 150);
                    }
                }
            }else{
                ++activeTileCount;
                activeTile = tile;
                tile.classList.add("activeTile");
                tile.classList.remove("inactiveTile");
            }
        }
    }

    function setTileInactive(tile){
        if(gameOver){
            return;
        }
        if(tile.className == "activeTile"){
            --activeTileCount;
            tile.classList.add("inactiveTile");
            tile.classList.remove("activeTile");
        }
    }

    function setTileCorrect(tile){
        if(gameOver){
            return;
        }
        tile.isCorrect = true;
        tile.classList.add("correctTile");
        if(tile.className == "activeTile"){
            tile.classList.remove("activeTile");
        }else if(tile.className == "inactiveTile"){
            tile.classList.remove("inactiveTile");
        }
    }

    function updateTime(){
        if(gameOver){
            clearInterval(timerIntervalId);
        }else{
            ++time;
            $("#timer")[0].innerHTML = "Time: " + time;
        }
    }
    var timerIntervalId = setInterval(updateTime, 1000);
    
    function startGame(){
        activeTileCount = 0;
        correctTiles = 0;
        activeTile;
        time = 0;
        gameOver = false;
        $("#timer")[0].innerHTML = "Time: 0";
        clearInterval(timerIntervalId);
        timerIntervalId = setInterval(updateTime, 1000);
        
        assignNumbersToTiles(tiles);
        $.each(tiles, function(index, tile){
            tile.className = "inactiveTile";
            tile.onclick = function() {
                setTileActive(tile);
                if(tile.className == "activeTile"){
                    setTimeout(function() {
                        setTileInactive(tile);
                    }, 1050);
                }
            };
        })
    }

    $("#startGame")[0].onclick = startGame;
    startGame();
}

function getNumbers(){
    var numbers = [];
    while(numbers.length < 10){
        var chosenNumber = Math.floor(100 * Math.random() + 1);
        if(!numbers.includes(chosenNumber)){
            numbers.push(chosenNumber);
            numbers.push(chosenNumber);
        }
    }
    return numbers
}

function assignNumbersToTiles(tiles){
    numbers = getNumbers();
    $.each(tiles, function(index, tile){
        var chosenIndex = Math.floor(Math.random() * numbers.length);
        var chosenNumber = numbers[chosenIndex];
        numbers.splice(chosenIndex, 1);
        tile.assignedNumber = chosenNumber;
        tile.innerHTML = chosenNumber;
    });
}

window.addEventListener("load", init);
// init();