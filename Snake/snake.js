(function(){

    var canvas;
    var ctx;

    var snake;
    var snake_dir;
    var snake_next_dir;

    var food = {x: 0, y: 0};

    class Obstacle  {
      constructor(x, y) {
      this.x = x;
      this.y = y;
    }
}
    var obstacles = [];

    var score;
    var scores = [0,0,0, 0, 0];
    var active_score_location = 0;

    var wall;

    var screen_snake;
    var screen_menu;
    var screen_setting;
    var screen_credits;
    var button_newgame_menu;
    var button_newgame_setting;
    var button_newgame_credits;
    var button_setting_menu;
    var button_setting_credits;
    var button_original_menu;
    var ele_score,ele_score2,ele_score3, ele_score4, ele_score5;


    var drawBorder = function (xPos, yPos, width, height, thickness){
      ctx.fillStyle='black';
      ctx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
    }



    var activeDot = function(x, y){
        drawBorder(x * 10, y * 10, 10, 10, 1);
        ctx.fillStyle = "white";
        ctx.fillRect(x * 10, y * 10, 10, 10);
    }

    var activeFood = function(x, y){
        ctx.fillStyle = "orange";
        ctx.fillRect(x * 10, y * 10, 10, 10);
    }


var activeObject = function(x, y){
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(x * 10, y * 10, 10, 10);
}



    var changeDir = function(key){

        if(key == 38 && snake_dir != 2){
            snake_next_dir = 0;
        }else{

        if (key == 39 && snake_dir != 3){
            snake_next_dir = 1;
        }else{

        if (key == 40 && snake_dir != 0){
            snake_next_dir = 2;
        }else{

        if(key == 37 && snake_dir != 1){
            snake_next_dir = 3;
        } } } }

    }



    var addFood = function(){
        food.x = Math.floor(Math.random() * ((canvas.width / 10) - 1));
        food.y = Math.floor(Math.random() * ((canvas.height / 10) - 1));
        //not on snake
        for(var i = 0; i < snake.length; i++){
            if(checkBlock(food.x, food.y, snake[i].x, snake[i].y)){
                addFood();
            }
        }
        //not on obstacle/still buggy, logic is off a litte
          for(i in obstacles){
            if(checkBlock(food.x, food.y, obstacles[i].x, obstacles[i].y)){
            addFood();
          }
        }
    }


var addObstacle = function(){
    var x = Math.floor(Math.random() * ((canvas.width / 10) - 1));
    var y = Math.floor(Math.random() * ((canvas.width / 10) - 1));
    for(var i = 0; i < snake.length; i++){
        if(checkBlock(x, y, snake[i].x, snake[i].y)){
            addObstacle();
        }
    }
    newObstacle = new Obstacle(x,y);
    obstacles.push(newObstacle);
}

//UPDATE
var update =  function(){

    var _x = snake[0].x;
    var _y = snake[0].y;
snake_dir = snake_next_dir;

    switch(snake_dir){
        case 0: _y--; break;
        case 1: _x++; break;
        case 2: _y++; break;
        case 3: _x--; break;
    }

    snake.pop();
    snake.unshift({x: _x, y: _y});



    if(wall == 1){
    // hit wall, game over
        if (snake[0].x < 0 || snake[0].x == canvas.width / 10 || snake[0].y < 0 || snake[0].y == canvas.height / 10){
            resetValues();
            showScreen(1);
            return;
        }
    }else{

        for(var i = 0, x = snake.length; i < x; i++){
            if(snake[i].x < 0){
                snake[i].x = snake[i].x + (canvas.width / 10);
            }
            if(snake[i].x == canvas.width / 10){
                snake[i].x = snake[i].x - (canvas.width / 10);
            }
            if(snake[i].y < 0){
                snake[i].y = snake[i].y + (canvas.height / 10);
            }
            if(snake[i].y == canvas.height / 10){
                snake[i].y = snake[i].y - (canvas.height / 10);
            }
        }
    }


// run into yourself death
    for(var i = 1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            resetValues();
            showScreen(1);
            return;
        }
    }

  //obstacle death
      for(var i = 1; i < obstacles.length; i++){
          if (snake[0].x == obstacles[i].x && snake[0].y == obstacles[i].y){
                resetValues();
                showScreen(1);
                return;
            }
        }

// eat the food and replace with a new one somewhere and snake increases by 3 blocks
    if(checkBlock(snake[0].x, snake[0].y, food.x, food.y)){
        snake[snake.length] = {x: snake[0].x, y: snake[0].y};
        snake[snake.length] = {x: snake[0].x, y: snake[0].y};
        snake[snake.length] = {x: snake[0].x, y: snake[0].y};
        score += 1;
        altScore(score);
        addFood();
        activeFood(food.x, food.y);
    }

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


for(i in obstacles){
       activeObject(obstacles[i].x,obstacles[i].y);
}

  }


    var render = function(){
      for(var i = 0; i < snake.length; i++){
          activeDot(snake[i].x, snake[i].y);
      }
      activeFood(food.x, food.y);
   }

    var checkBlock = function(x, y, _x, _y){
        return (x == _x && y == _y) ? true : false;
    }


    //Score stuff

    var altScore = function(score_val){

          for(var i = 0; i < scores.length; i++){
            if(score_val > scores[i]){
              scores[i] = score_val;
              break;
            }
          }

        ele_score.innerHTML = String(scores[0]);
        ele_score2.innerHTML = String(scores[1]);
        ele_score3.innerHTML = String(scores[2]);
        ele_score4.innerHTML = String(scores[3]);
        ele_score5.innerHTML = String(scores[4]);
    }

    var sortNumber = function(a,b){
        return b - a;
    }


    var mainLoop = function(){

            update();
            render();
            //The second value is the snake speed
            setTimeout(mainLoop, 150);
            //snake speed increases very single game????????
    }


    var newGame = function(){

        showScreen(0);
        screen_snake.focus();

        //begin at size 1
        snake = [];
        snake.push({x: 0, y: 15});


        snake_next_dir = 1;

        score = 0;
        altScore(score);

        addFood();

        for(var i = 1; i < 15; i++){
          addObstacle();
        }


        canvas.onkeydown = function(evt) {
            evt = evt || window.event;
            changeDir(evt.keyCode);
        }
        mainLoop();

    }

    var setWall = function(wall_value){
        wall = wall_value;
        if(wall == 1){screen_snake.style.borderColor = "red";}
    }

    //takes off all obstacles so the next game will make new ones
    var resetValues = function(){
      for(i in obstacles){
        obstacles.splice(i);
      }
    }



    var showScreen = function(screen_opt){
        switch(screen_opt){
            //game screen
            case 0:  screen_snake.style.display = "block";
                     screen_menu.style.display = "none";
                     screen_credits.style.display = "none";
                     break;
            //menu
            case 1:  screen_snake.style.display = "none";
                     screen_menu.style.display = "block";
                     screen_credits.style.display = "none";
                     break;
            //credits screen
            case 2:  screen_snake.style.display = "none";
                     screen_menu.style.display = "none";
                     screen_credits.style.display = "block";
                     break;

        }
    }


    window.onload = function(){

        canvas = document.getElementById("snake");
        ctx = canvas.getContext("2d");

            screen_snake = document.getElementById("snake");
            screen_menu = document.getElementById("menu");
            screen_credits = document.getElementById("credits");

            button_newgame_menu = document.getElementById("newgame_menu");
            button_newgame_setting = document.getElementById("newgame_setting");
            button_newgame_credits = document.getElementById("newgame_credits");
            button_setting_menu = document.getElementById("setting_menu");
            button_setting_credits = document.getElementById("setting_credits");
            button_original_menu = document.getElementById("main_menu");

            ele_score = document.getElementById("score_value");
            ele_score2 = document.getElementById("score_value2");
            ele_score3 = document.getElementById("score_value3");
            ele_score4 = document.getElementById("score_value4");
            ele_score5 = document.getElementById("score_value5");

        button_newgame_menu.onclick = function(){newGame();};
        button_newgame_credits.onclick = function(){newGame();};
        button_setting_credits.onclick = function(){showScreen(2)};
        button_original_menu.onclick = function(){showScreen(1)};

        setWall(1);

        showScreen("menu");

        document.onkeydown = function(evt){
            if(screen_credits.style.display == "block"){
                evt = evt || window.event;
                if(evt.keyCode == 32){
                    newGame();
                }
            }
        }
    }

})();
