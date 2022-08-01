import mapbox from 'mapbox-gl';

// https://docs.mapbox.com/help/glossary/access-token/
mapbox.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const key = Symbol();

export { mapbox, key };

export const getViewport = (m) => {
	const { lng, lat } = m.getCenter();
	return {
		zoom: +m.getZoom(),
		longitude: +lng,
		latitude: +lat,
		width: m.getCanvas().width,
		height: m.getCanvas().height
	};
};
