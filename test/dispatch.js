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