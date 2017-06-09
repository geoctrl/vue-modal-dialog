import Vue from 'vue';
import { ModalService } from './modal.service';

export const DialogComponent = Vue.component('dialogComponent', {
  template: `
<div>
    <div class="modal__header" v-show="data.title">
        {{data.title}}
    </div>
    <div class="modal__body">
        {{data.message}}
    </div>
    <div class="modal__footer">
        <button class="btn btn--primary" v-on:click="submit()" v-show="data.submitText">
            {{data.submitText}}
        </button>
        <button class="btn" v-on:click="cancel()" v-show="data.cancelText">
            {{data.cancelText}}
        </button>
    </div>
</div>`,
  props: ['data'],
  methods: {
    submit() {
      ModalService.submit();
    },
    cancel() {
      ModalService.cancel();
    }
  }
});