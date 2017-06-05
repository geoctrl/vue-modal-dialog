import { ModalComponent } from './modal.component';

export { ModalDialogService } from './dialog.service';
export { ModalService } from './modal.service';

export const Modal = {
  install(Vue) {
    ModalComponent(Vue);
  }
};
