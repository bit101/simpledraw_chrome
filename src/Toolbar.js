var Toolbar = {
  
  create: function(view, model) {
    var obj = Object.create(this);
    obj.init(view, model);
    return obj;
  },
  
  init: function(controller) {
    this.controller = controller;
    
    this.onWidth = this.onWidth.bind(this);
    this.onColor = this.onColor.bind(this);
    this.onBackground = this.onBackground.bind(this);
    this.onGridSize = this.onGridSize.bind(this);

    this.widthInput = document.getElementById("widthInput");
    this.widthInput.addEventListener("input", this.onWidth);
    
    this.colorInput = document.getElementById("colorInput");
    this.colorInput.addEventListener("change", this.onColor);
    
    this.backgroundInput = document.getElementById("backgroundInput");
    this.backgroundInput.addEventListener("change", this.onBackground);
    
    this.gridInput = document.getElementById("gridInput");
    this.gridInput.addEventListener("change", this.onGridSize);
    
    document.getElementById("clearBtn").addEventListener("click", this.controller.clear);
    
    document.getElementById("saveBtn").addEventListener("click", this.controller.save);

    document.getElementById("toggleSmoothBtn").addEventListener("click", this.controller.toggleSmooth);

    document.getElementById("toggleGridBtn").addEventListener("click", this.controller.toggleGrid);

    document.getElementById("toggleSnapBtn").addEventListener("click", this.controller.toggleSnap);

    document.getElementById("toggleDashBtn").addEventListener("click", this.controller.toggleDash);

    document.getElementById("modeBtn").addEventListener("click", this.controller.cycleModes);

    document.getElementById("helpBtn").addEventListener("click", this.controller.onHelp);
  },
  
  onWidth: function(event) {
    this.controller.setWidth(this.widthInput.value);
  },
  
  onColor: function(event) {
    this.controller.setColor(this.colorInput.value);
  },
    
  onBackground: function(event) {
    this.controller.setBackground(this.backgroundInput.value);
  },
  
  onGridSize: function(event) {
    this.controller.setGridSize(parseFloat(this.gridInput.value));
  },

};