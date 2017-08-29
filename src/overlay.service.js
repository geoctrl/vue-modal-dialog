
function error() {
  throw Error(`[vue-modal-dialog] The modal-dialog component (<modal-dialog>) must be placed in a template (preferable root).`);
}

class Overlay {
  passComponent(overlay) {
    this.open = overlay.open;
  };

  // placeholder methods
  open() { error() };
}

export const OverlayService = new Overlay();