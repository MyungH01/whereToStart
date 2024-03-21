'use client';
import useSWR from 'swr';

export default function Module1({ params }) {
	const fetcher = (...args) => fetch(...args, {}).then((res) => res.json());
	const { data, error, isLoading } = useSWR(`/api/mysql/${params.type}`, fetcher);
	if (error) {
		return <></>;
	}
	if (isLoading) {
		return (
			<div className={styles.main}>
				<div className={styles.ground}></div>
				<div className={styles.count}></div>
			</div>
		);
	}
	const batting_data = data.batting;

	if (batting_data.find((data) => data.direction == 'B')) {
		if (batting_data.find((data) => data.direction == '2')) {
			batting_data[batting_data.findIndex((data) => data.direction == '2')].count += batting_data.find((data) => data.direction == 'B').count;
		}
		if (!batting_data.find((data) => data.direction == '2')) {
			batting_data.push({ direction: '2', count: batting_data.find((data) => data.direction == 'B').count });
		}
		batting_data.splice(
			batting_data.findIndex((data) => data.direction == 'B'),
			1
		);
	}

	const total_counts = batting_data
		.map((data) => data.count)
		.reduce((accumulator, currentValue) => {
			return accumulator + currentValue;
		}, 0);
	const counts = batting_data.map((data) => ({ [data.direction]: data.count }));

	return <></>;
}

// export default function Home({ params }) {
// 	return (
// 		<>
// 			<p>{params.type}</p>
// 			<p>{params.code}</p>
// 		</>
// 	);
// }
