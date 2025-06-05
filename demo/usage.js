import { createApp } from 'vue';
import GmapVue from '../packages/gmap-vue';

const App = {
  data() {
    return {
      markers: [
        { position: { lat: 10, lng: 10 } },
        { position: { lat: 11, lng: 11 } },
      ],
      center: { lat: 10, lng: 10 },
    };
  },
  template: `
    <GmapMap :center="center" :zoom="7" style="width:500px;height:300px">
      <GmapMarker
        v-for="(m, i) in markers"
        :key="i"
        :position="m.position"
        @click="center = m.position"
      />
    </GmapMap>
  `,
};

createApp(App)
  .use(GmapVue, {
    load: {
      key: 'YOUR_API_KEY',
      libraries: 'places',
    },
  })
  .mount('#app');

