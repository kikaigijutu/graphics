

    let canvas = null;
    let ctx = null;

     window.addEventListener('load', () => {
        initialize();	// 初期化処理を行う
        render();	    // 描画処理を行う
    }, false);

    window.addEventListener('load', function(){document.getElementById("content1").addEventListener('click', logPosition);		});
    function logPosition(event) {console.log("offsetX: " + event.offsetX);			console.log("offsetY: " + event.offsetY);		}

    function logPosition(event) {
        console.log("offsetX: " + event.offsetX);
        console.log("offsetY: " + event.offsetY);

        drawText('graphics programming', 100, 100, '#ff6600');
    }

    function drawText(text, x, y, color, width){
        // 色が指定されている場合はスタイルを設定する
        if(color != null){
            ctx.fillStyle = color;
        }
        ctx.fillText(text, x, y, width);
    }

     function initialize(){					//canvas やコンテキストを初期化する
        canvas = document.body.querySelector('#main_canvas');	// querySelector を利用して canvas を参照
       
        canvas.width = window.innerWidth;			// canvas の大きさをウィンドウ全体を覆うように変更する
        
	    canvas.height = window.innerHeight;
 
        ctx = canvas.getContext('2d');
    }

    function render(){
	drawRect(0, 0, 300, 300, '#00ff00');
        drawLine(100, 0, 100, 300, '#ff0000');  // 線描画処理を行う
        drawLine(200, 0, 200, 300, '#ff0000');  // 線描画処理を行う
        drawLine(0, 100, 300, 100, '#ff0000');  // 線描画処理を行う
        drawLine(0, 200, 300, 200, '#ff0000');  // 線描画処理を行う

        drawCircle(150, 150, 40, '#000000');    // 円の描画処理を行う
        drawCross(50, 50, 80, '#ffffff');       // ×の描画処理を行う

        //drawText('graphics programming', 100, 100, '#ff6600');
    }

    function drawRect(x, y, width, height, color){
        if(color != null){
            ctx.fillStyle = color;		// 色が指定されている場合はスタイルを設定する
        }

        ctx.fillRect(x, y, width, height);
    }

    function drawLine(x1, y1, x2, y2, color, width = 1){
        if(color != null){
            ctx.strokeStyle = color;	// 色が指定されている場合はスタイルを設定する
        }
        
        ctx.lineWidth = width;	// 線幅を設定する
       
        ctx.beginPath();		// パスの設定を開始することを明示する
        
        ctx.moveTo(x1, y1);		// パスの始点を設定する
        
        ctx.lineTo(x2, y2);		// 直線のパスを終点座標に向けて設定する
       
        ctx.closePath();		// パスを閉じることを明示する
        
        ctx.stroke();			// 設定したパスで線描画を行う
    }
    
    function drawCircle(x, y, radius, color){
    /**
     * 円を描画する
     * @param {number} x - 円の中心位置の X 座標
     * @param {number} y - 円の中心位置の Y 座標
     * @param {number} radius - 円の半径
     * @param {string} [color] - 円を描画する際の色
     */      
        if(color != null){
            ctx.fillStyle = color;// 色が指定されている場合はスタイルを設定する
        }
            
        ctx.beginPath();// パスの設定を開始することを明示する
            
        ctx.arc(x, y, radius, 0.0, Math.PI * 2.0);// 円のパスを設定する
         
        ctx.closePath();   // パスを閉じることを明示する
         
        ctx.stroke();   // 設定したパスで円の描画を行う
    }

    function drawCross(x, y, length, color, width = 1){
        /**
         * ×を描画する
         * @param {number} x - ×の中心位置の X 座標
         * @param {number} y - ×の中心位置の Y 座標
         * @param {number} length - ×の長さ
         * @param {string} [color] - ×を描画する際の色
         */      
            if(color != null){
                ctx.fillStyle = color;// 色が指定されている場合はスタイルを設定する
            }

            ctx.lineWidth = width;	// 線幅を設定する
                
            ctx.beginPath();// パスの設定を開始することを明示する
                
            ctx.moveTo(x-length/2, y-length/2);		// パスの始点を設定する
        
            ctx.lineTo(x+length/2, y+length/2);		// 直線のパスを終点座標に向けて設定する
 
            ctx.moveTo(x-length/2, y+length/2);		// パスの始点を設定する
        
            ctx.lineTo(x+length/2, y-length/2);		// 直線のパスを終点座標に向けて設定する

            ctx.closePath();		// パスを閉じることを明示する
            
            ctx.stroke();			// 設定したパスで線描画を行う
        }
