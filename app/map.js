'use client';
import maplibregl from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';
import styles from './map.module.css';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setlat, setlng, setzoom } from '@/lib/geo_reducer';

export default function Map() {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [apiKey] = useState(process.env.NEXT_PUBLIC_API_KEY);
	const { lng, lat, zoom } = useAppSelector((state) => state.geo);
	const { curheang, cursang } = useAppSelector((state) => state.cur);
	const dispatch = useAppDispatch();

	const mapName = process.env.NEXT_PUBLIC_MAP_NAME;
	const region = process.env.NEXT_PUBLIC_REGION;
	const heang_boundary = require('/public/heang.json');
	const heang_point = require('/public/heangpoint.json');
	const sang_point = require('/public/sangpoint.json');
	const boundary = [
		[126.759751, 37.428234],
		[127.190599, 37.703801],
	];

	useEffect(() => {
		if (map.current) return;
		map.current = new maplibregl.Map({
			container: mapContainer.current,
			style: `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`,
			center: [lng, lat],
			zoom: zoom,
			attributionControl: false,
			maxBounds: boundary,
		});
		map.current.addControl(new maplibregl.NavigationControl(), 'bottom-left');

		map.current.on('load', async () => {
			const image = await map.current.loadImage('https://maplibre.org/maplibre-gl-js/docs/assets/custom_marker.png');
			map.current.addImage('custom-marker', image.data, {});
			map.current.addImage('custom-marker2', image.data, {
				sdf: 'true',
			});
			map.current.addSource('heang_boundary', { type: 'geojson', data: heang_boundary });
			map.current.addSource('heang_point', { type: 'geojson', data: heang_point });
			map.current.addSource('sang_point', { type: 'geojson', data: sang_point });
			map.current.addSource('highlight', { type: 'geojson', data: {} });
			map.current.addLayer({
				id: 'heang_boundary_fill',
				type: 'fill',
				source: 'heang_boundary',
				paint: {
					'fill-color': '#95BEFA',
					'fill-opacity': 0.3,
					'fill-outline-color': '#000000',
				},
				filter: ['==', '$type', 'Polygon'],
			});
			map.current.addLayer({
				id: 'highlight_fill',
				type: 'fill',
				source: 'highlight',
				paint: {
					'fill-color': '#FFFB00',
					'fill-opacity': 0.3,
					'fill-outline-color': '#74FF00',
				},
				filter: ['==', '$type', 'Polygon'],
			});
			map.current.addLayer({
				id: 'heang_point_icon',
				type: 'symbol',
				source: 'heang_point',
				filter: ['==', '$type', 'Point'],
				layout: {
					'icon-image': 'custom-marker',
				},
			});
			map.current.addLayer({
				id: 'sang_point_icon',
				type: 'symbol',
				source: 'sang_point',
				filter: ['==', '$type', 'Point'],
				minzoom: 12,
				layout: {
					'icon-image': 'custom-marker2',
					'icon-size': 0.7,
				},
				paint: {
					'icon-color': '#958EFA',
				},
			});

			map.current.on('moveend', () => {
				const { lat: newlat, lng: newlng } = map.current.getCenter();
				dispatch(setlat(newlat.toFixed(6)));
				dispatch(setlng(newlng.toFixed(6)));
			});
			map.current.on('zoomend', () => {
				const newzoom = map.current.getZoom();
				dispatch(setzoom(newzoom));
			});
			map.current.on('click', 'heang_point_icon', (e) => {
				const pophtml = `
					<div class='pop'>
						<div class='name'>
							<label class='label'>${e.features[0].properties.adm_nm}</label>
							<div>
								<button id='favadd'>추가</button>
								<button id='favdel'>제거</button>
							</div>
						</div>
						<div class='items'>
							<div class='item'>소속된 총 점포 수</div>
							<div class='item'>소속된 상권의 총 매출</div>
							<div class='item'>소속된 상권의 평균 매출</div>
							<div class='item'>가장 점포가 많은 업종</div>
							<div class='item'>가장 매출이 높은 업종</div>
						</div>
					</div>
				`;
				new maplibregl.Popup().setLngLat(e.features[0].geometry.coordinates).setHTML(pophtml).addTo(map.current).setMaxWidth('100vw');

				map.current.flyTo({
					// center: [e.features[0].geometry.coordinates[0], e.features[0].geometry.coordinates[1] + 0.002],
					center: e.features[0].geometry.coordinates,
					zoom: 14,
					speed: 1.5,
					easing(t) {
						return t;
					},
				});
				dispatch({ type: 'cur/setcurheang', code: e.features[0].properties.adm_cd2, name: e.features[0].properties.adm_nm });
				dispatch({ type: 'cur/setcursang', code: 0, name: '' });
			});
			map.current.on('mouseenter', 'heang_point_icon', () => {
				map.current.getCanvas().style.cursor = 'pointer';
			});
			map.current.on('mouseleave', 'heang_point_icon', () => {
				map.current.getCanvas().style.cursor = '';
			});
			map.current.on('click', 'sang_point_icon', (e) => {
				const pophtml = `
					<div class='pop'>
						<div class='name'>
							<label class='label'>${e.features[0].properties.cd_nm}</label>
							<div>
								<button id='favadd'>추가</button>
								<button id='favdel'>제거</button>
							</div>
						</div>
						<div class='items'>
							<div class='item'>소속된 총 점포 수</div>
							<div class='item'>소속된 상권의 총 매출</div>
							<div class='item'>소속된 상권의 평균 매출</div>
							<div class='item'>가장 점포가 많은 업종</div>
							<div class='item'>가장 매출이 높은 업종</div>
						</div>
					</div>
				`;
				new maplibregl.Popup().setLngLat(e.features[0].geometry.coordinates).setHTML(pophtml).addTo(map.current).setMaxWidth('100vw');

				map.current.flyTo({
					center: e.features[0].geometry.coordinates,
					zoom: 15,
					speed: 1.5,
					easing(t) {
						return t;
					},
				});
				dispatch({ type: 'cur/setcurheang', code: e.features[0].properties.ab_cd, name: e.features[0].properties.ab_nm });
				dispatch({ type: 'cur/setcursang', code: e.features[0].properties.cd_cd, name: e.features[0].properties.cd_nm });
			});
			map.current.on('mouseenter', 'sang_point_icon', () => {
				map.current.getCanvas().style.cursor = 'pointer';
			});
			map.current.on('mouseleave', 'sang_point_icon', () => {
				map.current.getCanvas().style.cursor = '';
			});
		});
	}, []);

	useEffect(() => {
		map.current.flyTo({
			center: [lng, lat],
			zoom: zoom,
			speed: 1.5,
			easing(t) {
				return t;
			},
		});
	}, [lng, lat]);

	useEffect(() => {
		if (curheang.code != 0 || cursang.code != 0) {
			document.getElementById('favadd').addEventListener('click', function () {
				alert('tlqkf');
			});
			document.getElementById('favdel').addEventListener('click', function () {
				alert('tlqkf');
			});
			// 	const pophtml = `
			// 	<div class='pop'>
			// 		<div class='name'>
			// 			<label class='label'>${curheang.name}${cursang.code != 0 ? '(' + cursang.name + ')' : ''}</label>
			// 			<div>
			// 				<button id='favadd'>추가</button>
			// 				<button id='favdel'>제거</button>
			// 			</div>
			// 		</div>
			// 		<div class='items'>
			// 			<div class='item'>소속된 총 점포 수</div>
			// 			<div class='item'>소속된 상권의 총 매출</div>
			// 			<div class='item'>소속된 상권의 평균 매출</div>
			// 			<div class='item'>가장 점포가 많은 업종</div>
			// 			<div class='item'>가장 매출이 높은 업종</div>
			// 		</div>
			// 	</div>
			// `;
			// 	new maplibregl.Popup().setLngLat([lng, lat]).setHTML(pophtml).addTo(map.current).setMaxWidth('100vw');
		}
	}, [curheang, cursang]);

	return (
		<>
			<div ref={mapContainer} className={styles.mapWrap}></div>
			<div>
				<div>{curheang.code}</div>
				<div>{curheang.name}</div>
				<div>{cursang.code}</div>
				<div>{cursang.name}</div>
			</div>
		</>
	);
}
