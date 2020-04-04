let getElement = {
  key:function(tdEle,className){
    return tdEle.getElementsByClassName(className)[0].textContent;
  },

  input:function(tdEle,className){
    return tdEle.getElementsByClassName(className)[0].value;
  }
}

//イベントの中止
const stop = (e) => {
  e.preventDefault();
}

let formIvent = new Vue({
  el:"#Input",
  data:{
    todos:[]  
  },

  created(){
    this.todos = todoStorage.fetch();
  },
  
  computed:{
    computedTodos:function(){
      return this.todos.filter(function(e){
        return this.current < 0 
      })
    }
  },

  watch:{
    todos:{
      handler:function(todos){
        todoStorage.save(todos);
      }
    }
  },

  methods:{
    //ページ読み込み時
    window:onload = () =>{
      //テキストボックスに値挿入
      (function(){
        let getText = storageText.fetch("text");
        let input = document.getElementById("input");
        input.value = getText;
      }());

      //チェックボックスにチェック
      Check();
    },

    //Submitボタンクリック時
    doAdd:function(event){
      let value = this.$refs.input.value;
      let Bool = Regexalert(value,event);
      
      if(Bool){
        //キーを自動生成
        let key = getKey();
        let incBool = include(key,this.todos);
        if(incBool){
          while(true){
            key = getKey();
            if(!incBool){
              break;
            }
          }
        }

        this.todos.push({
          key:key,
          value:value,
          checked:false
        })
        //ローカルストレージに新規値を追加
        todoStorage.save(this.todos);
        this.$refs.input.value = "";
        //キーがtextであるセッションストレージを削除
        storageText.fresh("text");
      }
    },

    //チェックボックスに全てチェックを入れる
    checkAll:function(e) {
      if(this.todos.length === 0){
        alert("todoがありません!");
        return false;
      }

      e.toElement.style.display = "none";
      const getRemButton = getId("checkRemove");
      getRemButton.style.display = "block";

      this.todos.forEach(todo => todo.checked = true);
      todoStorage.save(this.todos);
      Check();
    },
    
    //チェックボックスのチェックを全て削除
    checkRemove:function(e){
      if(this.todos.length === 0){
        alert("todoがありません!");
        return false;
      }

      e.toElement.style.display = "none";
      const getCheckAll = getId("checkAll");
      getCheckAll.style.display = "block";

      this.todos.forEach(todo => todo.checked = false);
      todoStorage.save(this.todos);
      Check();
    },

    //値が変更された場合
    onChange:function(event){
      let inputVal = event.target.value;
      Regexalert(inputVal,event);
    },

    //チェックが入っている要素を削除
    deletes:function(event){
      let todosCount = this.todos.length;
      let todos = this.todos.filter(todo => todo.checked == false);

      if(todosCount === 0 && todos.length === 0){
        alerts.check();
        return false;
      }

      todoStorage.remove();
      this.todos = todos;
      //チャックボックスを初期化
      this.todos.forEach(todo => todo.checked = false);
      todoStorage.save(this.todos);
      clearCheckBox(); 
    },

    //フォーム入力時に、エンターキーを押した場合
    onKeypressEnter:function(event){
      let value = event.target.value;

      let Bool = Regexalert(value,event);

      if(Bool){
        //キーを自動生成
        let key = getKey();
        let incBool = include(key,this.todos);

        if(incBool){
          while(true){
            key = getKey();
            if(!incBool){
              break;
            }
          }
        }
        
        this.todos.push({
          key:key,
          value:value,
          checked:false
        })
        //ローカルストレージに追加
        todoStorage.save(this.todos);

        this.$refs.input.value = "";
        //キーがtextであるストレージを削除
        storageText.fresh("text");
      }
    },

    //スペースクリック時
    onClickSpace:function(e){
      alerts.space();
      //イベントの中止
      stop(e);
    },

    //入力フォームに値入力時
    onInput:function(event){
      let value = this.$refs.input.value;
      storageText.save("text",value);
    },

    //削除ボタンクリック時
    deleteItem:function(index){
      this.todos.splice(index,1);
    },

    //更新ボタンクリック時
    updateItem:function(index,key){
      const getEle = document.getElementById(key).parentNode;
      const value = getEle.getElementsByClassName("input")[0].value;

      let sameTodo = this.todos.find(todo => todo.key === key);
      sameTodo.value = value;

      //該当するtodoを更新
      todoStorage.save(this.todos);

      //アラート文
      alerts.update();
    },

    onKeypressValue:function(index,key){
      const getEle = document.getElementById(key).parentNode;
      const value = getEle.getElementsByClassName("input")[0].value;

      let sameTodo = this.todos.find(todo => todo.key === key);

      if(sameTodo == undefined){
        alert("ローカルストレージに不正な値が挿入されました");
      }
      sameTodo.value = value;

      //ローカルストレージを更新
      todoStorage.save(this.todos);
      alerts.update();
    },

    checkItem:function(index,key){

      this.todos.forEach(function(todo){
        if(todo.key === key){
          //checkdがtrueの場合、false falseの場合は、true
          todo.checked = todo.checked == true ? false : true;
        }
      })

      //ローカルストレージを更新
      todoStorage.save(this.todos);
    }
  }
});
