var PIXI = require('pixi.js')

var ConnectFour = function(rows, columns) {
		/**
		 * Init variables 
		 **/
		var Container = PIXI.Container,
	    autoDetectRenderer = PIXI.autoDetectRenderer,
	    Graphics = PIXI.Graphics;
		//Create a Pixi stage and renderer and add the 
		//renderer.view to the DOM
		var stage = new Container(),
		    renderer = autoDetectRenderer(600, 600);
		document.body.appendChild(renderer.view); 
		var change = 0;
		var colors = [0xFFFFFF, 0x42a4f4];
		var board = [];
		var graphBoard = [];
		var initMatrix = function() {
			for (var i = 0; i < rows; i++) {
				board[i] = [];
				graphBoard[i] = [];
				for (var j = 0; j < columns; j++) {
				  board[i][j] = -1;	
				  graphBoard[i][j] = null;
			    }
			}
		}

        var check = function(row, column, idxColumn, idxRow) {
        	var count = 0;
			var tempColumn = column;
			var tempRow = row;
			// horizontal check
			while(count < 4) {
			   tempColumn = tempColumn + idxColumn;
			   tempRow = tempRow + idxRow;
			   if (tempColumn >= columns || tempRow < 0 || tempRow >= rows || tempRow < 0) {
			   		return count;
			   }
               if(board[row][column] == board[tempRow][tempColumn]) {
               	count += 1;
               } else {
               		return count;
               } 
			}
			return count;
        }


        var checkWinner = function(row, column) {
        	// horizontal check
        	var count = check(row, column, 1, 0) + check(row, column, -1, 0) + 1;
        	if (count >= 4) {
        		return true;
        	}
        	// vertical check
        	count = check(row, column, 0, 1) + 1;
        	if (count >= 4) {
        		return true;
        	}
        	// diagonal 1 check
        	count = check(row, column, 1, 1) + check(row, column, -1, -1) + 1;
        	if (count >= 4) {
        		return true;
        	}
        	// diagonal 2 check
        	count = check(row, column, -1, 1) + check(row, column, 1, -1) + 1;
        	if (count >= 4) {
        		return true;
        	}

        	return false;
        }

        var handleClick = function() {
        	var r = rows - 1;
			var filled = false;
			while (r >=0 && !filled) {
				if (board[r][this.column] == -1) {
					graphBoard[r][this.column].clear();
					graphBoard[r][this.column].interactive = false;
					graphBoard[r][this.column].lineStyle(4, 0xFF3300, 1);
					graphBoard[r][this.column].beginFill(colors[change]);
					graphBoard[r][this.column].drawRect(20 + this.column * 50, 20 + r * 50, 50, 50);
					graphBoard[r][this.column].endFill();
					renderer.render(stage);
					board[r][this.column] = colors[change];
					filled = true; 
				} else {
				    r -= 1;
			    }
			}
			if (checkWinner(r, this.column)) {
				alert("Player " + (change + 1) + " won!" ); 
			}

			if (change == 0) {
				change = 1;
			} else {
				change = 0;
			} 

        }

		var drawBoard = function() {
			for(var i = 0; i< rows; i++) {
		   	  	for(var j= 0; j< columns; j++) {
					var rectangle = new Graphics();
					// Initialize mouse events
					rectangle.hitArea = new PIXI.Rectangle(20 + j * 50, 20 + i * 50, 50, 50);
					rectangle.interactive = true;
					rectangle.lineStyle(4, 0xFF3300, 1);
					rectangle.beginFill(0x66CCFF);
					rectangle.drawRect(20 + j * 50, 20 + i * 50, 50, 50);
					rectangle.endFill();
					rectangle.row = i;
					rectangle.column = j;
					graphBoard[i][j] = rectangle;
					rectangle.mousedown = handleClick;
					stage.addChild(rectangle);
				}
			}
		}

		this.startGame = function() {
			initMatrix();
			drawBoard();
			renderer.render(stage);
		}


	};
	var game = new ConnectFour(6, 7);
	game.startGame();
