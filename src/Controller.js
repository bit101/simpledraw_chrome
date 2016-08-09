var Controller = {
  
  create: function(model, view) {
    var obj = Object.create(this);
    obj.init(model, view);
    return obj;
  },
  
  init: function(model, view) {
    this.model = model;
    this.view = view;
    
    this.clear = this.clear.bind(this);
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    this.toggleGrid = this.toggleGrid.bind(this);
    this.toggleSmooth = this.toggleSmooth.bind(this);
    this.toggleSnap = this.toggleSnap.bind(this);
    this.toggleDash = this.toggleDash.bind(this);
    this.cycleModes = this.cycleModes.bind(this);
    this.toggleToolbar = this.toggleToolbar.bind(this);
    this.save = this.save.bind(this);
    this.onChooseFile = this.onChooseFile.bind(this);
    this.onHelp = this.onHelp.bind(this);
    this.updateVisibility = this.updateVisibility.bind(this);
    this.onWriterCreated = this.onWriterCreated.bind(this);
    this.onWriterFailed = this.onWriterFailed.bind(this);
  },
  
  setWidth: function(value) {
    this.model.width = value;
  },
  
  increaseLineWidth: function(amount) {
    this.model.width += amount;
    document.getElementById("widthInput").value = this.model.width;
  },
  
  decreaseLineWidth: function(amount) {
    this.model.width = Math.max(this.model.width - amount, 1);
    document.getElementById("widthInput").value = this.model.width;
  },
  
  increaseGridSize: function(amount) {
    this.model.gridSize += amount;
    document.getElementById("gridInput").value = this.model.gridSize;
    this.view.updateGrid();
  },
  
  decreaseGridSize: function(amount) {
    this.model.gridSize = Math.max(this.model.gridSize - amount, 5);
    document.getElementById("gridInput").value = this.model.gridSize;
    this.view.updateGrid();
  },
  
  setColor: function(value) {
    this.model.color = value;
    document.getElementById("colorInput").value = value;
  },
  
  setBackground: function(value) {
    this.model.background = value;
    this.view.updateBackground();
  },

  setGridSize: function(value) {
    this.model.gridSize = value;
    this.view.updateGrid();
  },

  clear: function() {
    this.model.clear();
    this.view.render();
  },
  
  undo: function() {
    this.model.undo();
    this.view.render();
  },
  
  redo: function() {
    this.model.redo();
    this.view.render();
  },

  toggleGrid: function() {
    this.model.toggleGrid();
    this.view.updateGrid();
  },

  toggleSmooth: function() {
    this.model.toggleSmooth();
    if(this.model.smooth) {
      document.getElementById("toggleSmoothBtn").getElementsByTagName("img")[0].src = "/assets/Smooth-48.png";
    }
    else {
      document.getElementById("toggleSmoothBtn").getElementsByTagName("img")[0].src = "/assets/NoSmooth-48.png";
    }
  },

  toggleSnap: function() {
    this.model.toggleSnap();
    if(this.model.snap) {
      document.getElementById("toggleSnapBtn").getElementsByTagName("img")[0].src = "/assets/Snap-48.png";
    }
    else {
      document.getElementById("toggleSnapBtn").getElementsByTagName("img")[0].src = "/assets/NoSnap-48.png";
    }
  },
  
  cycleModes: function() {
    this.model.cycleModes();
    this.updateModeIcon();
  },
  
  setMode: function(mode) {
    this.model.mode = mode;
    this.updateModeIcon();
  },
  
  updateModeIcon: function() {
    if(this.model.mode === "lines") {
      document.getElementById("modeBtn").getElementsByTagName("img")[0].src = "/assets/Line-48.png";
    }
    else if(this.model.mode === "free") {
      document.getElementById("modeBtn").getElementsByTagName("img")[0].src = "/assets/Pencil Tip-48.png";
    }
    else if(this.model.mode === "eraser") {
      document.getElementById("modeBtn").getElementsByTagName("img")[0].src = "/assets/Eraser-48.png";
    }
  },
  
  toggleToolbar: function() {
    this.model.toolbarVisible = !this.model.toolbarVisible;
    this.updateVisibility();
    this.view.updateCanvasPositions();
  },
  
  toggleFullscreen: function() {
    this.model.isFullscreen = !this.model.isFullscreen;
    if(this.model.isFullscreen) {
      document.getElementById("app").webkitRequestFullscreen();    
    }
    else {
      document.webkitExitFullscreen();    
    }
    this.view.updateCanvasPositions();
  },

  toggleDash: function () {
    this.model.dash = !this.model.dash;
    if(this.model.dash) {
      document.getElementById("toggleDashBtn").getElementsByTagName("img")[0].src = "/assets/Dash-48.png";
    }
    else {
      document.getElementById("toggleDashBtn").getElementsByTagName("img")[0].src = "/assets/NoDash-48.png";
    }
  },

  save: function() {
    chrome.fileSystem.chooseEntry({
      type: "saveFile",
      suggestedName: "drawing.png",
      accepts: [
        {extensions:["png"]}
      ]
    }, this.onChooseFile);
  },
  
  onChooseFile: function(fileEntry) {
    if(chrome.runtime.lastError || !fileEntry) {
      Alert.create("Error", "Failed to save file. Try another location.");
      return;
    }
    this.fileName = fileEntry.name;
     var self = this;
    this.view.getBitmap(function(blob) {
      self.blob = blob;
      fileEntry.createWriter(self.onWriterCreated, self.onWriterFailed);
      
    });
  },
  
  onWriterCreated: function(fileWriter) {
    var self = this;
    fileWriter.onwriteend = function(e) {
      Alert.create("File saved", "Your image was saved as \"" + self.fileName + "\"");
    };

    fileWriter.onerror = function(e) {
      Alert.create("Error", "Failed to save file. " + e.toString());
    };
    
    fileWriter.write(this.blob);
  },
  
  onWriterFailed: function(error) {
    console.log(error);
  },

  onHelp: function() {
    var html = "";
    html += "<h3>Keys:</h3>";
    html +=   "<ul>";
    html +=   "  <li>F - toggle full screen</li>";
    html +=   "  <li>T - toggle tool bar</li>";
    html +=   "  <li>G - toggle grid visibility</li>";
    html +=   "  <li>S - toggle snap to grid</li>";
    html +=   "  <li>O - toggle smoothing</li>";
    html +=   "  <li>D - toggle line dash</li>";
    html +=   "  <li>P - pencil mode</li>";
    html +=   "  <li>L - line mode</li>";
    html +=   "  <li>E - eraser mode</li>";
    html +=   "  <li>M - cycle drawing modes</li>";
    html +=   "  <li>X - clear drawing</li>";
    html +=   "  <li>R - reset all tools to default values, except background color</li>";
    html +=   "  <li>Shift-R - clear drawing, reset all tools to default values, including background color</li>";
    html +=   "  <li>0-9 - preset drawing colors</li>";
    html +=   "  <li>+/-  increase/decrease line width by 1</li>";
    html +=   "  <li>Shift +/-  increase/decrease line width by 10</li>";
    html +=   "  <li>Shift - constrain horiz/vert drawing</li>";
    html +=   "  <li>Ctrl/Cmd-S - save</li>";
    html +=   "  <li>Ctrl/Cmd-Z - undo</li>";
    html +=   "  <li>Ctrl/Cmd-Y - redo</li>";
    html +=   "</ul>";
    html +=   "<h3>Credits:</h3>";
    html +=   "<ul>";
    html +=   "  <li>Author: Keith Peters <a id='author_link' href='http:www.bit-101.com'>www.bit-101.com</a></li>";
    html +=   "  <li>Icon pack by <a id='icon_link' href='https://icons8.com'>icons8.com</a></l >";
    html +=   "</ul>";
    
    var help = Alert.create("Info", html);
  },
  
  updateVisibility: function() {
    if(this.model.toolbarVisible) {
      document.getElementsByClassName("toolbar")[0].style.display = "block";
    }
    else {
      document.getElementsByClassName("toolbar")[0].style.display = "none";
    }
  },
  
  reset: function(clearBG) {
    this.model.width = 2;
    document.getElementById("widthInput").value = this.model.width;

    this.model.color = "#000000";
    document.getElementById("colorInput").value = this.model.color;

    if(clearBG) {
      this.model.background = "#ffffff";
      document.getElementById("backgroundInput").value = this.model.background;
      this.view.updateBackground();
      this.clear();
    }

    this.model.gridVisible = false;
    this.view.updateGrid();
    
    this.model.snap = false;
    document.getElementById("toggleSnapBtn").getElementsByTagName("img")[0].src = "/assets/NoSnap-48.png";

    this.model.gridSize = 40;
    document.getElementById("gridInput").value = this.model.gridSize;

    this.model.mode = "free";
    document.getElementById("modeBtn").getElementsByTagName("img")[0].src = "/assets/Pencil Tip-48.png";

    this.model.smooth = true;
    document.getElementById("toggleSmoothBtn").getElementsByTagName("img")[0].src = "/assets/Smooth-48.png";

  }

}