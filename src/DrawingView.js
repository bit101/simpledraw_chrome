var DrawingView = {
  
  
  
  create: function(view, model) {
    var obj = Object.create(this);
    obj.init(view, model);
    return obj;
  },
  
  init: function(view,  model) {
    this.view = view;
    this.model = model;
    
    this.canvas = document.getElementById("drawingCanvas");
    this.context = this.canvas.getContext("2d");

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    
    this.canvas.addEventListener("mousedown", this.onMouseDown);
    this.canvas.addEventListener("touchstart", this.onMouseDown);

  },
  
  setSize: function(w, h) {
    this.width = this.canvas.width = w;
    this.height = this.canvas.height = h;
  },
  
  render: function() {
    var line = this.model.currentLine,
        points = line.points;
    this.context.lineCap = "round";
    this.context.lineJoin = "round";
    this.clear();
    this.context.beginPath();
    this.context.strokeStyle = line.color;
    this.context.lineWidth = line.width;
    for(var j = 0; j < points.length; j++) {
      var point = points[j];
      this.context.lineTo(point.x, point.y);
    }
    if(!this.model.shiftMode && this.model.smooth) {
      this.context.lineTo(this.mouse.x, this.mouse.y);
    }
    this.context.stroke();
  },
  
  clear: function() {
    this.context.clearRect(0, 0, this.width, this.height);
  },

  
  onMouseDown: function(event) {
    this.lastPoint = null;
    this.model.shiftKey = event.shiftKey;
    this.model.newLine(this.getPoint(event));

    this.canvas.addEventListener("mousemove", this.onMouseMove);
    this.canvas.addEventListener("touchmove", this.onMouseMove);
    this.canvas.addEventListener("mouseup", this.onMouseUp);
    this.canvas.addEventListener("touchend", this.onMouseUp);
    event.preventDefault();
  },
  
  onMouseMove: function(event) {
    this.model.addPoint(this.getPoint(event));
    this.render();
    event.preventDefault();
  },
  
  onMouseUp: function() {
    if(this.model.smooth) {
      this.model.addPoint(this.mouse);
    }
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
    this.canvas.removeEventListener("touchmove", this.onMouseMove);
    this.canvas.removeEventListener("mouseup", this.onMouseUp);
    this.canvas.removeEventListener("touchend", this.onMouseUp);  
    this.view.render();
  },
  
  getPoint: function(event) {
    var point = {};
    if(event.touches) {
      point.x = event.touches[0].clientX;
      point.y = event.touches[0].clientY;
    }
    else {
      point.x = event.clientX;
      point.y = event.clientY;
    }
    if(this.model.toolbarVisible) {
      point.x -= 80;
    }
    if(this.model.snap) {
      this.snap(point);
      this.mouse = {x: point.x, y: point.y};
    }
    else if(this.lastPoint && this.model.smooth) {
      this.mouse = {x: point.x, y: point.y};
      point.x = this.lastPoint.x + (point.x - this.lastPoint.x) * 0.2;
      point.y = this.lastPoint.y + (point.y - this.lastPoint.y) * 0.2;
    }
    this.lastPoint = point;
    return point;    
  },
  
  snap: function(point) {
    point.x = Math.round(point.x / this.model.gridSize) * this.model.gridSize + 0.5;
    point.y = Math.round(point.y / this.model.gridSize) * this.model.gridSize + 0.5;
  }  
  
}














