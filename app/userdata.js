'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import styles from './userdata.module.css';
import { useEffect, useState } from 'react';
import { setheang, setsang } from '@/lib/fav_reducer';

export default function Userdata({ session }) {
	const { heang, sang } = useAppSelector((state) => state.ufav);
	const [ch, setch] = useState(0);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (session) {
			getheang(dispatch);
			getsang(dispatch);
		}
	}, []);

	return (
		<>
			<div className={styles.userdata}>
				<div className={styles.labels}>
					<div
						className={styles.lable}
						onClick={() => {
							setch(1);
						}}
					>
						행정동
					</div>
					<div
						className={styles.lable}
						onClick={() => {
							setch(2);
						}}
					>
						상권
					</div>
				</div>
				<hr />
				{ch == 1 ? (
					heang.map((item) => (
						<div className={styles.list} key={item.code}>
							{item.name}
						</div>
					))
				) : (
					<></>
				)}
				{ch == 2 ? (
					sang.map((item) => (
						<div className={styles.list} key={item.code}>
							{item.name}
						</div>
					))
				) : (
					<></>
				)}
			</div>
		</>
	);
}
/**
 *
 * @param {InputEvent} e
 * @param {Function} dispatch
 */
function getheang(dispatch) {
	fetch('/api/fav/heang/', {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((data) => {
			dispatch(setheang(data.data));
		});
}
/**
 *
 * @param {InputEvent} e
 * @param {Function} dispatch
 */
function getsang(dispatch) {
	fetch('api/fav/sang', {
		method: 'GET',
	})
		.then((res) => res.json())
		.then((data) => {
			dispatch(setsang(data.data));
		});
}
