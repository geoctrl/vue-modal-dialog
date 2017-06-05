import Vue from 'vue';
import { VueModalDialog } from '../src';
import { ModalService, ModalDialogService } from '../src';
import { TestComponent } from './test.component';

import './styles/main.scss';

Vue.use(VueModalDialog);

new Vue({
  el: '#app',
  template: `
<div>
    <modal></modal>
    <button v-on:click="openDialog()">Open dialog</button>
    <button v-on:click="openModal()">Open Modal</button>
</div>`,
  methods: {
    openDialog() {
      ModalDialogService.error('Are you sure you want to delete this?')
    },
    openModal() {
      ModalService.open(TestComponent).then(
          res => console.log('res', res),
          cancel => console.log('cancel',  cancel)
      ).catch(
          err => {
            console.log('catch', err);
          }
      )
    }
  }
});