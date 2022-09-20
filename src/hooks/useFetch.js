import { useEffect, useState } from "react";

/**
 * Hook used to fetch data from a url
 *
 * @param {string} url
 * @returns {{data, loading: boolean, error}}
 */
function useFetch(url) {
	const [loading, isLoading] = useState(true);
	const [data, setData] = useState();
	const [error, setError] = useState();

	useEffect(() => {
		const controller = new AbortController();

		const fetchData = async () => {
			try {
				const response = await fetch(url, {
					signal: controller.signal,
				});
				const data = await response.json();

				setData(data);
				isLoading(false);
			} catch (error) {
				isLoading(false);
				if (error.code !== 20) {
					setError(error);
					throw error;
				}
			}
		};

		fetchData();

		return () => {
			controller.abort();
		};
	}, [url]);

	return { data, error, loading };
}

export default useFetch;
