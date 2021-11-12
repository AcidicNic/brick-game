(()=>{"use strict";const t=class{constructor(t=0,s=0,i=10,e=10,h="#3B3B3B"){this.x=t,this.y=s,this.w=i,this.h=e,this.color=h}render(t){t.beginPath(),t.rect(this.x,this.y,this.w,this.h),t.fillStyle=this.color,t.fill(),t.closePath()}},s=class extends t{constructor(t,s,i=75,e=10,h="#3B3B3B"){super(t,s,i,e,h)}},i=class extends t{constructor(t,s,i=60,e=20,h="#000"){super(t,s,i,e,h),this.status=!0}},e=class extends t{constructor(t=0,s=0,i=7,e=3,h="#3B3B3B"){super(t,s,0,0,h),this.r=i,this.speed=e,this.dx=e*(Math.floor(2*Math.random())||-1),this.dy=-e}render(t){t.beginPath(),t.arc(this.x,this.y,this.r,0,2*Math.PI),t.fillStyle=this.color,t.fill(),t.closePath()}incrementSpeed(){this.speed<6&&(this.speed+=.2)}move(){this.x+=this.dx,this.y+=this.dy}randomSlope(){this.dx=(this.speed+(2*Math.random()-1))*Math.sign(this.dx),this.dy=(this.speed+(2*Math.random()-1))*Math.sign(this.dy)}},h=class extends t{constructor(t,s,i,e="center",h="16px Arial",r="#3B3B3B"){super(s,i,0,0,r),this.font=h,this.align=e,this.text=t}render(t){t.font=this.font,t.fillStyle=this.color,t.textAlign=this.align,t.fillText(this.text,this.x,this.y)}},r=class extends h{constructor(t,s,i=0){super(`Score: ${i}`,t,s,"left","16px Arial"),this.val=i}increment(t){this.val+=t,this.updateText()}updateText(){this.text=`Score: ${this.val}`}},l=class extends h{constructor(t,s,i){super(`Lives: ${i}`,t,s,"right","16px Arial"),this.val=i}increment(t){this.val+=t,this.updateText()}updateText(){this.text=`Lives: ${this.val}`}};(new class{constructor(t="brickGame",d=2,a=["#FFCCCC","#FEFFBF","#C0FFBF","#BFFDFF","#E4BFFF"]){this.canvas=document.getElementById(t),this.height=this.canvas.height,this.width=this.canvas.width,this.ctx=this.canvas.getContext("2d"),this._updateBgGradiant(a),this.ball=new e(this.width/2,.8*this.height),this.paddle=new s((this.width-75)/2,this.height-10),this.bricks=new class{constructor(t=3,s=6,i=20,e=60,h=10,r=35,l=30,d=["#E74C3C","#F39C12","#F1C40F","#2ECC71","#3498DB","#9B59B6"]){this.r=t,this.c=s,this.h=i,this.w=e,this.p=h,this.mx=r,this.my=l,this.colors=d,this.bricks=this._createBricks()}_createBricks(){const t=Array(this.c);for(let s=0;s<this.c;s+=1){t[s]=Array(this.r);for(let e=0;e<this.r;e+=1)t[s][e]=new i(s*(this.w+this.p)+this.mx,e*(this.h+this.p)+this.my,this.w,this.h,this.colors[s%this.colors.length])}return t}render(t){this.bricks.forEach((s=>s.forEach((s=>{s.status&&s.render(t)}))))}},this.score=new r(8,20,0),this.lives=new l(this.width-8,20,d),this.endText=new h("Game Over!",this.width/2,this.height/2,"center","24px Arial"),this.helpText=new h("Press space or enter to restart",this.width/2,this.height/2+20),this.gameOver=!1,this.rightPressed=!1,this.leftPressed=!1,document.addEventListener("keydown",(t=>{this._keyDownHandler(t)}),!1),document.addEventListener("keyup",(t=>{this._keyUpHandler(t)}),!1),document.addEventListener("mousemove",(t=>{this._mouseMoveHandler(t)}),!1)}_keyDownHandler(t){"Right"===t.key||"ArrowRight"===t.key?this.rightPressed=!0:"Left"!==t.key&&"ArrowLeft"!==t.key||(this.leftPressed=!0)}_keyUpHandler(t){"Right"===t.key||"ArrowRight"===t.key?this.rightPressed=!1:"Left"!==t.key&&"ArrowLeft"!==t.key||(this.leftPressed=!1)}_mouseMoveHandler(t){const s=t.clientX-this.canvas.offsetLeft;s>0&&s<this.width&&(this.paddle.x=s-this.paddle.w/2)}movePaddle(){this.rightPressed?(this.paddle.x+=7,this.paddle.x+this.paddle.w>this.width&&(this.paddle.x=this.width-this.paddle.w)):this.leftPressed&&(this.paddle.x-=7,this.paddle.x<0&&(this.paddle.x=0))}_brickCollisionCheck(){this.bricks.bricks.forEach((t=>t.forEach((t=>{!0===t.status&&this.ball.x+this.ball.r>t.x&&this.ball.x-this.ball.r<t.x+this.bricks.w&&this.ball.y+this.ball.r>t.y&&this.ball.y-this.ball.r<t.y+this.bricks.h&&(this.ball.dy=-this.ball.dy,t.status=!1,this.score.increment(1),this.score.val===this.bricks.r*this.bricks.c&&(this.endText.text="You win!"))}))))}_wallCollisionCheck(){this.ball.x+this.ball.dx>this.width-this.ball.r||this.ball.x+this.ball.dx<this.ball.r?(this.ball.dx=-this.ball.dx,this.ball.randomSlope()):this.ball.y+this.ball.dy<this.ball.r?(this.ball.dy=-this.ball.dy,this.ball.randomSlope()):this.ball.y+this.ball.dy>this.height-this.ball.r&&(this.lives.increment(-1),this.ball.x=this.width/2,this.ball.y=this.height-30,this.ball.speed=3,this.ball.randomSlope(),this.ball.dx=3*(Math.floor(2*Math.random())||-1),this.ball.dy=-3,this.paddle.x=(this.width-this.paddle.w)/2)}_paddleCollisionCheck(){this.ball.y>this.height-this.ball.r-this.paddle.h&&this.ball.x>this.paddle.x&&this.ball.x<this.paddle.x+this.paddle.w&&(this.ball.incrementSpeed(),this.ball.dy=-this.ball.dy,this.ball.randomSlope())}_updateBgGradiant(t){this.bgGradient=this.ctx.createLinearGradient(0,0,this.width,0);for(let s=0;s<t.length;s+=1)this.bgGradient.addColorStop((s+1)/t.length,t[s])}renderBackground(){this.ctx.fillStyle=this.bgGradient,this.ctx.fillRect(0,0,this.width,this.height)}_keyDownEndHandler(t){" "!==t.key&&"Enter"!==t.key||(this.helpText.text="Restarting...",this.helpText.render(this.ctx))}_keyUpEndHandler(t){" "!==t.key&&"Enter"!==t.key||document.location.reload()}_addEndEventListeners(){document.addEventListener("keydown",(t=>{this._keyDownEndHandler(t)}),!1),document.addEventListener("keyup",(t=>{this._keyUpEndHandler(t)}),!1)}renderEndScreen(){this.bricks.render(this.ctx),this.score.render(this.ctx),this.lives.render(this.ctx),this.endText.render(this.ctx),this.helpText.render(this.ctx)}isWin(){return this.score.val===this.bricks.r*this.bricks.c}isLose(){return this.lives.val<=0}start(){this.ctx.clearRect(0,0,this.width,this.height),this.renderBackground(),this.isLose()||this.isWin()?(this.renderEndScreen(),this.gameOver||(this._addEndEventListeners(),this.gameOver=!0)):(this._brickCollisionCheck(),this._paddleCollisionCheck(),this._wallCollisionCheck(),this.movePaddle(),this.ball.render(this.ctx),this.paddle.render(this.ctx),this.bricks.render(this.ctx),this.score.render(this.ctx),this.lives.render(this.ctx),this.ball.move()),requestAnimationFrame((()=>{this.start()}))}}).start()})();