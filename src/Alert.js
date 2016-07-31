var Alert = {
  
  create: function(title, text) {
    var obj = Object.create(this);
    obj.init(title, text);
    return obj;
  },
  
  init: function(title, text) {
    var overlay = document.createElement("div");
    overlay.className = "alert_overlay";
    
    var div = document.createElement("div");
    div.className = "alert";
    div.innerHTML = "<h1>" + title + "</h1><p>" + text + "</p><input id='close_btn' type='button' value='OK'></input>";
    
    overlay.appendChild(div);
    document.body.appendChild(overlay);
    var btn = document.getElementById("close_btn");
    btn.addEventListener("click", function() {
      document.body.removeChild(overlay);
    });
  }
};