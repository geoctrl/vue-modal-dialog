# Vue Modal (+ Dialog) Module

At only 3kb gzipped, `vue-modal-dialog` is a small but powerful modal system. Use it for:

- Warnings
- Error messages
- Success messages
- Confirmations
- Application features
- Cat videos
- Overlay all the things

## v0.3.0 Update

- No dependencies (removed rxjs and velocityJS)
- updated dev dependencies
- completely revamped and simplified modal system using vue animations
- rewrote vue templates into render functions (ready for consumption for non-esm projects)
- (breaking) renamed `ModalService` to `modalService`
- (breaking) renamed `DialogService` to `dialogService`

## Install

`Vue` is a peer dependency, so let's install that too: 

```shell
# NPM
$ npm install vue vue-modal-dialog

# Yarn
$ yarn add vue vue-modal-dialog
```

import it and `use` it in your Vue application. Also, add the component `<modal-dialog></modal-dialog>` to your template.
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
  <modal-dialog></modal-dialog>
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

This module exposes a `modalService`, which allows you to call modals from anywhere in your application.

### .open(Component[, config])

Open up a new modal by passing in a Vue Component. Returns a deferred promise.

```js
modalService.open(DoThingsComponent).then(
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
import { modalService } from 'VueModalDialog';

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
      modalService.submit(); // resolve .open() promise
    },
    cancel() {
      modalService.cancel(); // reject .open() promise
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
dialogService.notice('This is a generic message.');
dialogService.warning('This is a warning message.');
dialogService.error('This is an error message.');
dialogService.success('This is a success message.');
```

**dialogConfig options**

Name | Description | Default | Options
--- | --- | --- | ---
title | Change the modal title | `[type]` | str
submitText | Change the modal submit text or set as `false` to hide | `Submit` | str or `false`
cancelText | Change the modal cancel text or set as `false` to hide  | `Cancel` | str or `false`

**modalConfig options**

Same as `modalService.open()` config. See above for details.

## Stacked Modals

This module allows you to stack modals on top of each other. This gives you the option of creating large application
features (like upload modals, settings modals, etc) and still have a confirmation modal stacked on top.

To do this, inside of a modal component, just create a new modal - which will take focus.

```js
// Example of a modal component opening a new modal on top of it on submit()

import Vue from 'vue';
import { modalService } from 'VueModalDialog';

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
      modalService.open(AnotherModalComponent).then(
        submit => {
          modalService.submit(submit); // resolve .open() promise          
        }  
      );
      // or you can create a confirmation dialog
      dialogService.warning('Are you sure you want to delete this?', {
        submitText: 'Delete',
        backdropClose: false,
        escapeClose: false
      }).then(
        submit => modalService.submit(submit) 
      );
    },
    cancel() {
      modalService.cancel(); // reject .open() promise
    },
  }
});
```
