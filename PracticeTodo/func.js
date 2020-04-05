const Regexalert = (inputVal) =>{
  let boolean = true;
  if(!(inputVal == "" || inputVal == null)){
    if(!(inputVal.match("^[亜-熙ぁ-んァ-ヶa-zA-z]"))){
      boolean = false;
      alert("文字の入力は、日本語、ローマ字のみ許可されています。");
    }
  }
  
  if(boolean){
    if(inputVal == ""){
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


const disChange = (e,id) => {
  e.toElement.style.display = "none";
  const getEle = getId(id);
  getEle.style.display = "block";
}

const rand = n => Math.floor(Math.random() * n) + 1;

const getKey = () => {
  const randomChar = "abcdefghijklmnopqrstuvwxyz0123456789";
  //ランダムな数値
  const ranNum = rand(10);
  //randomCharの文字の数
  const randlen = randomChar.length;
  let key = "";
  for(let i = 0; i < ranNum; i++){
    //key += randomChar[Math.floor(Math.random() * randomChar.length)];
    key += randomChar[rand(randlen)];  
   }
  return key;
}