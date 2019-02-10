import Vue from 'vue';
import { modalService, DialogService } from '../src';

export const ChildChild = Vue.component('childChildComponent', {
  template: `
<div>
    <div class="modal__header">Modal</div>
    <div class="modal__body">
      Are you sure?? sure sure???
      <br /> other things
      <br /> other things
      <br /> other things
    </div>
    <div class="modal__footer">
        <button v-on:click="cancel()">Cancel</button>
        <button v-on:click="submit()">Submit</button>
    </div>
</div>`,
  methods: {
    submit() {
      DialogService.warning('Last chance?').then(
        submit => modalService.submit('He said he was sure')
      )
    },
    cancel() {
      modalService.cancel();
    }
  }
});