
var chessBoard = [];
var me = true;
var over = false;

//贏法數組
var wins = [];
var count = 0;

//贏法的統計數組
var myWin = []; //我方
var computerWin = []; //AI方

for (var i = 0; i < 15; i++) {
	chessBoard[i] = [];
	for (var j = 0; j < 15; j++) {
		chessBoard[i][j] = 0;
	}
}

for (var i = 0; i < 15; i++) {
	wins[i] = [];
	for (var j = 0; j < 15; j++) {
		wins[i][j] = [];
	}
}

// //所有直線的贏法
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		// wins[0][0][0] = true;
		// wins[0][1][0] = true;
		// wins[0][2][0] = true;
		// wins[0][3][0] = true;
		// wins[0][4][0] = true;

		// wins[0][1][1] = true;
		// wins[0][2][1] = true;
		// wins[0][3][1] = true;
		// wins[0][4][1] = true;
		// wins[0][5][1] = true;
		for (var k = 0; k < 5; k++) {
			wins[i][j+k][count] = true;
		}
		count++;
	}
}

//所有橫線贏法
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		// wins[0][0][0] = true;
		// wins[1][0][0] = true;
		// wins[2][0][0] = true;
		// wins[3][0][0] = true;
		// wins[4][0][0] = true;

		// wins[1][0][1] = true;
		// wins[2][0][1] = true;
		// wins[3][0][1] = true;
		// wins[4][0][1] = true;
		// wins[5][0][1] = true;
		for (var k = 0; k < 5; k++) {
			wins[j+k][i][count] = true;
		}
		count++;
	}
}

//所有正斜線贏法
for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		// wins[0][0][0] = true;
		// wins[1][1][0] = true;
		// wins[2][2][0] = true;
		// wins[3][3][0] = true;
		// wins[4][4][0] = true;

		// wins[0][1][1] = true;
		// wins[1][2][1] = true;
		// wins[2][3][1] = true;
		// wins[3][4][1] = true;
		// wins[4][5][1] = true;
		for (var k = 0; k < 5; k++) {
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}

//所有反斜線贏法
for (var i = 0; i < 11; i++) {
	for (var j = 14; j > 3; j--) {
		// wins[0][14][0] = true;
		// wins[1][13][0] = true;
		// wins[2][12][0] = true;
		// wins[3][11][0] = true;
		// wins[4][10][0] = true;

		// wins[0][13][1] = true;
		// wins[1][12][1] = true;
		// wins[2][11][1] = true;
		// wins[3][10][1] = true;
		// wins[4][9][1] = true;
		for (var k = 0; k < 5; k++) {
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}

console.log(count);  //572種贏法

for (var i = 0; i < count; i++) {
	myWin[i] = 0;
	computerWin[i] = 0;
}



var chess = document.getElementById('chess');
var context = chess.getContext('2d'); //取得畫布的2d空間

context.strokeStyle = "#BFBFBF"; //設置棋盤線樣式

/* 設置浮水印背景 */
var logo = new Image();
logo.src = "images/logo.png";
logo.onload = function() {
	context.drawImage(logo, 0, 0, 450, 450);
	drawChessBoard();
}


/* 畫棋盤線 每側14格(15個交叉點) 每格30px，左右各留白15px*/
var drawChessBoard = function() {
	for (var i = 0; i < 15; i++) {
		/* 畫直線 */
		context.moveTo(15 + i*30, 15);
		context.lineTo(15 + i*30, 435);
		context.stroke(); //stroke()才會描邊畫線
		/* 畫橫線 */
		context.moveTo(15 , 15 + i*30);
		context.lineTo(435, 15 + i*30);
		context.stroke(); //stroke()才會描邊畫線
	}	
}

/* 畫棋子 i、j棋子移動的索引，me 黑或白棋*/
var oneStep = function(i, j, me) {
	/* 畫棋子 */
	context.beginPath();
	context.arc(15 + i*30, 15 + j*30, 13, 0, 2 * Math.PI); //第一、二個參數：圓形座標，第三個參數：半徑，第四、五參數：起始到終止角度
	context.closePath();
	//返回漸變對象的函數，參數：開始圓的xy座標，開始半徑，結束圓的xy座標，結束半徑
	var gradient = context.createRadialGradient(15 + i*30 + 2, 15 + j*30 - 2, 13, 15 + i*30 + 2, 15 + j*30 - 2, 0); 
	if(me) {
		gradient.addColorStop(0, "#0A0A0A"); //對應第一個圓
		gradient.addColorStop(1, "#636766"); //對應第二個圓		
	} else {
		gradient.addColorStop(0, "#D1D1D1"); //對應第一個圓
		gradient.addColorStop(1, "#F9F9F9"); //對應第二個圓			
	}

	context.fillStyle = gradient;
	context.fill(); //填充實心
}

chess.onclick = function(e) {
	if(over) {
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30); //向下取整數
	var j = Math.floor(y / 30);
	if (chessBoard[i][j] == 0) {
		oneStep(i, j, me);
		if(me) {
			chessBoard[i][j] = 1;
		} else {
			chessBoard[i][j] = 2;
		}
		me = !me;
		for (var k = 0; k < count; k++) {
			if(wins[i][j][k]) {
				myWin[k]++;
				computerWin[k] = 6;
				if(myWin[k] == 5) {
					window.alert("你贏了");
					over = true;
				}
			}
		}
	}
}

