//関数の呼び出し
//import {Regexalert,setlocal} from "./func.js";

let items = JSON.parse(localStorage.getItem("food"));

let keys;

if(items != null){
  keys = Object.keys(items);
} else if(items == null){
  keys = null;
}

let vueEvent = new Vue({
  el:"#Input",

  data:{
    items:items,
    keys:keys
  },

  methods:{
    readRefs:function(event){
      
      //初回ロードイベント発火防止
      if(event == undefined){
        return false;
      }

      let inputVal = this.$refs.input.value;

      let Bool = Regexalert(inputVal,event);
      
      if(Bool){
        let key = AutoGeneChar();

        setlocal(inputVal,key);
        this.$refs.input.value = "";
      }

    },

    onChange:function(event){
      let inputVal = event.target.value;
      
      Regexalert(inputVal,event);
    },

    onKeypressEnter:function(event){
      let inputVal = event.target.value;
      
      this.item = inputVal;
      let Bool = Regexalert(inputVal,event);

      if(Bool){
        let key = AutoGeneChar();
        
        setlocal(inputVal,key);
        this.$refs.input.value = "";
      }

    },

    onClickSpace:function(event){

      if(event.cancelable){
        alert("スペースの代入は、許可されていません。");
        event.preventDefault();
      }

      if(!(event.cancelable)){
        return false;
      }

    },

    Delete:function(event){
      let parEles = event.path;
      let tdEle = parEles.find(e => e.tagName === "TR");

      let key = tdEle.getElementsByClassName("key")[0].textContent;
      let value = tdEle.getElementsByClassName("item")[0].textContent;

      //該当する箇所を削除
      if(items[key] == value){
        delete items[key];
        localStorage.setItem("food",JSON.stringify(items));
      }
      
      tdEle.remove();
    }
  }
})

vueEvent.readRefs();