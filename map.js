mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0c2lhcnluYWFkemluZXRzIiwiYSI6ImNrdWcwMHFzYjByazUycG52M3ZiNDB0NTEifQ.k1GhGNAPRkYvLny7GsW0tQ'

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/katsiarynaadzinets/ckugrssah3g9d18k6tay2q6mz',
  center: [2.3363, 48.8609],
  zoom: 16
});
map.addControl(new mapboxgl.NavigationControl());