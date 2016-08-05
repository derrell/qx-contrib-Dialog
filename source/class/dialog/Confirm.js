/**
 * 
 * Confirmation popup singleton
 * 
 */
qx.Class.define("dialog.Confirm", {
  extend: dialog.Dialog,
  statics: {
    /**
     * 
     * Returns singleton instance of this class. This method has to
     * be part of any subclass extending this widget.
     * 
     */
    getInstance: function() {
      return this.superclass.getInstance(this.classname);
    }
  },
  properties: {
    /**
     * 
     * Label used for the "yes button"
     * 
     */
    yesButtonLabel: {
      check: "String",
      nullable: false,
      init: "Yes",
      event: "changeYesButtonLabel"
    },
    /**
     * 
     * Icon used for the "yes button"
     * 
     */
    yesButtonIcon: {
      check: "String",
      nullable: true,
      init: "dialog/273-checkmark.svg",
      event: "changeYesButtonIcon"
    },
    /**
     * 
     * Label used for the "no button"
     * 
     */
    noButtonLabel: {
      check: "String",
      nullable: false,
      init: "No",
      event: "changeNoButtonLabel"
    },
    /**
     * 
     * Icon used for the "no button"
     * 
     */
    noButtonIcon: {
      check: "String",
      nullable: true,
      init: "dialog/272-cross.svg",
      event: "changeNoButtonIcon"
    },
    /**
     * 
     * This property controls the display of a cancel button
     * 
     */
    allowCancel: {
      refine: true,
      init: false
    }
  },
  members: {
    _yesButton: null,
    _noButton: null,
    /**
     * 
     * Create the main content of the widget
     * 
     */
    _createWidgetContent: function() {
      var groupboxContainer = new qx.ui.groupbox.GroupBox().set({
        contentPadding: [16, 16, 16, 16]
      });
      groupboxContainer.setLayout(new qx.ui.layout.VBox(10));
      this.add(groupboxContainer);
      var hbox = new qx.ui.container.Composite;
      hbox.setLayout(new qx.ui.layout.HBox(10));
      groupboxContainer.add(hbox);
      this._image = new qx.ui.basic.Image();
      this._image.setVisibility("excluded");
      hbox.add(this._image);
      this._message = new qx.ui.basic.Label();
      this._message.setRich(true);
      this._message.setWidth(200);
      this._message.setAllowStretchX(true);
      hbox.add(this._message, {
        flex: 1
      });
      var yesButton = this._yesButton = new qx.ui.form.Button;
      yesButton.setAllowStretchX(true);
      yesButton.addListener("execute", this._handleYes, this);
      this.bind("yesButtonLabel", yesButton, "label");
      this.bind("yesButtonIcon", yesButton, "icon");
      yesButton.getChildControl("icon").set({
        width: 16,
        height: 16,
        scale: true
      });
      yesButton.setLabel(this.tr("yes"));
      var noButton = this._noButton = new qx.ui.form.Button;
      noButton.setAllowStretchX(true);
      noButton.addListener("execute", this._handleNo, this);
      this.bind("noButtonLabel", noButton, "label");
      this.bind("noButtonIcon", noButton, "icon");
      noButton.getChildControl("icon").set({
        width: 16,
        height: 16,
        scale: true
      });
      noButton.setLabel(this.tr("no"));
      var cancelButton = this._createCancelButton();
      var buttonPane = new qx.ui.container.Composite;
      var bpLayout = new qx.ui.layout.HBox(5)
      bpLayout.setAlignX("center");
      buttonPane.setLayout(bpLayout);
      buttonPane.add(yesButton);
      buttonPane.add(noButton);
      buttonPane.add(cancelButton);
      groupboxContainer.add(buttonPane);
    },
    /**
     * 
     * Handle click on yes button. Calls callback with
     * a "true" value
     * 
     */
    _handleYes: function() {
      this.hide();
      if (this.getCallback()) {
        this.getCallback().call(this.getContext(), true);
      }
      this.resetCallback();
    },
    /**
     * 
     * Handle click on no button. Calls callback with 
     * a "false" value
     * 
     */
    _handleNo: function() {
      this.hide();
      if (this.getCallback()) {
        this.getCallback().call(this.getContext(), false);
      }
    }
  }
});