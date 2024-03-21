'use client';
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/hooks';
import { setlat, setlng, setzoom } from '@/lib/geo_reducer';
import styles from './search.module.css';
import { useEffect, useState } from 'react';

export default function Search() {
	const { searchq } = useAppSelector((state) => state.search);
	const dispatch = useAppDispatch();
	const [hhits, sethhits] = useState([]);
	const [shits, setshits] = useState([]);
	return (
		<>
			<div className={styles.search}>
				<div className={styles.input}>
					<input
						type='search'
						placeholder={'동을 입력해 주세요'}
						value={searchq}
						onChange={(e) => {
							dispatch({ type: 'search/change', change: e.target.value });
							searchmeilih(e, sethhits);
							searchmeilis(e, setshits);
						}}
					></input>
					<svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
						<path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' />
					</svg>
				</div>
				<div className='hhits'>
					{hhits.map((hit) => (
						<div
							className={styles.hit}
							key={hit.ab_cd}
							onClick={(e) => {
								dispatch(setlng(hit.coordinates[0]));
								dispatch(setlat(hit.coordinates[1]));
								dispatch(setzoom(15));
								dispatch({ type: 'search/change', change: hit.ab_nm });
								sethhits([]);
								setshits([]);
								dispatch({
									type: 'cur/setcurheang',
									code: hit.ab_cd,
									name: hit.adm_nm,
									sum_cm_sa: hit.sum_cm_sa,
									sum_total_ns: hit.sum_total_ns,
									ratio_cm_sa_ns: hit.ratio_cm_sa_ns,
									max_total_ns_st_nm: hit.max_total_ns_st_nm,
									max_cm_sa_st_nm: hit.max_cm_sa_st_nm,
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
							{hit.adm_nm}
						</div>
					))}
				</div>
				<hr />
				<div className='shits'>
					{shits.map((hit) => (
						<div
							className={styles.hit}
							key={hit.cd_cd}
							onClick={(e) => {
								dispatch(setlng(hit.coordinates[0]));
								dispatch(setlat(hit.coordinates[1]));
								dispatch(setzoom(15));
								dispatch({ type: 'search/change', change: hit.cd_nm });
								sethhits([]);
								setshits([]);
								dispatch({
									type: 'cur/setcurheang',
									code: hit.ab_cd,
									name: hit.ab_nm,
									sum_cm_sa: 0,
									sum_total_ns: 0,
									ratio_cm_sa_ns: 0,
									max_total_ns_st_nm: '',
									max_cm_sa_st_nm: '',
								});
								dispatch({
									type: 'cur/setcursang',
									code: hit.cd_cd,
									name: hit.cd_nm,
									sum_cm_sa: hit.sum_cm_sa,
									sum_total_ns: hit.sum_total_ns,
									ratio_cm_sa_ns: hit.ratio_cm_sa_ns,
									max_total_ns_st_nm: hit.max_total_ns_st_nm,
									max_cm_sa_st_nm: hit.max_cm_sa_st_nm,
								});
							}}
						>
							{hit.cd_nm}
						</div>
					))}
				</div>
			</div>
		</>
	);
}

/**
 *
 * @param {InputEvent} e
 * @param {Function} setresult
 */
function searchmeilih(e, setresult) {
	if (e.target.value.length != 0) {
		fetch('/api/meili/search', {
			method: 'POST',
			body: JSON.stringify({
				q: e.target.value,
				index: 'dong',
			}),
		})
			.then((res) => res.json())
			.then((data) => setresult(data));
	} else {
		setresult([]);
	}
}
/**
 *
 * @param {InputEvent} e
 * @param {Function} setresult
 */
function searchmeilis(e, setresult) {
	if (e.target.value.length != 0) {
		fetch('/api/meili/search', {
			method: 'POST',
			body: JSON.stringify({
				q: e.target.value,
				index: 'sang',
			}),
		})
			.then((res) => res.json())
			.then((data) => setresult(data));
	} else {
		setresult([]);
	}
}
