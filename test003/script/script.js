let bx=7;
let by=7;
let clientX=0;
let clientY=0;
let turn=1;
let LButton=0;
let RButton=0;
let nn=8;
let WDH=50;
let blk=0;
let wht=0;
let state=new Array(
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,1,2,0,0,0,
    0,0,0,2,1,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0);

let point=new Array(
    6,2,5,4,4,5,2,6,
    2,1,3,3,3,3,1,2,
    5,3,3,3,3,3,3,5,
    4,3,3,0,0,3,3,4,
    4,3,3,0,0,3,3,4,
    5,3,3,3,3,3,3,5,
    2,1,3,3,3,3,3,2,
    6,2,5,4,4,5,2,6);

let canvas = null;
let ctx = null;

function init() {
    window.onmousemove = handleMouseMove;
    window.onmousedown = handleMouseDown;

    drawCircle(175, 175, WDH*0.4, '#000000');
    drawCircle(225, 225, WDH*0.4, '#000000');
    drawCircle(225, 175, WDH*0.4, '#ffffff');
    drawCircle(175, 225, WDH*0.4, '#ffffff');

    uteru_masu(1);
}


function handleMouseDown(event) {
    event = event || window.event; // IE対応
    target = document.getElementById("output");

    if (event.button == 0) {
      LButton=1;
      //target.innerHTML = "左ボタンが押されました。";
    }
    else if (event.button == 1) {
      //target.innerHTML = "中ボタンが押されました。";
    }
    else if (event.button == 2) {
      RButton=1;
      //target.innerHTML = "右ボタンが押されました。";
    }

    main();
}

function handleMouseMove(event) {
    event = event || window.event; // IE対応

    clientX = event.clientX-bx;
    clientY = event.clientY-by;
           
    /*target = document.getElementById("output_client");     
    target.innerHTML = "clientX:" + event.clientX + ", clientY:" + event.clientY;

    target = document.getElementById("output_screen");
    target.innerHTML = "ii:" + ii + ", turn:" + turn ;
    if(LButton == 1)
        target.innerHTML = "ii:" + ii + ", turn:" + turn +  "左ボタンが押されました。";*/
 
    //target.innerHTML = "Screen X:" + event.screenX + ", Screen Y:" + event.screenY;
}

function main(){
    if(uteru_masu(1) > 0){
        drawText('あなたの番です。',450,60,'#000000',100);

        ret = person(1);   
    }
    else{
        drawText('打てるマスはありません。クリックしてパスしてください。',450,120,'#000000',100); 
    }

    if(ret == 0){
        if(uteru_masu(2) > 0){
            computer1(2);               
        }
        else{
            drawText('パスします。',450,90,'#000000',100);
        }
    }

    banmen();

    if(uteru_masu(1) == 0 && uteru_masu(2) == 0){
        ishino_kazu();

        if(blk > wht){
            drawText('あなたの勝ちです。',450,120,'#000000',100);
        }
        else{
            drawText('あなたの負けです。',450,120,'#000000',100);    
        }
    
        if(blk == wht){
            drawText('引き分けです。',450,120,'#000000',100);  
        }
    }
}

function computer0(turn){
    while(1){
        rx = Math.floor( Math.random() * 8 );
        ry = Math.floor( Math.random() * 8 );
        ri = rx + nn*ry;

        if(kaeseru(rx,ry,turn) > 0){
            ishi_utsu(rx,ry,turn);
            state[ri]=turn;
            break;
        }
    }

    return 0;
}

function computer1(turn){
    pp = 0;
    xp = 0;
    yp = 0;

    for(rx=0;rx < nn; rx++ )
        for(ry = 0;ry < nn; ry++){
            ri = rx + nn*ry;

            if(kaeseru(rx,ry,turn) > 0 && point[ri] > pp){
                pp = point[ri];
                xp = rx;
                yp = ry;
            }
    }
            
    ishi_utsu(xp,yp,turn);

    /*for(tt=0;tt<100000;tt++){
        drawCircle((xp+0.5)*WDH, (yp+0.5)*WDH, WDH*0.4, '#ff0000');
    }*/

    ri = xp + nn*yp;
    state[ri]=turn;

    return 0;
}

function uteru_masu(iro){
    pp=0;

    for(ix = 0; ix < nn; ix++){
        for(iy = 0;iy < nn; iy++){
            if( kaeseru(ix,iy,iro) > 0){
                //drawCircle((ix+0.5)*WDH, (iy+0.5)*WDH, WDH*0.4, '#ff0000');
                
                pp++;
            }
        }
    }

    return pp;
}

