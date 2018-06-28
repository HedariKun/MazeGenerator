let canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
let rows = 40, columns = 40;
let walls = [cell];

let firstCell;
let currentCell = null;
let prevCell;

let cellLog = [];

let stop = false;

window.onload = () => {
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);
    setUp();
    currentCell = walls[Math.floor(Math.random() * columns)][Math.floor(Math.random() * rows)];
    currentCell.ready = true;
    firstCell = currentCell;
    update();
}

function setUp(){
    walls = [];
    for(let i = 0; i < columns; i++){
        let column = [];
        for(let g = 0; g < rows; g++){
            let x = (canvas.width / columns) * i;
            let y = (canvas.height / rows) * g;
            let c = new cell(x, y, canvas.width / columns, canvas.height / rows);
            column.push(c);
        } 
        walls.push(column);
    }
}

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(!stop){
        let i = currentCell.x * columns / canvas.width;
        let g = currentCell.y * rows / canvas.height;
        visitCell(i, g);
    }
    let s = 0;
    let l = 0;
    for(let wall of walls){
        for(let cell of wall){
            if(cell.isVisited){
                s++;
            }
            l++;
            cell.show();
        }
    }

    if(s >= l){
        stop = true;
    }

    requestAnimationFrame(update);
}

function visitCell(i, g, counter = 0){
    let c = currentCell;
    let r = Math.floor(Math.random() * 4);
    if(!allVisited(i, g)){
        if(r == 0){
            if(i-1 < 0){
                return visitCell(i, g);
            }
            c = walls[i-1][g];
        }
        if(r == 1){
            if(i+1 >= columns){
                return visitCell(i, g);
            }
            c = walls[i+1][g];
        }
        if(r == 2){
            if(g-1 < 0){
                return visitCell(i, g);
            }
            c = walls[i][g-1];
        }
        if(r == 3){
            if(g+1 >= rows){
                return visitCell(i, g);
            }
            c = walls[i][g+1];
        }
    }
    if(c.ready && !allVisited(i, g)){
        return visitCell(i, g);
    }else if(c.ready && allVisited(i, g)){
        c.isVisited = true;
        currentCell = cellLog.pop();
    } else {
        cellLog.push(currentCell);

        if(r == 0){
            currentCell.destroy(3);
            c.destroy(1);
        }
        if(r == 1){
            currentCell.destroy(1);
            c.destroy(3);
        }
        if(r == 2){
            currentCell.destroy(0);
            c.destroy(2);
        }
        if(r == 3){
            currentCell.destroy(2);
            c.destroy(0);
        }
        currentCell = c;
        c.ready = true;
    }
}

function allVisited(i, g){
    let c = true;
    if(i-1 >= 0){
        if(!walls[i-1][g].ready)
            c = false;
    }
    if(i+1 < columns){
        if(!walls[i+1][g].ready)
            c = false;
    }
    if(g-1 >= 0){
        if(!walls[i][g-1].ready)
            c = false;
    }
    if(g+1 < rows){
        if(!walls[i][g+1].ready)
            c = false;
    }
    return c;

}