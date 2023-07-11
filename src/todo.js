class Todo {
	list(){
		return this.json
	}
	async add(o){
		await this.reload()
		this.json.push(o)
		this.db.write(this.json)
		return o
	}
	async checked(o){
		// await this.reload()
		var find = this.json.find(function(el) { return el.id == o.id; })
		find.checked = !find.checked 
		await this.db.write(this.json)
		return o
	}
	
	async remove(o){
		this.json = this.json.filter(function(el) { return el.id != o.id; })
		await this.db.write(this.json)
		return o
	}
	//private
	constructor(db){
		this.db = db
		this.json = []
		this.reload()
	}
	async reload(){
		this.json = await this.db.read()
		return this.json
	}
	async clear(){
		this.json = []
		await this.db.write(this.json)
		return this.json
	}
}
module.exports = Todo