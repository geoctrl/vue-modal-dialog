
class Modal {
  passComponent(modal) {
    this.open = modal.open;
    this.submit = modal.submit;
    this.cancel = modal.cancel;
  };
}

export const ModalService = new Modal();