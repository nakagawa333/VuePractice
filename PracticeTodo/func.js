function Regexalert(inputVal,event){

    let boolean = true;
    if(!(inputVal == "" || inputVal == null)){
      if(!(inputVal.match("^[亜-熙ぁ-んァ-ヶa-zA-z]"))){
        boolean = false;
        alert("文字の入力は、日本語、ローマ字のみ許可されています。");
      }
    }

    if(boolean){
      if(inputVal == "" && event != undefined){
        alert("空文字は、許可されていません");
        boolean = false;
      }
    }

    if(boolean){
      if(10 < inputVal.length){
        boolean = false;
        alert("文字列は、10文字まで許可されています");
      }
    }
    
    return boolean;
}
  

function AutoGeneChar(){
  const rand = n => Math.floor(Math.random() * n) + 1;

  const getKey = (rand) => {
    const randomChar = "abcdefghijklmnopqrstuvwxyz0123456789";
    let key = "";
    const ranNum = rand(10);

    for(let i = 0; i < ranNum; i++){
      key += randomChar[Math.floor(Math.random() * randomChar.length)];
    }

    return key;
  }
  
  return getKey(rand);
}

function addDoM(inputVal){
  let listsId = document.getElementById("lists");
  listsId.insertAdjacentHTML("beforeend","<td><input type=checkbox></td>" + "<input type=checkbox>" + "<label>" + inputVal + "</label>" + "</div>");
  
}
