//チェックボックスにチェックがあるかを確認
const CheckExists = (todos) => {
  return todos.some(todo => todo.checked === true);
}

//キーが存在するか確認
const KeyExists = (todos,key) => {
  return todos.some(todo => todo.key === key);
}

function stop(e){
  e.preventDefault();
}

let formIvent = new Vue({
  el:"#Input",
  data:{
    todos:[],
    text:''  
  },

  created(){
    this.todos = todoStorage.fetch();
    this.text = storageText.fetch("text");
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
      },
      deep:true
    },

    text:{
      handler:function(text){
        storageText.save("text",text);
      }
    },
    deep:true
  },

  methods:{
    //ページ読み込み時
    window:onload = () =>{
      //チェックボックスにチェック
      Check();
    },

    //Submiボtタンクリック時
    doAdd:function(e){
      let value = this.$refs.input.value;
      let Bool = Regexalert(value);
      //イベントの中止
      stop(e);

      if(Bool){
        //キーを自動生成
        let key = getKey();
        let keyExists = KeyExists(this.todos,key);
        //キーがすでにリストに含まれる場合
        if(keyExists){
          while(true){
            key = getKey();
            keyExists = KeyExists(this.todos,key);
            if(!keyExists){
              break;
            }
          }
        }

        this.todos.push({
          key:key,
          value:value,
          checked:false
        })


        //テキストボックスを空に
        this.text = "";
      }
    },

    //マウスが、Submitボタン要素に入った場合
    SubonMouseEnter:function(e){
      //イベントの中止
      stop(e);

      const element = e.toElement;
      //Y軸
      const left = element.offsetLeft;
      //X軸
      const top = element.offsetHeight;

      const coord = {
        left:left,
        top:top
      }

      const tool_coord = ToolChip(coord);
      const get_Tool = getId("toolchip");

      get_Tool.style.display = "block";
      get_Tool.style.left = tool_coord.left + "px";
      get_Tool.style.top = tool_coord.top + "px";

    },

    //ボタンが、マウスから離れた場合
    onMouseleave:function(e){
      stop(e);
      const get_Tool = getId("toolchip");
      get_Tool.style.display= "none";
    },

    //チェックボックスに全てチェックを入れる
    checkAll:function(e) {
      if(this.todos.length === 0){
        alert("todoがありません!");
        return false;
      }

      disChange(e,"checkRemove");

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

      disChange(e,"checkAll");

      this.todos.forEach(todo => todo.checked = false);

      todoStorage.save(this.todos);

      Check();
    },

    //値が変更された場合
    onChange:function(e){
      this.text = e.srcElement.value;
    },

    //チェックが入っている要素を削除
    deletes:function(event){
      const checkExists = CheckExists(this.todos);

      if(!checkExists){
        alerts.check();
        return false;
      }

      let todos = this.todos.filter(todo => todo.checked == false);

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
        let incBool = KeyExists(this.todos,key);

        this.todos.push({
          key:key,
          value:value,
          checked:false
        })
        
        this.text = "";
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
      const value = this.$refs.input.value;
      this.text = value;
    },

    //削除ボタンクリック時
    deleteItem:function(index){
      this.todos.splice(index,1);
    },

    //更新ボタンクリック時
    updateItem:function(index,key,val){
      const getKey = KeyExists(this.todos,key);

      if(!getKey){
        alert("更新に失敗しました");
        return false;
      }
      
      const getEle = getId(key).parentNode;
      const input_val = getEle.getElementsByClassName("input")[0].value;

      let sameTodo = this.todos.find(todo => todo.key === key && todo.value === val);
      sameTodo.value = input_val;

      //該当するtodoを更新
      todoStorage.save(this.todos);

      //アラート文
      alerts.update();
    },

    //セルでエンターキーを押した際
    onKeypressValue:function(index,key,val){
      const getKey = KeyExists(this.todos,key);

      if(!getKey){
        alert("更新に失敗しました");
        return false;
      }
      const getEle = getId(key).parentNode;
      const value = getEle.getElementsByClassName("input")[0].value;

      let sameTodo = this.todos.find(todo => todo.key === key && todo.value === val);
      sameTodo.value = value;

      //ローカルストレージを更新
      todoStorage.save(this.todos);
      alerts.update();

      //カーソルの位置を変更
      try{
        getClass("input")[index + 1].focus();
      } catch {
        getClass("input")[0].focus();
      }
    },

    //チェックを入れた場合
    checkItem:function(index,key){
      this.todos.forEach(function(todo){
        if(todo.key === key){
          //checkdがtrueの場合、false falseの場合は、true
          todo.checked = todo.checked == true ? false : true;
          return true;
        }
        
        return false;
      })

      //ローカルストレージを更新
      todoStorage.save(this.todos);
    }
  }
});
