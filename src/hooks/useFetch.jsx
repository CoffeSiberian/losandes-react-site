import { useState } from "react";
import { fetchData } from "../helpers/dataFetch";

const useFetch = (url, method, heder) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [succes, setSucces] = useState(false);

	const data = async (bodyObj) => {
		setLoading(true);
		let dataResponse = await fetchData(bodyObj, method, heder, url);
		if (!(await dataResponse.ok)) {
			setError(true);
		} else {
			setSucces(true);
			setError(false);
		}
		setLoading(false);
		return dataResponse;
	};
	const bodySet = async (obj) => {
		return await data(JSON.stringify(obj));
	};
	return [loading, error, succes, bodySet, setError, setSucces];
};

export default useFetch;