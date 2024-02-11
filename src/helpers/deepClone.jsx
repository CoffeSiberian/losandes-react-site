const deepClone = (obj) => {
    /* Clone object and return new pointer */
    return JSON.parse(JSON.stringify(obj));
}
export default deepClone;