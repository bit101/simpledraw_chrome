var KeyboardHandler = {
  
  create: function(controller) {
    var obj = Object.create(this);
    obj.init(controller);
    return obj;
  },
  
  init: function(controller) {
    this.controller = controller;
    this.onKey = this.onKey.bind(this);
    document.addEventListener("keyup", this.onKey);
  },
  
  onKey: function(event) {
      console.log(event.keyCode);
      if(document.getElementsByClassName("alert_overlay").length > 0) {
        return;
      }
      var inNumberField = document.activeElement.type === "number";
      switch(event.keyCode) {
        case 84:    // t
          this.controller.toggleToolbar();
          break;
          
        case 70:    // f
          this.controller.toggleFullscreen();
          break;
        
        case 71:    // g
          this.controller.toggleGrid();
          break;
        
        case 77:    // m
          this.controller.cycleModes();
          break;
          
        case 76:    // l
          this.controller.setMode("lines");
          break;
          
        case 80:    // p
          this.controller.setMode("free");
          break;
          
        case 69:    // e
          this.controller.setMode("eraser");
          break;
        
        case 90:    // z
          if(navigator.appVersion.indexOf("Mac") != -1) {
            if(event.metaKey) {
              this.controller.undo();
            }
          }
          else if(event.ctrlKey) {
            this.controller.undo();
          }
          break;
          
        case 82:    // r
          this.controller.reset();
          if(event.shiftKey) {
            this.controller.clear();
          }
          break;
          
        case 83:    // s
          if(navigator.appVersion.indexOf("Mac") != -1) {
            if(event.metaKey) {
              this.controller.save();
            }
          }
          else if(event.ctrlKey) {
            this.controller.save();
          }
          else {
            this.controller.toggleSnap();
          }
          break;
          
        case 88:    // x
          this.controller.clear();
          break;
    
        case 89:    // y
          if(navigator.appVersion.indexOf("Mac") != -1) {
            if(event.metaKey) {
              this.controller.redo();
            }
          }
          else if(event.ctrlKey) {
            this.controller.redo();
          }
          break;
          
        case 49:    // 1
          if(!inNumberField) {
            this.controller.setColor("#ff0000");
          }
          break;
        case 50:    // 2
          if(!inNumberField) {
            this.controller.setColor("#ffff00");
          }
          break;
        case 51:    // 3
          if(!inNumberField) {
            this.controller.setColor("#00ff00");
          }
          break;
        case 52:    // 4
          if(!inNumberField) {
            this.controller.setColor("#00ffff");
          }
          break;
        case 53:    // 5
          if(!inNumberField) {
            this.controller.setColor("#0000ff");
          }
          break;
        case 54:    // 6
          if(!inNumberField) {
            this.controller.setColor("#ff00ff");
          }
          break;
        case 55:    // 7
          if(!inNumberField) {
            this.controller.setColor("#ffffff");
          }
          break;
        case 56:    // 8
          if(!inNumberField) {
            this.controller.setColor("#999999");
          }
          break;
        case 57:    // 9
          if(!inNumberField) {
            this.controller.setColor("#666666");
          }
          break;
        case 48:    // 0
          if(!inNumberField) {
            this.controller.setColor("#000000");
          }
          break;
          
        case 187:   // +
          var amount = event.shiftKey ? 10 : 1;
          this.controller.increaseLineWidth(amount);
          break;
          
        case 189:   // -
          var amount = event.shiftKey ? 10 : 1;
          this.controller.decreaseLineWidth(amount);
          break;

        case 221:   // ]
          var amount = event.shiftKey ? 10 : 1;
          this.controller.increaseGridSize(amount);
          break;
          
        case 219:   // [
          var amount = event.shiftKey ? 10 : 1;
          this.controller.decreaseGridSize(amount);
          break;
      }
  }
};