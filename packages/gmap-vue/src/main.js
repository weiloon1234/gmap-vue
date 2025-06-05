import loadGmapApi from './manager/initializer';
import promiseLazyFactory from './factories/promise-lazy';

import KmlLayer from './components/kml-layer';
import HeatmapLayer from './components/heatmap-layer';
import Marker from './components/marker';
import Polyline from './components/polyline';
import Polygon from './components/polygon';
import Circle from './components/circle';
import Rectangle from './components/rectangle';
import DrawingManager from './components/drawing-manager.vue';
import createEventBus from './utils/event-bus';

// Vue component imports
import InfoWindow from './components/info-window.vue';
import Map from './components/map.vue';
import StreetViewPanorama from './components/street-view-panorama.vue';
import PlaceInput from './components/place-input.vue';
import Autocomplete from './components/autocomplete.vue';

import MapElementMixin from './mixins/map-element';
import MapElementFactory from './factories/map-element';
import MountableMixin from './mixins/mountable';

// HACK: Cluster should be loaded conditionally
// However in the web version, it's not possible to write
// `import 'vue2-google-maps/src/components/cluster'`, so we need to
// import it anyway (but we don't have to register it)
// Therefore we use babel-plugin-transform-inline-environment-variables to
// set BUILD_DEV to truthy / falsy
const Cluster =
  process.env.BUILD_DEV === '1'
    ? undefined
    : ((s) => s.default || s)(require('./components/cluster'));

// TODO: This should be checked if it must be GmapVue, Gmap.api or something else
let GmapApi = null;

// export everything
export {
  loadGmapApi,
  HeatmapLayer,
  KmlLayer,
  Marker,
  Polyline,
  Polygon,
  Circle,
  Cluster,
  Rectangle,
  DrawingManager,
  InfoWindow,
  Map,
  PlaceInput,
  MapElementMixin,
  MapElementFactory,
  Autocomplete,
  MountableMixin,
  StreetViewPanorama,
};

export function install(app, options) {
  // Set defaults
  // TODO: All disabled eslint rules should be analyzed
  // eslint-disable-next-line no-param-reassign -- this should be analyzed;
  options = {
    installComponents: true,
    autobindAllEvents: false,
    ...options,
  };

  // Update the global `GmapApi`. This will allow
  // components to use the `google` global reactively
  // via:
  //   import { gmapApi } from 'gmap-vue'
  //   export default {  computed: { google: gmapApi }  }
  GmapApi = { gmapApi: null };

  const defaultResizeBus = createEventBus();

  // Use a lazy to only load the API when
  // a VGM component is loaded
  const promiseLazyCreator = promiseLazyFactory(loadGmapApi, GmapApi);
  const gmapApiPromiseLazy = promiseLazyCreator(options);

  app.config.globalProperties.$gmapDefaultResizeBus = defaultResizeBus;
  app.config.globalProperties.$gmapOptions = options;
  app.config.globalProperties.$gmapApiPromiseLazy = gmapApiPromiseLazy;

  if (options.installComponents) {
    app.component('GmapMap', Map);
    app.component('GmapMarker', Marker);
    app.component('GmapInfoWindow', InfoWindow);
    app.component('GmapHeatmapLayer', HeatmapLayer);
    app.component('GmapKmlLayer', KmlLayer);
    app.component('GmapPolyline', Polyline);
    app.component('GmapPolygon', Polygon);
    app.component('GmapCircle', Circle);
    app.component('GmapRectangle', Rectangle);
    app.component('GmapDrawingManager', DrawingManager);
    app.component('GmapAutocomplete', Autocomplete);
    app.component('GmapPlaceInput', PlaceInput);
    app.component('GmapStreetViewPanorama', StreetViewPanorama);
  }
}

export function gmapApi() {
  return GmapApi.gmapApi && window.google;
}
