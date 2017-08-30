import Vue from 'vue';
import { OverlayService } from '../src';

export const TestOverlayComponent = Vue.component('testOverlay', {
  template:
`<div style="resize: both; overflow: auto;">
	  <slot name="movable"></slot>
    <div class="overlay__header">
        Header
    </div>
    <div class="overlay__body">
        This is the body
    </div>
    <div class="overlay__footer">
        <button class="btn" @click="close()">Good to go</button>
    </div>
</div>`,

  methods: {
    close() {
      OverlayService.submit('testOverlay')
    }
  }
});