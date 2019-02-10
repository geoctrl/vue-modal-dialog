export function ModalDialogComponent(Vue) {
  Vue.component('modalDialog', {
    render(h) {
      return h(
        'div',
        [
          h('modal')
        ]
      )
    },
  });
}