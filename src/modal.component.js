import { modalService } from './modal.service';
import { DeferPromise } from './utils';

export function ModalComponent(Vue) {
  return Vue.component('modal', {
    render(h) {
      return h(
        'div',
        { class: { 'modal-container': true } },
        [
          h(
            'transition-group',
            { props: { name: 'modal-t' } },
            [
              ...this.modalList.map((modal, index) => [
                h(
                  'div',
                  {
                    key: modal.config.uniqueKey,
                    class: {
                      'modal-parent': true
                    },
                    style: { zIndex: index + 1 },
                    on: { click: this.backdropClick },
                  },
                  [
                    h(
                      'div',
                      {
                        class: { modal: true, ...this.modalClasses(modal.config) },
                        on: { click: (e) => e.stopPropagation() },
                      },
                      [
                        h(
                          modal.component,
                          { props: { data: modal.config.data } }
                        )
                      ],
                    )
                  ],
                ),
              ]),
            ],
          ),
          h(
            'transition',
            { props: {  name: 'backdrop-t' } },
            [
              this.modalIndex > -1
                ? h(
                  'div',
                  {
                    class: {
                      'modal-backdrop': true,
                      'modal-backdrop--active': this.modalIndex > -1,
                    },
                    style: {
                      zIndex: this.modalIndex
                    },
                  }
                )
                : null
            ]
          ),
        ],
      )
    },

    mounted() {
      modalService.passComponent(this);
      document.addEventListener('keydown', this.keydownHandler);
    },

    data() {
      return {
        uniqueKey: 0,
        active: false,
        modalList: [],
        modalIndex: -1,
        opening: false
      }
    },

    methods: {
      open(component, config) {
        this.uniqueKey++;
        let defer = new DeferPromise();

        config = Object.assign({
          backdropClose: true,
          size: 'md',
          escapeClose: true,
          type: 'notice',
          uniqueKey: this.uniqueKey.toString(),
        }, config);

        this.add({
          component,
          config,
          defer
        })
        return defer.defer;
      },

      add(modal) {
        this.modalIndex++;
        this.modalList.push(modal);
      },

      close(data, status) {
        let index = this.modalIndex,
            modal = this.modalList[index];
        this.modalIndex--;
        this.modalList.splice(index, 1);
        modal.defer[status ? 'resolve' : 'reject'](data);
      },

      submit(data = null) {
        this.close(data, true);
      },

      cancel(data = null) {
        this.close(data);
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
          'modal--md': config.size === 'md',
          'modal--lg': config.size === 'lg',
          'modal--warning': config.type === 'warning',
          'modal--error': config.type === 'error',
          'modal--success': config.type === 'success'
        }
      }
    }
  });
}