'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import styles from './userdata.module.css';
import { useEffect, useState } from 'react';
import { setchanged, setheang, setsang, setwhich } from '@/lib/fav_reducer';
import { setlat, setlng, setzoom } from '@/lib/geo_reducer';

export default function Userdata({ session }) {
	const { heang, sang, which, changed } = useAppSelector((state) => state.ufav);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (session) {
			getheang(dispatch);
			getsang(dispatch);
			dispatch(setchanged(false));
		}
	}, [changed]);

	return (
		<>
			<div className={styles.userdata}>
				<div className={styles.labels}>
					<div
						className={styles.lable}
						onClick={() => {
							dispatch(setwhich(1));
						}}
						style={{ fontWeight: which == 1 ? 600 : 400 }}
					>
						행정동
					</div>
					<div
						className={styles.lable}
						onClick={() => {
							dispatch(setwhich(2));
						}}
						style={{ fontWeight: which == 2 ? 600 : 400 }}
					>
						상권
					</div>
				</div>
				<hr />
				{which == 1 ? (
					heang.map((item) => (
						<div
							className={styles.list}
							key={item.code}
							onClick={(e) => {
								dispatch(setlat(item.lat));
								dispatch(setlng(item.lng));
								dispatch(setzoom(15));
								dispatch({
									type: 'cur/setcurheang',
									code: item.code,
									name: item.name,
									sum_cm_sa: item.sum_cm_sa,
									sum_total_ns: item.sum_total_ns,
									ratio_cm_sa_ns: item.ratio_cm_sa_ns,
									max_total_ns_st_nm: item.max_total_ns_st_nm,
									max_cm_sa_st_nm: item.max_cm_sa_st_nm,
								});
								dispatch({
									type: 'cur/setcursang',
									code: 0,
									name: '',
									sum_cm_sa: 0,
									sum_total_ns: 0,
									ratio_cm_sa_ns: 0,
									max_total_ns_st_nm: '',
									max_cm_sa_st_nm: '',
								});
							}}
						>
							{item.name}
						</div>
					))
				) : (
					<></>
				)}
				{which == 2 ? (
					sang.map((item) => (
						<div
							className={styles.list}
							key={item.code}
							onClick={(e) => {
								dispatch(setlat(item.lat));
								dispatch(setlng(item.lng));
								dispatch(setzoom(16));
								dispatch({
									type: 'cur/setcurheang',
									code: item.heang_code,
									name: item.heang_name,
									sum_cm_sa: 0,
									sum_total_ns: 0,
									ratio_cm_sa_ns: 0,
									max_total_ns_st_nm: '',
									max_cm_sa_st_nm: '',
								});
								dispatch({
									type: 'cur/setcursang',
									code: item.code,
									name: item.name,
									sum_cm_sa: item.sum_cm_sa,
									sum_total_ns: item.sum_total_ns,
									ratio_cm_sa_ns: item.ratio_cm_sa_ns,
									max_total_ns_st_nm: item.max_total_ns_st_nm,
									max_cm_sa_st_nm: item.max_cm_sa_st_nm,
								});
							}}
						>
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
