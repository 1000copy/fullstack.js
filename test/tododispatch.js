var jd = require('dispatch')
var check = require("check")
class Obj1{
    action1(){
        result = "action1 of obj1 is here"
        return result;
    }
    action2(params){
        return params;
    }
}
jd.register('obj1',new Obj1())
var result = jd.dispatch({resource:"obj1",action:"action1",params:{}})
check( "action1 of obj1 is here",result.data,"failure of obj1.action1 dispatch")
var result = jd.dispatch({resource:"obj1",action:"action2",params:{id:1}})
check( {id:1},result.data,"failure of obj1.action2 dispatch")
(async ()=>{
    var Todo = require('../src/todo')
    var check = require("check")
    var JsonFile = require("jsonfile")
    var jsonfile = new JsonFile('./test/todo.json')
    var todo = new Todo(jsonfile)
    check(true,true)
    await todo.add({id:1,subject:"todo 1"})
    // return 
    check(await todo.reload(),[{id:1,subject:"todo 1"}],'reload failure',true)
    check(await todo.remove({id:1}),{id:1},'todo.remove failure',true)
    check(await todo.reload(),[],'reload failure',true)
    await todo.clear()
    check(await todo.reload(),[],'reload failure',true)
    check(1,0,"OK")
})()