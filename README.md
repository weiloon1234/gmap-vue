# GmapVue

[![npm version](https://badge.fury.io/js/gmap-vue.svg)](https://badge.fury.io/js/gmap-vue)
[![Build Status](https://travis-ci.org/diegoazh/gmap-vue.svg?branch=master)](https://travis-ci.org/diegoazh/gmap-vue)
[![Publish](https://github.com/diegoazh/gmap-vue/workflows/publish/badge.svg)](https://github.com/diegoazh/gmap-vue/actions?query=workflow%3Apublish)
[![Documentation](https://github.com/diegoazh/gmap-vue/workflows/documentation/badge.svg)](https://github.com/diegoazh/gmap-vue/actions?query=workflow%3Adocumentation)
[![](https://data.jsdelivr.com/v1/package/npm/gmap-vue/badge)](https://www.jsdelivr.com/package/npm/gmap-vue)

GmapVue is a Vue 3 wrapper for Google Maps. The project continues where
`vue2-google-maps` left off and is maintained by the community.

## Installation

```sh
npm install gmap-vue
```

## Usage

Register the plugin and create a simple map:

```js
import { createApp } from 'vue'
import App from './App.vue'
import GmapVue from 'gmap-vue'

const app = createApp(App)
app.use(GmapVue, {
  load: {
    key: 'YOUR_API_TOKEN',
    libraries: 'places',
  },
})

app.mount('#app')
```

```vue
<template>
  <GmapMap
    :center="{ lat: 10, lng: 10 }"
    :zoom="7"
    style="width: 500px; height: 300px"
  >
    <GmapMarker :position="{ lat: 10, lng: 10 }" />
  </GmapMap>
</template>
```

See [demo/usage.js](demo/usage.js) for a more complete example.

## Documentation

Full documentation and live examples are available at
[diegoazh.github.io/gmap-vue](https://diegoazh.github.io/gmap-vue/).

## Contributing

Contributions are welcome! Please read the
[contributing guide](https://github.com/diegoazh/gmap-vue/blob/master/CONTRIBUTING.md)
before opening a pull request.

This project uses [Lerna](https://github.com/lerna/lerna) to manage multiple
packages.

## License

GmapVue is released under the MIT License.

---

You can find a more detailed README for the plugin at
[packages/gmap-vue/README.md](https://github.com/diegoazh/gmap-vue/blob/master/packages/gmap-vue/README.md).
