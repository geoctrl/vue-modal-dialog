import { ModalDialogComponent } from './modal-dialog.component';
import { ModalComponent } from './modal.component';

export { dialogService } from './dialog.service';
export { modalService } from './modal.service';

export const VueModalDialog = {
  install(Vue) {
    ModalDialogComponent(Vue);
    ModalComponent(Vue);
  }
};