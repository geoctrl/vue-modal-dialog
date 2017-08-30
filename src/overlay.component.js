import { OverlayService } from './overlay.service';
import { DeferPromise } from './utils';

export function OverlayComponent(Vue) {
  Vue.component('overlay', {
    template:
`<div class="overlay-wrapper">
    <div class="overlay"
         ref="overlay"
         v-for="(overlay, key) in list"
         :is="overlay.component"
         :style="{width:400+'px', height: 200+'px'}">
         <div slot="movable"
              class="overlay__movable"
              @mousedown="startMove(key)"
              @mouseup="stopMove()"><div></div></div>
    </div>
</div>`,

    mounted() {
      OverlayService.passComponent(this);
    },

    data() {
      return {
        list: []
      }
    },

    methods: {
      open(component, id, config={}) {
        if (this.list.find(item => item.id === id)) return;
        let defer = new DeferPromise();
        this.list.push({
          id,
          component,
          defer
        });
        return defer.defer;
      },

      startMove(key) {
        this.movingEl = this.$refs.overlay[key].$el;
        document.addEventListener('mousemove', this.move);
      },

      stopMove() {
        document.removeEventListener('mousemove', this.move);
        this.movingEl = null;
      },

      move(e) {
        let x = parseInt(this.movingEl.style.left.replace('px', '')) || 0;
        let y = parseInt(this.movingEl.style.top.replace('px', '')) || 0;
        this.movingEl.style.left = (x + e.movementX) + 'px';
        this.movingEl.style.top = (y + e.movementY) + 'px';
      },

      submit(id, data) {
        this.close(id, data, 'resolve');
      },

      cancel(id, data) {
        this.close(id, data, 'reject');
      },

      close(id, data=null, respond) {
        let overlay = this.list.find(item => {
          return item.id === id;
        });
        overlay.defer[respond](data);
        let index = this.list.findIndex(item => {
          return item.id === id;
        });
        this.list = this.list.slice(0, index).concat(this.list.slice(index+1));
      }
    }
  });
}