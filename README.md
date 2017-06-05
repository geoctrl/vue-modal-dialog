# Vue Modal (+ Dialog) Module

A small but powerful modal system. Use it for:

- Warnings
- Error messages
- Success messages
- Confirmations
- Application features
- Cat videos
- Anything you want to do overlaying your application

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

```scss
@import "~vue-modal-dialog/src/modal";
```

**NOTE:** I'm using webpack to pull my .scss files into my application - the tilda is a shortcut to get to the
`node_modules` directory. See the roadmap below for more styling solutions coming.

## Modal Service

This module exposes a `ModalService`, which allows you to call modals from anywhere in your application. It's basically an instantiated function, using es6 modules to import it anywhere you need it.

### .open(Component[, config])

Open up a new modal by passing in a Vue Component. Returns a deferred promise.

```js
ModalService.open(DoThingsComponent).then(
    modalSubmit => {},
    modalCancel => {}
).catch(
    err => {}
);
```

Optional config options:

Name | Description | Default | Options
--- | --- | --- | ---
backdropClose | Close Modal by clicking backdrop | `true` | boolean
escapeClose | Close Modal by pressing escape | `true` | boolean
size | Choose Modal size | md | `md`, `lg`
type | Extra Modal styles | none | `success`, `warning`, `error`


### .submit([data]), .cancel([data])

`.submit()` and `.cancel()` are essentially the same method. They both pass data back to the promise, animate the modal out, and remove the inner component. The only difference is how the original `.open` promise gets resolved.

`.submit()` resolves the promise, and `.cancel()` rejects it.

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
      ModalService.submit(); // resolve .open() promise
    },
    cancel() {
      ModalService.cancel(); // reject .open() promise
    },
  }
});
```

## DialogService

The Dialog Service helps create common modals without the need of passing in a component.

It's meant to help you create simple confirmations, warnings, success and error messages quickly.

### .notice(message[, dialogConfig, modalConfig])

**Types:** `.notice()`, `.warning()`, `.error()`, `.success()`.

All four methods do the same thing, except they change the modal `type` to add some extra styling. The `.notice()`
method doesn't add any styling.

```js
DialogService.notice('This is a generic message.');
DialogService.warning('This is a warning message.');
DialogService.error('This is an error message.');
DialogService.success('This is a success message.');
```

**dialogConfig options**

Name | Description | Default | Options
--- | --- | --- | ---
title | Change the modal title | `[type]` | str
submitText | Change the modal submit text or set as `false` to hide | `Submit` | str or `false`
cancelText | Change the modal cancel text or set as `false` to hide  | `Cancel` | str or `false`

**modalConfig options**

Same as `ModalService.open()` config. See above for details.

## Stacked Modals

This module allows you to stack modals on top of each other. This gives you the option of creating large application
features (like upload modals, settings modals, etc) and still have a confirmation modal stacked on top.

To do this, inside of a modal component, just create a new modal - which will take focus.

```js
// Example of a modal component opening a new modal on top of it on submit()

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
      // you can create a custom modal - passing in a component
      ModalService.open(AnotherModalComponent).then(
        submit => {
          ModalService.submit(submit); // resolve .open() promise          
        }  
      );
      // or you can create a confirmation dialog
      DialogService.warning('Are you sure you want to delete this?', {
        submitText: 'Delete',
        backdropClose: false,
        escapeClose: false
      }).then(
        submit => ModalService.submit(submit) 
      );
    },
    cancel() {
      ModalService.cancel(); // reject .open() promise
    },
  }
});
```
