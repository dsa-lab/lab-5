

let tree;
let insertValue;
let searchValue;
let deleteValue;
async function setup() {
	createCanvas(windowWidth*0.85, windowHeight);
	background(0);
	noLoop()
	let div = createDiv(`<form id="form">
	<input id="input"></input>
	<button id="insert">Insert</button>
	</form>`);
	 
		div.position(width, 10);
		let form=document.querySelector("#form");
		// let buttonInsert=form.querySelector("#insert");
		let input=form.querySelector("#input");
		input.addEventListener("change",updateInsertValue);
		form.addEventListener("submit",insertHandler);
		 
		// /////
	
		let div1 = createDiv(`<form id="form1">
		<input id="searchInp"></input>
		<button id="searchBtn">Search</button>
		</form>`);
		  
		    div1.position(width, 160);
		    let form1=document.querySelector("#form1");
		    let searchInp=form1.querySelector("#searchInp");
		    searchInp.addEventListener("change",updateSearchValue);
		    form1.addEventListener("submit",searchHandler);
			 
		// // ////
		let link = createDiv(`
		<a href="app.html">Home</a>
		`);
		  
		    link.position(width, 300);
		   
		// // ////
	
	
	 
	tree=new AVL();
	tree.root=new Node(5,width/2,100);

	// tree.insert(10);
	// tree.insert(parseInt("1"));

	// const response = await fetchMovies();
	// response.forEach(element => {
	// 	tree.insert(element.key);
		// tree.inorder("draw");
	// });
	
}

async function draw() {
	tree.inorder("draw");
}

const  updateInsertValue=(e)=>{
	insertValue=e.target.value;
}

const  updateSearchValue=(e)=>{
	searchValue=e.target.value;
}
const  updateDeleteValue=(e)=>{
	deleteValue=e.target.value;
}
const insertHandler=async (e)=>{
	e.preventDefault();
	await tree.insert(insertValue);
	tree.inorder("draw");
	console.log("new avl tree after insertion:")
    tree.preorder();
}
const searchHandler=async(e)=>{
	e.preventDefault();
	await tree.search(searchValue);
}
const deleteHandler=async(e)=>{
	e.preventDefault();
	await tree.delete(deleteValue);
}


// async function fetchMovies() {
// 	const response = await fetch('http://localhost:8080/users')
// 	.then(res=>res.json())
// 	.then(data=>{
// 		return data;
// 	})
// 	console.log(response);
// 	return response;
//   }
