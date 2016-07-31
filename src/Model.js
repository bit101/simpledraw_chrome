var Model = {
  
  
  
  create: function() {
    var obj = Object.create(this);
    obj.init();
    return obj;
  },
  
  init: function() {
    this.lines = [];
    this.numLines = 0;
    this.width = 2;
    this.color = "#000000";
    this.background = "#ffffff";
    this.minSegment = 5;
    this.gridVisible = false;
    this.gridSnap = false;
    this.gridSize = 40;
    this.mode = "free";
    this.toolbarVisible = true;
    this.isFullscreen = false;
  },
  
  clear: function() {
    this.lines = [];
    this.numLines = 0;
  },
  
  undo: function() {
    if(this.numLines > 0) {
      this.numLines--;
    }
  },
  
  redo: function() {
    if(this.numLines < this.lines.length) {
      this.numLines++;
    }
  },
  
  newLine: function(point) {
    // this.minSegment = Math.max(2, this.width / 2);
    this.shiftMode = null;
    this.lines.length = this.numLines;
    if(this.mode === "eraser") {
      this.currentLine = {
        points: [point],
        width: 40,
        color: this.background,
        eraser: true
      };
    }
    else {
      this.currentLine = {
        points: [point],
        width: this.width,
        color: this.color
      };
    }
    this.lines.push(this.currentLine);
    this.numLines++;
    this.lastPoint = point;
  },
  
  addPoint: function(point) {
    var dx = point.x - this.lastPoint.x,
        dy = point.y - this.lastPoint.y,
        dist = Math.sqrt(dx * dx + dy * dy);
    if(this.shiftKey && !this.shiftMode && dist > this.minSegment) {
      if(Math.abs(dx) > Math.abs(dy)) {
        this.shiftMode = "x";
      }
      else {
        this.shiftMode = "y";
      }
    }
    if(this.shiftMode === "x") {
      point.y = this.lastPoint.y;
    }
    else if(this.shiftMode === "y") {
      point.x = this.lastPoint.x;
    }
    if(this.mode === "lines") {
      this.currentLine.points.push(point);
      this.linify();      
    }
    if(dist > this.minSegment) {
      this.currentLine.points.push(point);
      this.lastPoint = point;
    }
  },
  
  toggleGrid: function() {
    this.gridVisible = !this.gridVisible;
  },
  
  toggleSnap: function() {
    this.snap = !this.snap;
  },
  
  cycleModes: function() {
    switch(this.mode) {
      case "free":
        this.mode = "lines";
        break;
        
      case "lines":
        this.mode = "eraser";
        break;
        
      case "eraser":
        this.mode = "free";
        break;
    }
  },
  
  linify: function() {
    var points = this.currentLine.points;
    this.currentLine.points = [points[0], points[points.length - 1]];
  }
};