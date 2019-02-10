import Vue from 'vue';
import { VueModalDialog } from '../src';
import { modalService, DialogService } from '../src';
import { TestComponent } from './test.component';

import './styles/main.scss';

Vue.use(VueModalDialog);

new Vue({
  el: '#app',
  template: `
<div>
    <button @click="openDialog()">Open dialog</button>
    <button @click="openModal()">Open Modal</button>
    <modal-dialog></modal-dialog>
</div>`,
  methods: {
    openDialog() {
      DialogService.error('Are you sure you want to delete this?')
    },
    openModal() {
      modalService.open(TestComponent, {
        backdropClose: false,
        size: 'lg',
      }).then(
        res => console.log(res),
        cancel => {}
      )
    }
  }
});