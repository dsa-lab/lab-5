const RADIUS = 40;
class Node{
    constructor(key,x,y,margin)
        {
            this.key = key;
            this.height = 1;
            this.left = null;
            this.right=null;
            this.x=x;
            this.y=y;
            this.margin=margin;
        }
        draw(){
            stroke("#666");
            strokeWeight(4)
            fill(255);
            ellipse(parseInt(this.x),parseInt(this.y),RADIUS,RADIUS);
            text(this.key, parseInt(this.x-5),parseInt(this.y)+3)
        }
        colorify(color){
            stroke(255);
            strokeWeight(4)
            fill(color);
            ellipse(parseInt(this.x),parseInt(this.y),RADIUS,RADIUS);
            text(this.key, parseInt(this.x-5), parseInt(this.y+3)) 
        }
        text(x,y){
            fill(0);
            stroke(255);
            text(`${this.key}-->`,x,y);
        }
    }