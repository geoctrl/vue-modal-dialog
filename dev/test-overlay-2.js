import Vue from 'vue';
import { OverlayService } from '../src';

export const TestOverlayComponent2 = Vue.component('testOverlay2', {
  template:
`<div style="resize: both; overflow: auto;">
	  <slot name="movable"></slot>
    <div class="overlay__header">
        Header 2
    </div>
    <div class="overlay__body">
        This is the body 2
    </div>
    <div class="overlay__footer">
        <button class="btn" @click="close()">Good to go 2</button>
    </div>
</div>`,

  methods: {
    close() {
      OverlayService.cancel('testOverlay2')
    }
  }
});