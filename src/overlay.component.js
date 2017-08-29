import { OverlayService } from './overlay.service';

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
              @mousedown="startMove($event, key)"
              @mouseup="stopMove($event)"><div></div></div>
    </div>
</div>`,

    mounted() {
      OverlayService.passComponent(this);
    },

    data() {
      return {
        list: [],
        minWidth: 300,
      }
    },

    methods: {
      open(component, id, config={}) {
        this.list.push({
          id,
          component,
          minWidth: config.minWidth || 400,
          movable: !!config.movable,
          sizable: !!config.sizable
        });
      },

      startMove(e, key) {
        this.movingEl = this.$refs.overlay[key].$el;
        document.addEventListener('mousemove', this.move);
      },

      stopMove(e) {
        document.removeEventListener('mousemove', this.move);
        this.movingEl = null;
      },

      move(e) {
        let x = parseInt(this.movingEl.style.left.replace('px', '')) || 0;
        let y = parseInt(this.movingEl.style.top.replace('px', '')) || 0;

        this.movingEl.style.left = (x + e.movementX) + 'px';
        this.movingEl.style.top = (y + e.movementY) + 'px';
      }
    }
  });
}