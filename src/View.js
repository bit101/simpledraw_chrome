var View = {
  
  create: function(model) {
    var obj = Object.create(this);
    obj.init(model);
    return obj;
  },
  
  init: function(model) {
    this.model = model;
    
    this.toolbarVisible = true;
    
    this.canvas = document.getElementById("canvas");
    this.context = canvas.getContext("2d");
    this.width = this.canvas.width = window.innerWidth - 80;
    this.height = this.canvas.height = window.innerHeight;  
    
    this.grid = Grid.create(this.model);
    this.grid.setSize(this.width, this.height);
    
    this.drawingView = DrawingView.create(this, this.model);
    this.drawingView.setSize(this.width, this.height);
    
    this.onResize = this.onResize.bind(this);
    window.addEventListener("resize", this.onResize);
    
  },
  
  onResize: function() {
    var oldWidth = this.width,
        oldHeight = this.height;
    if(this.model.toolbarVisible) {
      this.width = this.canvas.width = window.innerWidth - 80;
    }
    else {
      this.width = this.canvas.width = window.innerWidth;
    }
    this.height = this.canvas.height = window.innerHeight;  
    this.drawingView.setSize(this.width, this.height);
    this.grid.setSize(this.width, this.height);
    if(this.width < oldWidth || this.height < oldHeight) {
      this.model.isFullscreen = false;
    }
    this.render();
  },
  
  updateGrid: function() {
    this.grid.render();
  },
  
  render: function() {
    this.drawingView.clear();

    this.context.lineCap = "round";
    this.context.lineJoin = "round";
    this.context.clearRect(0, 0, this.width, this.height);
 
    for(var i = 0; i < this.model.numLines; i++) {
      var line = this.model.lines[i];
      this.context.beginPath();
      this.context.globalCompositeOperation = line.eraser ? "destination-out" : "source-over";
      this.context.strokeStyle = line.color;
      this.context.lineWidth = line.width;
      if(line.dash) {
        this.context.setLineDash([line.width * 5, line.width * 5]);
      }
      else {
        this.context.setLineDash([]);
      }
      for(var j = 0; j < line.points.length; j++) {
        this.context.lineTo(line.points[j].x, line.points[j].y);
      }
      this.context.stroke();
    }
  },
  
  updateBackground: function() {
    document.getElementById("app").style.backgroundColor = this.model.background;
  },
  
  updateCanvasPositions: function(hasToolbar) {
    var canvases = document.getElementsByTagName("canvas"),
        i;
    if(this.model.toolbarVisible) {
      for(i = 0; i < canvases.length; i++) {
        canvases[i].style.left = "80px";
      }
    }
    else {
      for(i = 0; i < canvases.length; i++) {
        canvases[i].style.left = 0;
      }
    }
    this.onResize();
  },
  
  getBitmap: function(callback) {
    var canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    var context = canvas.getContext("2d");
    context.fillStyle = this.model.background;
    context.fillRect(0, 0, this.width, this.height);
    context.drawImage(this.canvas, 0, 0);
    canvas.toBlob(callback);
  }

};


