import {GlowParticle} from './glowparticle.js'

const COLORS = [
    {r: 245, g: 223, b: 77},
    {r: 156, g: 156, b: 156},
    {r: 52, g: 149, b: 235},
    {r: 94, g: 245, b: 77},
    {r: 200, g: 245, b: 77},
];

class App{
    constructor(){
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx =  this.canvas.getContext('2d');

        this.pixelRatio =  (window.decivePixelRatio > 1) ? 2 : 1;

        this.totalParticles = 20;
        this.particles = [];
        this.maxRadius = 500;
        this.minRadius = 200;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio ;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        
        this.ctx.globalCompositeOperation = 'overlay';

        this.createParticles();
    }   
    createParticles() {
        let curColor = 0;
        this.particles = [];

        for(let i = 0; i < this.totalParticles; i++) {
            const item = new GlowParticle(
                Math.random() * this.stageWidth,
                Math.random() * this.stageHeight,
                Math.random() * (this.maxRadius - this.minRadius) 
                + this.minRadius,
                COLORS[curColor]
            );
            
            if (++curColor >= COLORS.length) {
                curColor = 0;
            }
            
            this.particles[i] = item;
        }
    }

    animate(){
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        
        for(let i = 0; i < this.totalParticles; i++) {
            const item = this.particles[i];
            item.animate(this.ctx, this.stageWidth, this.stageHeight);
        }
    }
}

window.onload = () => {
    new App();
}