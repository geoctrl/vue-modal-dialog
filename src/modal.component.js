import { ModalService } from './modal.service';

export function ModalComponent(Vue) {
  Vue.component('modal', {
    template: `
<div class="modal-container">
    <div class="modal-parent"
         v-for="(modal, index) in modalList"
         :style="{zIndex: index+1}"
         @click="backdropClick()">

        <div class="modal"
             ref="modals"
             @click.stop
             :class="modalClasses(modal.config)">
            <container :is="modal.component"
                       :data="modal.config.data">
            </container>        
        </div>
    </div>
    <div class="modal-backdrop" ref="backdrop" :style="{zIndex: modalIndex}"></div>
</div>`,

    mounted() {
      ModalService.passComponent(this);
      document.addEventListener('keydown', this.keydownHandler);

    },

    data() {
      return {
        active: false,
        modalList: [],
        modalIndex: -1,
        modalQueue: [],
        opening: false
      }
    },

    methods: {
      open(component, config) {

        let defer = new ModalPromise();
        // let defer = deferObservable();

        config = Object.assign({
          backdropClose: true,
          size: 'md',
          escapeClose: true,
          type: 'notice'
        }, config);

        if (!this.active && this.modalList.length) {
          this.modalQueue.push({
            component,
            config,
            defer
          });
        } else {
          this.add({
            component,
            config,
            defer
          })
        }
        return defer.defer;
      },
      add(modal) {
        this.modalIndex++;
        this.modalList.push(modal);

        let index = this.modalList.length - 1;

        if (!this.active) {
          this.opening = true;
          this.activate();
        }
        this.animateModalIn(index);
      },

      close(status, data) {
        let index = this.modalIndex,
            modal = this.modalList[index];
        this.modalIndex--;

        setTimeout(() => {
          modal.defer[status ? 'resolve' : 'reject'](data);
        }, index*100);

        this.animateModalOut(index, () => {
          this.modalList = this.modalList.slice(0, index).concat(this.modalList.slice(index+1));
          if (!this.modalList.length && this.modalQueue.length) {
            this.add(this.modalQueue[0]);
            this.modalQueue = [];
          }
        });

        if (this.modalIndex === -1) {
          if (this.modalQueue.length) {
            this.add(this.modalQueue[0]);
            this.modalQueue = [];
          } else {
            this.deactivate();
          }
        }
      }
      ,
      submit(data=null) {
        this.close(true, data);
      },
      cancel(data=null) {
        this.close(false, data);
      },
      animateModalIn(nextModalIndex) {
        // the timeout gives time for the $refs to propagate
        setTimeout(() => {
          let el = this.$refs.modals[nextModalIndex];
          el.classList.add('modal--active');
        }, 100);
        // after modal finishes opening
        if (this.opening) {
          setTimeout(() => {
            this.opening = false;
          }, 300);
        }
      },
      animateModalOut(outModalIndex, cb) {
        let el = this.$refs.modals[outModalIndex];
        el.classList.remove('modal--active');
        setTimeout(cb, 300)
      },
      activate() {
        document.body.classList.add('modal--active');
        this.$refs.backdrop.style.display = 'block';
        setTimeout(() => {
          this.$refs.backdrop.classList.add('active');
        }, 10);
        this.active = true;
      },
      deactivate() {
        this.$refs.backdrop.classList.remove('active');
        setTimeout(() => {
          document.body.classList.remove('modal--active');
          this.$refs.backdrop.style.display = 'none';
        }, 300);
        this.active = false;
      },
      backdropClick() {
        if (this.modalIndex >= 0 &&
            this.modalList[this.modalIndex].config.backdropClose &&
            this.opening === false) {
          this.cancel();
        }
      },
      keydownHandler(event) {
        if (event.key === 'Escape' &&
            this.modalIndex >= 0 &&
            this.modalList[this.modalIndex].config.escapeClose){
          this.cancel();
        }
      },

      modalClasses(config) {
        return {
          'modal--md': config.size==='md',
          'modal--lg': config.size==='lg',
          'modal--warning': config.type==='warning',
          'modal--error': config.type==='error',
          'modal--success': config.type==='success'
        }
      }
    }
  });
}

function ModalPromise() {
  let self = this;
  this.resCb = null;
  this.errCb = null;
  this.catchCb = null;

  this.resolve = data => {
    if (this.resCb) this.resCb(data);
  };

  this.reject = data => {
    if (this.errCb) this.errCb(data);
  };

  this.err = data => {
    if (this.catchCb) this.catchCb(data);
  };

  this.defer = {
    then(res=null, err=null) {
      self.resCb = res;
      self.errCb = err;
      return this;
    },
    catch(err=null) {
      self.catchCb = err;
    }
  };
}