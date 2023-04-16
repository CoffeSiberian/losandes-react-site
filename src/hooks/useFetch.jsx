import { useState } from "react";
import { fetchData } from "../helpers/dataFetch";

const useFetch = (url, method, header) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [succes, setSucces] = useState(false);

    const data = async (bodyObj) => {
        setLoading(true);
        let dataResponse = await fetchData(bodyObj, method, header, url);
        if (!(await dataResponse.ok)) {
            setError(true);
        } else {
            setSucces(true);
            setError(false);
        }
        setLoading(false);
        return dataResponse;
    };
    const bodyResponse = async (obj) => {
        return await data(JSON.stringify(obj));
    };
    return [loading, error, succes, bodyResponse, setError, setSucces];
};

export default useFetch;
