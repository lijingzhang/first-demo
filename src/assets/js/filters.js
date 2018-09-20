
//货币类型过滤
let countType = value => {
    if(value=="CNY"){
        return "CNY(人民币)"
    }
    else  if(value=="USD"){
        return "USD(美元)"
    }
    else if(value=="人民币"){
        return "CNY(人民币)"
    }
    else  if(value=="美金"){
        return "USD(美元)"
    }
  }
//货币类型过滤
let fhType = value => {
    if(value=="CNY"){
        return "￥"
    }
    else  if(value=="USD"){
        return "$"
    }
    else if(value=="人民币"){
        return "￥"
    }
    else  if(value=="美金"){
        return "$"
    }
  }
//保留4位小数
let tofix = value => {
   return value.toFixed(4)
  }

  //状态
let loanStatus=value => {
    if(value==0){
        return '未还款'
    }
    else if(value==1){
        return "已还款"
    }
   }

  //截取字符串 
  let MaxLength=value=> {
    if(value&& value.length > 10) {
        value= value.substring(0,10)+ '...';
       }
        return value;
} 
  export { countType ,tofix,loanStatus,fhType,MaxLength}
//export { evenNumbers, capitalize }