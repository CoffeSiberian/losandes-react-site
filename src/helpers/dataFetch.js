const dataFetch = async (body = null, method, headers, url) => {
	let optiosFetch = {
		method: method,
		headers: headers,
		body: body,
	};

	try {
		return await fetch(url, optiosFetch);
	} catch (err) {
		return err.message;
	}
};

const fetchData = async (body = null, method, headers, url) => {
	return await dataFetch(body, method, headers, url);
};
export { fetchData };
