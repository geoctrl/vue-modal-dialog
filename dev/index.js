import Vue from 'vue';
import { VueModalDialog } from '../src';
import { ModalService, DialogService, OverlayService } from '../src';
import { TestOverlayComponent } from './test-overlay';
import { TestOverlayComponent2 } from './test-overlay-2';
import { TestComponent } from './test.component';

import './styles/main.scss';

Vue.use(VueModalDialog);

new Vue({
  el: '#app',
  template: `
<div>
    <modal-dialog></modal-dialog>
    <button @click="openDialog()">Open dialog</button>
    <button @click="openModal()">Open Modal</button>
    <button @click="openOverlay()">Open Overlay</button>
    <button @click="openOverlay2()">Open Overlay 2</button>
</div>`,
  methods: {
    openOverlay() {
      OverlayService.open(TestOverlayComponent, 'testOverlay').then(
          res => console.log('overlay resolve'),
          rej => console.log('overlay reject')
      );
    },
    openOverlay2() {
      OverlayService.open(TestOverlayComponent2, 'testOverlay2').then(
          res => console.log('overlay 2 resolve'),
          rej => console.log('overlay 2 reject')
      );
    },
    openDialog() {
      DialogService.error('Are you sure you want to delete this?')
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