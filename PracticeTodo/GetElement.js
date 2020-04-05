const getClass = (name) => {
    return document.getElementsByClassName(name);
}

const getId = (id) => {
    return document.getElementById(id);
}

const getTag = (name) => {
  return document.getElementsByTagName(name);
}

const createEle = (name) => {
  return document.createElement(name);
}

const getElement = {
    key:function(tdEle,className){
      return tdEle.getElementsByClassName(className)[0].textContent;
    },
  
    input:function(tdEle,className){
      return tdEle.getElementsByClassName(className)[0].value;
    }
  }