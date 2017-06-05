import Vue from 'vue';
import { ModalService, ModalDialogService } from '../src';

export const TestComponent = Vue.component('testComponent', {
  template: `
<div>
    <div class="modal__header">Modal</div>
    <div class="modal__body">Doing real work</div>
    <div class="modal__footer">
        <button v-on:click="submit()">Submit</button>
        <button v-on:click="cancel()">Cancel</button>
    </div>
</div>`,
  methods: {
    submit() {
      ModalDialogService.warning('are you sure?').then(
          submit => ModalService.submit('things'),
          cancel => {}
      )
    },
    cancel() {
      ModalService.cancel();
    }
  }
});