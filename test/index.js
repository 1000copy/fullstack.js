class Todo {
	constructor(){
		this.db = require('./todo.json')
		// console.log(this.db);
	}
	add(o){
		this.db.push(o)
		return this.db.length
	}
	remove(o){
		// for (const element of this.db) {
		//   if (element.id == o.id){
		//   	//someArray.splice(x, 1);
		//   	this.db.splice()
		//   }
		// }
		this.db = this.db.filter(function(el) { return el.id == o.id; })
		return this.db.length
	}

}
var todo = new Todo()
var check = require("check")
check(true,true)
check(todo.add({id:1,subject:"todo 1"}),2,'todo.add failure',true)
check(todo.remove({id:1}),1,'todo.add failure',true)
// check(true,1)
// check(true,1,'true is not 1')
