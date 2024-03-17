import Map from './map';
import Search from './search';
import StoreProvider from './StoreProvider';

export default function Home() {
	return (
		<>
			<StoreProvider>
				<Map />
				<Search />
			</StoreProvider>
		</>
	);
}
