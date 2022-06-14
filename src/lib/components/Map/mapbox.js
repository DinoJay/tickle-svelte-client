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

// TODO
export const getLowerCenterMap = ({ map, longitude: oldLong, latitude: oldLat }) => {
	// const vp = getViewport(map);

	// const { height } = vp;

	const { x, y } = map.project([oldLong, oldLat]);

	const { lng: longitude, lat: latitude } = map.unproject([x, y]);

	// const { lng: longitude, lat: latitude } = map.unproject([x, y - height / 8]);

	console.log('x', x, 'y', y);
	console.log('lng', longitude, 'lat', latitude);
	// return { longitude, latitude };
};