function ishino_kazu(){
    blk=0;
    wht=0;

    for(ix = 0;ix < nn; ix++){
        for(iy = 0;iy < nn; iy++){
            ir=ix+nn*iy;

            if( state[ir] == 1){
                blk ++;
            }

            if( state[ir] == 2){
                wht ++;
            }
        }
    }    
}

function person(turn){
    if(LButton == 1){
        if(clientX < nn*WDH && clientY <= nn*WDH){
            xx = (clientX - clientX%WDH);
            yy = (clientY - clientY%WDH);
    
            ix=xx/WDH;
            iy=yy/WDH;

            id=ix+nn*iy;
    
            xp = xx+WDH/2;
            yp = yy+WDH/2;
            
            if(kaeseru(ix,iy,turn) > 0){
                if(state[id] == 0 ){

                    ishi_utsu(ix,iy,turn);
                    
                    drawCircle((ix+0.5)*WDH, (iy+0.5)*WDH, WDH*0.4, '#0000ff');

                    state[id]=turn;
                }

                LButton = 0;

                drawText('打てません。',450,90,'#ffffff',100); 

                return 0;
            }
            else{
                drawText('打てません。',450,90,'#000000',100); 

                LButton = 0;

                return -1;
            }
        }
    }
}

function banmen(){

    for(iy = 0;iy < nn; iy++){
        for(ix = 0;ix < nn; ix++){
            ii = ix +nn*iy;
            
            if(state[ii] == 1){
                drawCircle((ix+0.5)*WDH, (iy+0.5)*WDH, WDH*0.4, '#000000');
            }

            if(state[ii] == 2){
                drawCircle((ix+0.5)*WDH, (iy+0.5)*WDH, WDH*0.4, '#ffffff');
            }

            /*if(state[ii] == 0){
                drawCircle((ix+0.5)*WDH, (iy+0.5)*WDH, WDH*0.4, '#00ff00');
            }*/
        }
    }
}

function ishi_utsu(ix,iy,iro){
    state[ix+nn*iy] = iro;

    for(dy = -1; dy <= 1; dy++){
        for(dx = -1; dx <= 1; dx++){
            kk = 0;
            sx = ix;
            sy = iy;
            
            while(1){
                sx+=dx;
                sy+=dy;

                if(sx < 0 || sx > nn || sy < 0 || sy > nn)
                    break;

                if(state[sx+nn*sy] == 0)
                    break;

                if(state[sx+nn*sy] == 3-iro)
                    kk+=1;               

                if(state[sx+nn*sy] == iro){
                    for(ii=0; ii < kk; ii++){
                        sx -= dx;
                        sy -= dy;
                        si =  sx+nn*sy;   

                        state[si] = iro;
                    }

                    break;
                }                     
            }
        }
    }
}


function kaeseru(ix,iy,iro){
    total = 0;

    if(state[ix+nn*iy] > 0){
        return -1;
    }

    for(dy = -1; dy <= 1; dy++){
        for(dx = -1; dx <= 1; dx++){
            kk = 0;
            sx = ix;
            sy = iy;
            
            while(1){
                sx+=dx;
                sy+=dy;

                if(sx < 0 || sx > nn-1 || sy < 0 || sy > nn-1)
                    break;

                if(state[sx+nn*sy] == 0)
                    break;

                if(state[sx+nn*sy] == 3-iro)
                    kk+=1;               

                if(state[sx+nn*sy] == iro){
                    total += kk;
                    break;
                }                     
            }
        }
    }

    return total;
}

window.addEventListener('load', () => {
    initialize();	// 初期化処理を行う
    render();	    // 描画処理を行う
}, false);

function drawText(text, x, y, color, width){
    // 色が指定されている場合はスタイルを設定する
    if(color != null){
        ctx.fillStyle = color;
    }
    ctx.fillText(text, x, y, width);
}

function initialize(){					//canvas やコンテキストを初期化する
    canvas = document.body.querySelector('#main_canvas');	// querySelector を利用して canvas を参照
   
    canvas.width = window.innerWidth;	// canvas の大きさをウィンドウ全体を覆うように変更する
    
    canvas.height = window.innerHeight;

    ctx = canvas.getContext('2d');
}

function render(){
    ctx.font = '25px cursive';

    drawRect(0, 0, nn*WDH, nn*WDH, '#00ff00');

    for(ii=1;ii<=nn-1;ii++){
        drawLine(WDH*ii, 0, WDH*ii, nn*WDH, '#ff0000');  // 線描画処理を行う
        drawLine(0, WDH*ii, nn*WDH, WDH*ii, '#ff0000');  // 線描画処理を行う
    }

    drawText('あなたは先手、黒です。',450,30,'#000000',100);
    drawText('あなたの番です。',450,60,'#000000',100);
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
     
    ctx.fill();   // 設定したパスで円の描画を行う
}
