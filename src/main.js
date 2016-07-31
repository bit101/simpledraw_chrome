var model = Model.create(),
    view = View.create(model),
    controller = Controller.create(model, view),
    toolbar = Toolbar.create(controller),
    keyboardHandler = KeyboardHandler.create(controller);
