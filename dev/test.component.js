import Vue from 'vue';
import { modalService, dialogService } from '../src';
import { ChildChild } from "./child-child.component";

export const TestComponent = Vue.component('testComponent', {
  template: `
<div>
    <div class="modal__header">Modal</div>
    <div class="modal__body">
      Doing real work
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
      modalService.open(ChildChild).then(
          submit => modalService.submit(submit)
      )
    },
    cancel() {
      modalService.cancel();
    }
  }
});