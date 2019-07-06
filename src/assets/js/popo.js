class Popo{
    constructor(){
        this.canvas = null;
        this.ctx = null;
        this.count = 0;
        this.stop= 1;
        this.mX = window.innerWidth/2;
        this.mY = window.innerHeight/2;
        this.popoList = [];

        this.move();

    }

    init(){
        this.createCanvas();
        this.popoList = [];
        this.count++;
        this.stop= 1;
        
        this.animate();
    }

    // 创建 canvas
    createCanvas(){
        let cv = document.getElementById('mouseCanvas');
        if(cv) return;
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'mouseCanvas';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '99999';

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        document.body.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d');
    }

    // 生成泡泡
    createPopo(popo){
        var rgba = this.rgba(popo.rgb[0],popo.rgb[1],popo.rgb[2],popo.c);
        this.ctx.beginPath();
        this.ctx.shadowColor = rgba;
        this.ctx.shadowBlur = popo.size * 4;
        this.ctx.fillStyle = rgba;
        this.ctx.arc(popo.x,popo.y,popo.size,0,Math.PI * 2);
        this.ctx.fill();
    }
    // 一堆泡泡
    createPopoList(){
        
        for(let i=this.popoList.length; i < this.canvas.width/8; i++)
        {
            this.popoList.push({
                x: this.rande(this.mX - 45,this.mX + 45),       // x
                y: this.rande(this.mY + 30,this.mY - 30),      // y
                c: Math.random(),                          // 透明度 0~1
                size: this.rande(1,5),                               // 大小
                hig: -Math.random()/100 + 1.009,                // 控制高度 0.992 ~ 1.005
                rgb: [this.rande(0,255),this.rande(0,255),this.rande(0,255)],   // rgb颜色 （每个泡泡的颜色）
            })
        }
    }
    
    forPopo(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        for(let i=0;i<this.popoList.length;i++)
        {
            this.createPopo(this.popoList[i]);
        }
    }
    // 动画
    animate(){
        var nowX = this.mX,
            nowY = this.mY;
        
        for(let i=0;i<this.popoList.length;i++){
            let popo = this.popoList[i];

            if(popo.y < nowY){

                //  当元素高于指定高度
                // 一个左边 ： 一个右边
                popo.x < nowX ? popo.x -= 0.5 : popo.x += 0.5;
                // popo.hig = -Math.random()/100 + 1.009;
            }                
            else 
                //  低于指定高度
                // 一个左边 ： 一个右边
                '';
                // popo.x < nowX ? popo.x -= 0.5 : popo.x += 0.5;

                popo.c -= 0.01;         // 透明度
                popo.y *= popo.hig;
                this.popoList[i] = popo;
                //popo.y <= 0 || popo.c <= 0 ? this.popoList.splice(i,1) : null;

        }
        this.createPopoList();
        this.forPopo();
        // requestAnimationFrame(this.animate.bind(this));
        
        // 添加这快改为只生成一个数组的泡泡
        this.stop-=0.01;
        if(this.stop<=0){
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            // document.getElementById('mouseCanvas').remove();
            return;
        }

        requestAnimationFrame(this.animate.bind(this));

    }

    // 鼠标移动
    move(){
        let This = this;
        document.onmousedown = function(e){
            This.mX = e.pageX;
            This.mY = e.pageY;
            This.init();
        }

        window.addEventListener('resize',function(){
            This.canvas.width = window.innerWidth;
            This.canvas.height = window.innerHeight;
        })
    }

    
    rande(min,max){
        return Math.floor(Math.random() * (max - min +1) + min);
    }

    randeColor(){
        return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
    }

    rgba(r,g,b,c){
        return `rgba(${r},${g},${b},${c})`;
    }
}

new Popo();