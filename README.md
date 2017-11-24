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
import VCA, { addComponent } from 'vue-component-anywhere'
Vue.use(VCA)
# or passing onLoadEventName if you are using Rails turbolinks
Vue.use(VCA, {onLoadEventName: 'turbolinks:load'})

import Catalog from './catalog'
addComponent('catalog', Catalog);
```

From Vue component(catalog.vue):

```js
<template>
  <div :class="$htmlClass">
    <h3>Catalogs Example</h3>
    <b>URL: {{$htmlAttributes['url']}}</b>
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
  rel="vue" role="catalog"
  @change="showChange"
  class="mystyle"
  name="catalog_id"
  url="http://localhost:3000/catalogs"
/>
<script src="/packs/components-92219426ec74afb4a5c3.js"></script>
<link rel="stylesheet" media="screen" href="/packs/components-4461095acd9ae576e8d9249c6800a509.css" />
<script language="javascript">
  function showChange(v) {
    console.log(`catalog changes to ${v}`);
  }
</script>
```
