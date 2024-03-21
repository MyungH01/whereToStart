export default function Home({ params }) {
	return (
		<>
			<p>{params.type}</p>
			<p>{params.code}</p>
		</>
	);
}
