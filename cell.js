class cell {
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ready = false;
        this.isVisited = false;
        this.walls = [];
        this.setWalls();
        
    }

    show(){
        ctx.fillStyle = "blue";
        if(this.ready){
            ctx.fillStyle = "red";
        }
        if(this.isVisited){
            ctx.fillStyle = "green";
        }
        ctx.fillRect(this.x, this.y, this.w, this.h);
        for(let w of this.walls){
            ctx.beginPath();
            ctx.moveTo(w.x1, w.y1);
            ctx.lineTo(w.x2, w.y2);
            ctx.stroke();
        }
    }

    setWalls(){
        let w1 = new wall(this.x, this.y, this.w + this.x, this.y, 0);
        this.walls.push(w1);

        let w2 = new wall(this.w + this.x, this.y, this.w + this.x, this.h + this.y, 1);
        this.walls.push(w2);

        let w3 = new wall(this.w + this.x, this.h + this.y, this.x, this.h + this.y, 2);
        this.walls.push(w3);

        let w4 = new wall(this.x, this.y + this.h, this.x, this.y, 3);
        this.walls.push(w4);

    }

    destroy(n){
        for(let w in this.walls){
            if(this.walls[w].n == n){
                this.walls.splice(w, 1);
            }
        }        
    }

}