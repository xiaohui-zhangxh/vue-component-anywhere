# vue-component-anywhere

Mount Vue Component from anywhere, suppurt event messaging.

From Rails 5, we can run Vue with it, with this feature we can write our useful 
small components for Rails views. But there is not easy to use many small Vue 
components, you have to write javascript to mount it to a certain HTML dom, and
not easy to catch events from normal HTML to Vue component.

This plugin helps you use component easily from HTML, catch Vue event from HTML.

## Install

    npm add vue-component-anywhere

## Usage

From Vue side(components.js):

```js
import Vue from 'vue'
import VCA from 'vue-component-anywhere'
Vue.use(VCA)
# or passing onLoadEventName if you are using Rails turbolinks
Vue.use(VCA, {onLoadEventName: 'turbolinks:load'})

import Hello from './hello'
VCA.add('hello', Hello);

```

From Vue component(hello.vue):

```js
<template>
  <div :class="$htmlClass">
    <h3>Hello Example</h3>
    <b>User Name: {{$htmlAttributes['username']}}</b>
  </div>
</template>
...
mounted () {
  console.log('Attributes from HTML:', this.$htmlAttributes)
  setTimeout(() => this.$fireHTMLEvent('change', 'new value'), 2000)
}
...
```

From HTML side(mypage.html):

```html
<div
  rel="vca" role="catalog"
  @change="showChange"
  class="mystyle"
  username="xiaohui"
></div>
<script src="/packs/components-92219426ec74afb4a5c3.js"></script>
<link rel="stylesheet" media="screen" href="/packs/components-4461095acd9ae576e8d9249c6800a509.css" />
<script language="javascript">
  function showChange(v) {
    console.log(`name changes to ${v}`);
  }
</script>
```

VCA will automatically search DOMs which rel="vca", then mount Vue component which name is defined from role `hello` when page is loaded.

## References

- Required HTML DOM tags
  - `rel="vca"` => declare this is an Vue Component Anywhere element
  - `role`      => the name of component which added by `VCA.add('hello', Hello)`
- Added Computed attributes:
  - `$htmlAttributes` => all attributes from HTML DOM
  - `$htmlClass`      => class name of HTML DOM
  - `$htmlName`       => attribute name of HTML DOM
- Added Methods:
  - `$fireHTMLEvent`  => fire event to HTML


