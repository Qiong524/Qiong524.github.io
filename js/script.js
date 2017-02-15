
var chessBoard = [];
var me = true;

for (var i = 0; i < 15; i++) {
	chessBoard[i] = [];
	for (var j = 0; j < 15; j++) {
		chessBoard[i][j] = 0;
	}
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
	}
}

