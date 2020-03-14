let vueEvent = new Vue({
  el:"#vue-app",
  data:{
    output:'Your fav food'
  },

  methods:{
    readRefs:function(){

      console.log(this.$refs.input.value);
      this.output = this.$refs.input.value;
    },

    onChange:function(event){
      let inputVal = event.target.value;

      if(!(inputVal == '' || inputVal == null)){
        alert("Hello");
      }

        // if(!(inputVal.match("/[亜-熙ぁ-んァ-ヶa-zA-z]/"))){
        //   alert("日本語とローマ字のみ許可されています。");

        // }

     
    }
  }
})

vueEvent.readRefs();