import { ModalComponent } from './modal.component';

export const VueModalDialog = {
  install(Vue) {
    ModalComponent(Vue);
  }
};

export { DialogService } from './dialog.service';
export { ModalService } from './modal.service';