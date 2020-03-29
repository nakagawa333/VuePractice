let getElement = {
  key:function(tdEle,className){
    return tdEle.getElementsByClassName(className)[0].textContent;
  },

  input:function(tdEle,className){
    return tdEle.getElementsByClassName(className)[0].value;
  }
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
      let getText = storageText.fetch("text");
      let input = document.getElementById("input");
      input.value = getText;
    },

    //Submitボタンクリック時
    doAdd:function(event){
      let value = this.$refs.input.value;

      let Bool = Regexalert(value,event);
      
      if(Bool){
        //キーを自動生成
        let key = AutoGeneChar();
        checked = false;

        this.todos.push({
          key:key,
          value:value,
          checked:checked
        })
        //ローカルストレージに新規値を追加
        todoStorage.save(this.todos);
        this.$refs.input.value = "";
        //キーがtextであるセッションストレージを削除
        storageText.fresh("text");
      }
    },

    //値が変更された場合
    onChange:function(event){
      let inputVal = event.target.value;
      Regexalert(inputVal,event);
    },

    deletes:function(event){
      const checkdDelete = () => {
        let checkeds = document.getElementsByClassName("checked");

        if(checkeds.length == 0){
          alert("チェックボックスに、チェックされていません");
          return false;
        }       
        //htmlcollectionを、配列に変換
        checkeds = Array.from(checkeds);

        checkeds.forEach(function(item){
          item.parentNode.remove();
          delete todos[item.id];
        });

        todoStorage.save(this.todos);
      }
      checkdDelete();
    },

    //フォーム入力時に、エンターキーを押した場合
    onKeypressEnter:function(event){
      let value = event.target.value;

      let Bool = Regexalert(value,event);

      if(Bool){
        //キーを自動生成
        let key = AutoGeneChar();

        checked = false;

        this.todos.push({
          key:key,
          value:value,
          checked:checked
        })
        //ローカルストレージに追加
        todoStorage.save(this.todos);

        this.$refs.input.value = "";
        //キーがtextであるストレージを削除
        storageText.fresh("text");
      }

    },

    //スペースクリック時
    onClickSpace:function(event){
        alert("スペースの代入は、許可されていません。");
        //イベントの中止
        event.preventDefault();
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

      todoStorage.save(this.todos);
    },

    onKeypressValue:function(index,key){
      const getEle = document.getElementById(key).parentNode;
      const value = getEle.getElementsByClassName("input")[0].value;

      let sameTodo = this.todos.find(todo => todo.key === key);
      sameTodo.value = value;

      todoStorage.save(this.todos);
    },

    checkItem:function(event){
      const checkBool = event.toElement.checked;
      const parEles = event.path;

      const tdEle = parEles.find(e => e.tagName === "TR");
      const checkbox = tdEle.getElementsByClassName("checkbox")[0];

      if(checkBool){
        checkbox.classList.add("checked");
      } 

      if(!checkBool){
        checkbox.classList.remove("checked");
      }
    }
  }
});
