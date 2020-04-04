const storage_Key = "todos"

const todoStorage = {
  fetch:function(){
    let todos = JSON.parse(
      localStorage.getItem(storage_Key) || '[]'
    )

    return todos;
  },

  save:function(todos){
    localStorage.setItem(storage_Key,JSON.stringify(todos));
  },

  remove:function(){
    localStorage.removeItem(storage_Key);
  }
}
