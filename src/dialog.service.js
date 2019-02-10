import { modalService } from './modal.service';
import { DialogComponent } from './dialog.component';

class DialogService {
  constructor() {
    this.submitText = 'Submit';
    this.cancelText = 'Cancel';
  };

  setConfig(config) {
    if (config.submitText) {
      this.submitText = config.submitText;
    }
    if (config.cancelText) {
      this.cancelText = config.cancelText;
    }
  };

  notice(message, dialogConfig, modalConfig) {
    return this.open('notice', message, dialogConfig, modalConfig);
  };

  warning(message, dialogConfig, modalConfig) {
    return this.open('warning', message, dialogConfig, modalConfig);
  };

  error(message, dialogConfig, modalConfig) {
    return this.open('error', message, dialogConfig, modalConfig);
  };

  success(message, dialogConfig, modalConfig) {
    return this.open('success', message, dialogConfig, modalConfig);
  };

  open(type, message, dialogConfig={}, modalConfig={}) {
    let data = Object.assign({
      title: type[0].toUpperCase() + type.slice(1),
      message,
      submitText: this.submitText,
      cancelText: this.cancelText
    }, dialogConfig);

    return modalService.open(DialogComponent, Object.assign({
          backdropClose: true,
          escapeClose: true,
          size: 'md',
          type,
        }, modalConfig, {data})
    );
  }

}

export const dialogService = new DialogService();