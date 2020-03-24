function Regexalert(inputVal,event){

    let boolean = true;
    if(!(inputVal == "" || inputVal == null)){
      if(!(inputVal.match("^[亜-熙ぁ-んァ-ヶa-zA-z]"))){
        boolean = false;
        alert("文字の入力は、日本語、ローマ字のみ許可されています。");

      }
    }
  
    if(inputVal == "" && event != undefined){
      alert("空文字は、許可されていません");
      boolean = false;
    }
  
    if(10 < inputVal.length){
      boolean = false;
      alert("文字列は、10文字まで許可されています");
    }
    
    return boolean;
}
  
function setlocal(inputVal,key){
  let getFood = JSON.parse(localStorage.getItem("food"));

  let setval = function(e){
    localStorage.setItem("food",JSON.stringify(e));
  }

  
  //ローカルストレージの値が重複しないか
  let boo = (objs) =>{
    objs.some(obj =>{
      if(key == obj){
        key = AutoGeneChar();
        return true;
      }
    })
  }

  function setLocalSto(){
    if(getFood != null){
      let objs = Object.keys(getFood);
      boo(objs);

      getFood[key] = inputVal;
      setval(getFood);
    } else {
      const dataList = {key:inputVal}
      setval(dataList);
    }
  }

  setLocalSto();
}


function AutoGeneChar(){
  const randomChar = "abcdefghijklmnopqrstuvwxyz0123456789";
  let char = "";
  
  let rand = function(n){
    return Math.floor(Math.random() * n) + 2;
  }

  let ranNum = rand(10);

  function localAutoChar(){
    for(let i = 0; i < ranNum; i++){
      char += randomChar[Math.floor(Math.random() * randomChar.length)];
    }
  }
  
  localAutoChar();

  return char;
}

function addDoM(inputVal){
  let listsId = document.getElementById("lists");
  listsId.insertAdjacentHTML("beforeend","<td><input type=checkbox></td>" + "<input type=checkbox>" + "<label>" + inputVal + "</label>" + "</div>");
  
}
