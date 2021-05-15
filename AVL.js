let parent;
let x=50;
let y=50;
let comparison=0;
 class AVL
    {
        constructor(){
            this.root = null;
        }

         insert(key)
        {
            let margin=200;
            let flag=false;
            this.root = this.insertUtil(this.root, key,this.root.x,this.root.y,margin,flag);
        }
         insertUtil(root,key,x,y,margin,flag)
        {
            if (root == null)
                return new Node(key,x,y,margin);
            root.draw();    
            if (parseInt(root.key) > parseInt(key))
            {
                margin=Math.floor(margin*0.67);
                root.left = this.insertUtil(root.left, key,root.x-margin,root.y+40,margin,flag);
              } 
              else if(parseInt(root.key) < parseInt(key))
              {
                
                margin=Math.floor(margin*0.67);
                root.right = this.insertUtil(root.right, key,root.x+margin,root.y+40,margin,flag);
              }
            root.height =1 + this.max(this.height(root.left), this.height(root.right));
            let balance = this.getBalance(root);
            // right of right case
            if(balance < -1 && key > root.right.key)
            {
              console.log("Right right case");
                return this.leftRotate(root,margin);
            }// left of left case
            else if(balance > 1 && key < root.left.key)
            {
                console.log("Left Left case");
                return this.rightRotate(root,margin);
            }
            // right left case
            else if(balance < -1 && key < root.right.key)
            {
                console.log("Right left case");
                root.right = this.rightRotate(root.right,margin);
                return this.leftRotate(root,margin);
            }// left right case
            else if(balance > 1 && key > root.left.key)
            {
                console.log("Left right case");
                root.left = this.leftRotate(root.left,margin);
                return this.rightRotate(root,margin);
                
            }
            return root;
        }
          leftRotate(root,margin)
        {
            let right = root.right;
            let left = root.left;
            let T2 = null;
            if(right!==null){
            T2=right.left;
            right.left = root;
            }
            root.right = T2;
            root.height = this.max(this.height(root.left), this.height(root.right)) + 1;
            if(right!==null)right.height = this.max(this.height(right.left), this.height(right.right)) + 1;
            if(right!==null&&right.right!==null){
            right.right.x=right.x;
            right.right.y=right.y;
            if(right!==null && right.right.right!=null){
                right.right.right.y=right.right.y+40;
                right.right.right.x=right.right.x+margin;
            }
            }
            let tempX=root.x;
            let tempY=root.y;
            root.x=root.x-margin;
            root.y=root.y+40;
            if(T2!==null){
                T2.x=root.x+margin;
                T2.y=root.y+40;
               
            }
            right.x=tempX;
            right.y=tempY;
            if(left!==null){
                root.left.x=root.x-root.left.margin;
                root.left.y=root.y+40;
            }
            return right;
        }
        rightRotate(root,margin)
        {
            let left = root.left;
            let T2 =null;
            if(left!==null)T2=left.right;
            left.right = root;
            root.left = T2;
            // 
            let tempX=root.x;
            let tempY=root.y;
            root.x=root.x+margin;
            root.y=root.y+40;
            if(left.left!=null){
                left.left.x=left.x;
                left.left.y=left.y;
            }
            if(left.right!=null){
                left.right.x=root.x;
                left.right.y=root.y;
            }
            left.x=tempX;
            left.y=tempY;
           

            root.height = this.max(this.height(root.left), this.height(root.right)) + 1;
            left.height = this.max(this.height(left.left), this.height(left.right)) + 1;

            return left;
        }
        max(a,b)
        {
            return a > b ? a : b;
        }
        height(a)
        {
            if (a != null) return a.height;
            return 0;
        }
        getBalance(root)
        {
            return this.height(root.left) - this.height(root.right);
        }
        preorder()
        {
            this.preorderUtil(this.root);
        }
        preorderUtil( node)
        {
            if (node != null)
            {
                console.log(`${node.key},`);
                this.preorderUtil(node.left);
                this.preorderUtil(node.right);

            }
        }
             async inorder(type){

 
            this.inorderUtil(this.root,type);
            }
            async inorderUtil(root,type){
                if(root!==null){
                    if(root.left!==null && type === "draw"){
                    stroke(150);
                    strokeWeight(4);
                    line(root.x,root.y,root.left.x,root.left.y);
        
                    }
                    if(type==='animate')
                    await this.inorderUtil(root.left,type);
                    else {
                    this.inorderUtil(root.left,type);
                    // console.log(`${root.key},`);
                    if(root.right ){
                        strokeWeight(4)
                        stroke(150);
                        line(root.x,root.y,root.right.x,root.right.y);
                    }
                    }
                    if(type==='animate')
                    await this.sleep(100);
                    
                    if(type==='draw')
                    root.draw();
                    if(type==='animate')
                    root.colorify("red");
                        
                    if(type==="animate")
                    await this.inorderUtil(root.right,type);
                    else 
                     this.inorderUtil(root.right,type);
        
                }
                
            }
            async search(key){
                comparison=0;
                this.root=await this.searchUtil(this.root,key);
            }
            async searchUtil(root,key){
                if(root===null)return;
                comparison++;
                await this.sleep(500);
                this.clear();
                this.inorder("draw");
                root.colorify("red");
                root.text(x,y);
                x+=30;
                if(parseInt(root.key) === parseInt(key) ){
                
                    await this.sleep(400);
                    root.colorify("magenta");
                    console.log(`total comparison : ${comparison}`,x,y)
                    text(`total comparison : ${comparison}`,x,y)
                    x=100;
                    return root;
                }
                else if(root.key > key )
                  root.left=await this.searchUtil(root.left,key);
                else if(root.key < key )
                root.right=await this.searchUtil(root.right,key);
                
                return root;
            }
        
        
            async sleep(ms){
                return new  Promise(resolve=>setTimeout(resolve,ms));
            }
            clear(){
                fill(0);
                noStroke();
                rect(0,80,width,height);
            }
         
    }

