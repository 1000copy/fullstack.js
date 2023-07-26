export default new class{
		get template(){
			return `<span>Current Project</span><span id="select"></span><br/>
		<div id="banner">
			<input type="text" placeholder="subject here" id="text"/>
			<button onclick="todo.add()"><i class="fas fa-plus"></i></button>
			<button onclick="todo.clear1()"><i class="fas fa-trash"></i></button>
		</div>
		<div id="list">
			<li>li</li>
		</div>	`
		}
		async mount(){
			var p1 = await dodispatch({resource:"project",action:"list",params:{}})
			var p2 = p1.map(x=>`<option value="${x.id}">${x.name}</option>`)
			document.getElementById("select").innerHTML = 
			`<select id="ps" >${p2.join()}</select>`
			// console.log(item)
			document.getElementById("ps").addEventListener("change",()=>{
				this.list()
			})
		  	this.list()
		}
		async add(){
			var value = document.getElementById('text').value
			var pid = document.getElementById('ps').value
			var json = {resource:"todo",action:"add",params:{id:Date.now(),subject:value,pid}}
			var data = await dodispatch(json)
	  	this.list()
	  	document.getElementById('text').value = ""
		  	// document.getElementById("container").append("<button>acdkdkdkk</button")
		}
		async docheck (id,checked){
			// var value = document.getElementById('text').value
			// let checked = document.getElementById('checked').value
			var json = {resource:"todo",action:"checked",params:{id,checked}}
			var data = await dodispatch(json)
		  this.list()
		}
		onchange(){
			this.list()
		}
		async remove (id){
			var json = {resource:"todo",action:"remove",params:{id:id}}
			var data = await dodispatch(json)
			this.list()
		}
		async clear1 (){
			// alert(12)
			var json = {resource:"todo",action:"clear",params:{}}
			var data = await dodispatch(json)
			this.list()
		}	
		async list(){
			var pid = document.getElementById('ps').value
			var json = {resource:"todo",action:"list",params:{pid}}
			var data = await dodispatch(json)
			// await dolist("list",data)
			var elementid = "list"
			var options = data
			var m = []
			for (var i = 0; i < options.length; i += 1){
				var checked = options[i].checked?"checked":""
		        m[i] = `
		            <div><i onclick="todo.remove(${options[i].id})" class="fas fa-square-minus"></i></div>
			        <div><input type="checkbox" onclick="todo.docheck(${options[i].id},this.checked)" ${checked}/></div>
			        <div>${options[i].subject}</div>
		        
		        `;
		    }
			document.getElementById(elementid).innerHTML = `<div class="grid-container id="container">`+ m.join("") +`</div>`
		}
	}()