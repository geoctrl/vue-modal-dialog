import { ModalComponent } from './modal.component';
export { DialogService } from './dialog.service';
export { ModalService } from './modal.service';

export const VueModalDialog = {
  install(Vue) {
    ModalComponent(Vue);
  }
};