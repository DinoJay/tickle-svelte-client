import mapbox from 'mapbox-gl';

// https://docs.mapbox.com/help/glossary/access-token/
mapbox.accessToken = import.meta.VITE_MAPBOX_ACCESS_TOKEN;

const key = Symbol();

export { mapbox, key };