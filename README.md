# Vue Modal (+ Dialog) Plugin

A small but powerful modal system. Use it for:

- Warnings
- Error messages
- Success messages
- Confirmations
- Overlaying application features
- Cat videos
- Anything you want to do on top of your application

## Install

```shell
$ install vue-modal-dialog
```

import it and `use` it in your Vue(2) application. Also, add the component `<modal></modal>` to your template.
This will be the modal output.

```js
import Vue from 'vue';
import { VueModalDialog } from 'vue-modal-dialog';

Vue.use('VueModalDialog');

new Vue({
  el: '#app',
  template: `
<div>
  <app-stuff></app-stuff>
  <modal></modal>
</div>`
});
```

Lastly, import the .scss file into your styles:

```sass
@import "~vue-modal-dialog/src/modal";
```

**NOTE:** I'm using webpack to pull my .scss files into my application - the tilda is a shortcut to get to the
`node_modules` directory. See the roadmap below for more styling solutions coming.

## Open a new Modal

This plugin consumes components. So all you need to do is pass in a component into the `ModalService.open` method:

```js
// Home Page

import Vue from 'vue';
import { ModalService } from 'VueModalDialog';
import { DoThingsComponent } from 'do-things.component';

Vue.component('HomePage', {
  template: `<div><button v-on:click="openModal()">Open Modal</button></div>`,
  methods: {
    openModal() {
      ModalService.open(DoThingsComponent); // here
    }
  }
});

```

That's it. The modal service passes in the component and renders it in a new modal. The `.open` method returns
a deferred promise, allowing you to do something on `submit` (success) or `cancel` (error). Neither of these are
required.

```js
ModalService.open(DoThingsComponent).then(
  submit => {}, // on submit
  cancel => {}  // on cancel
);
```

## Inside the rendered component

Import the `ModalService` and call `.submit` or `.cancel` on user interaction. You don't have to follow any guideline
here. Just understand that the submit is the `success` callback, and the cancel is the `error` callback.

```js
// DoThingsComponent gets rendered in a modal

import Vue from 'vue';
import { ModalService } from 'VueModalDialog';

export const DoThingsComponent = Vue.component('doThings', {
  template:
`<div>
    <div class="modal__header">Work!</div>
    <div class="modal__body">Doing some work here</div>
    <div class="modal__footer">
      <button v-on:click="submit()">Submit</button>
      <button v-on:click="cancel()">Cancel</button>
    </div>
</div>`,
  methods: {
    submit() {
      ModalService.submit();
    },
    cancel() {
      ModalService.cancel();
    },
  }
});
```

more docs coming
