import Vue from 'vue';
import { modalService } from './modal.service';

export const DialogComponent = Vue.component('dialogComponent', {
  render(h) {
    return h(
      'div',
      [
        h(
          'div',
          {
            class: { 'modal__header': true },
            style: this.data.title ? {} : { display: 'none' },
          },
          this.data.title
        ),
        h(
          'div',
          { class: { 'modal__body': true } },
          this.data.message
        ),
        h(
          'div',
          { class: { 'modal__footer': true } },
          [
            h(
              'button',
              {
                class: { 'btn': true },
                style: !this.data.cancelText ? { display: 'none' } : {},
                on: { click: modalService.cancel },
              },
              this.data.cancelText
            ),
            h(
              'button',
              {
                class: { 'btn': true, 'btn--primary': true },
                style: !this.data.submitText ? { display: 'none' } : {},
                on: { click: modalService.submit },
              },
              this.data.submitText
            )
          ]
        ),
      ]
    )
  },
  props: ['data'],
});