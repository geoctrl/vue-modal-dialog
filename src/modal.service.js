
function error() {
  throw Error(`[vue-modal-dialog] The modal component (<modal>) must be placed in a template (preferable root).`);
}

class ModalService {
  passComponent(modal) {
    this.open = modal.open;
    this.submit = modal.submit;
    this.cancel = modal.cancel;
  };

  // placeholder methods
  open()    { error() };
  submit()  { error() };
  cancel()  { error() };
}

export const modalService = new ModalService();