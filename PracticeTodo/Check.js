//デバッグ用
const log = (e) => {
    console.log(e);
}

const clearCheckBox = () => {
    let checkClass = getClass("checkbox");

    if(checkClass == null || checkClass == ''){
        return false;
    }

    for(let i = 0; i < checkClass.length; i++){
        checkClass[i].children[0].checked = false;    
    }
}
 
const Check = () => {
    let checkClass = getClass("checkbox");

    if(checkClass == null || checkClass == ''){
        return false;
    }

    for(let i = 0; i < checkClass.length; i++){
      let key = checkClass[i].id;
      let todos = todoStorage.fetch();
      let getTodo = todos.find(todo => todo.key === key);

      if(getTodo == undefined){
          return false;
      }
      //チェックされている場合
      if(getTodo.checked){
          checkClass[i].children[0].checked = true;
        } else if(!(getTodo.checked)){
           checkClass[i].children[0].checked = false;
        }
    } 
}
