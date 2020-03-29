let storage_Key = "todos"

let todoStorage = {
  fetch:function(){
    let todos = JSON.parse(
      localStorage.getItem(storage_Key) || '[]'
    )

    return todos;
  },

  save:function(todos){
    localStorage.setItem(storage_Key,JSON.stringify(todos));
  }
}
