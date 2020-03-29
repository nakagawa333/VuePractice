let storageText = {

    fetch:function(texts_key){
        let texts = "";
        
        if(sessionStorage.getItem(texts_key) != null){
            texts = sessionStorage.getItem(texts_key);
        }
        
        return texts;
    },

    save:function(texts_key,texts){
        sessionStorage.setItem(texts_key,texts);
    },

    fresh:function(texts_key){
        sessionStorage.removeItem(texts_key);
    }

}