var Grid = {
  
  
  
  create: function(model) {
    var obj = Object.create(this);
    obj.init(model);
    return obj;
  },
  
  init: function() {
    this.model = model;
    
    this.canvas = document.getElementById("grid");
    this.context = this.canvas.getContext("2d");
  },
  
  render: function() {
    this.context.clearRect(0, 0, this.width, this.height);
    if(this.model.gridVisible) {
      this.context.beginPath();
      this.context.lineWidth = 0.125;
      for(var x = 0; x < this.width; x += this.model.gridSize) {
        this.context.moveTo(x + 0.5, 0);
        this.context.lineTo(x + 0.5, this.height);
      }
      for(var y = 0; y < this.height; y += this.model.gridSize) {
        this.context.moveTo(0, y + 0.5);
        this.context.lineTo(this.width, y + 0.5);
      }
      this.context.stroke();
    }
  },
  
  setSize: function(w, h) {
    this.width = this.canvas.width = w;
    this.height = this.canvas.height = h;
    this.render();
  },
  
  
};