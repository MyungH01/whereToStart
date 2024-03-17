'use client';
import maplibregl, { Popup } from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';
import styles from './map.module.css';
// import { headers } from 'next/headers';

export default function Map() {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [apiKey] = useState(
		'v1.public.eyJqdGkiOiI0NjVjNGQzMC00MmNjLTQyMjItYmZlOC03Y2JlODI0N2IyZDEifU3MG4LZbMkFqOZ35LCUgdvvrj0s9m0nRmeRDczkFW7Wg8FOqu00fqQgxHVGAQ17BJSHCAbSKEAOESZNVKhjtCUefXQ_bTpOf5WMqGP2puVvuErKrflSRlfNUn-YZRmAJx8ZoE08wcELDeIHGfOJtMKvG4PjjAO5pRMFEu4BrKPZCDgD6pMrN4RVAdK_trZP3Z1vMnPVbWnVABzjTKoorSnGT3qvse0lo2PPk9_5MaQFhIZyybKx0970qUTmmnJxlai60eFi9DAxQfMqMuCmWZJ_C0zuYfOSJrw7E5T8BHwLbXojXT34bcARcVP5dNWjndPppTgIfSz6hmBvROGov_c.YTAwN2QzYTQtMjA4OC00M2Q5LWE5ZTUtYjk4Y2U1YWUxY2Uy'
	);
	const [lng, setlng] = useState(127.0501);
	const [lat, setlat] = useState(37.653);
	const [zoom, setzoom] = useState(17);
	const mapName = 'P3Map1';
	const region = 'ap-northeast-1';

	useEffect(() => {
		if (map.current) return;
		map.current = new maplibregl.Map({
			container: mapContainer.current,
			style: `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`,
			center: [lng, lat],
			zoom: zoom,
			attributionControl: false,
		});
		map.current.addControl(new maplibregl.NavigationControl(), 'bottom-left');
	}, []);

	return (
		<>
			<div ref={mapContainer} className={styles.mapWrap}></div>
			<div>
				<p>{lng}</p>
				<p>{lat}</p>
				<p>{zoom}</p>
			</div>
		</>
	);
}
