
function error() {
  throw Error(`[vue-modal-dialog] The modal-dialog component (<modal-dialog>) must be placed in a template (preferable root).`);
}

class Overlay {
  passComponent(overlay) {
    this.open = overlay.open;
    this.submit = overlay.submit;
    this.cancel = overlay.cancel;
  };

  // placeholder methods
  open()   { error() };
  submit() { error() };
  cancel() { error() };
}

export const OverlayService = new Overlay();