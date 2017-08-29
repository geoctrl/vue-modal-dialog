import { ModalDialogComponent } from './modal-dialog.component';
import { ModalComponent } from './modal.component';
import { OverlayComponent } from './overlay.component';

export { DialogService } from './dialog.service';
export { ModalService } from './modal.service';
export { OverlayService } from './overlay.service';

export const VueModalDialog = {
  install(Vue) {
    ModalDialogComponent(Vue);
    ModalComponent(Vue);
    OverlayComponent(Vue);
  }
};