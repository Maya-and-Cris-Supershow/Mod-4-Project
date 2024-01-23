export const fetchData = async (url, options = {}) => {
    try {
        const response = await fetch(url,options);
        if(!response.ok) throw new Error(`Error fetching data at ${url}`);
        const json = await response.json();
        return json
    }
    catch (e) {
        console.warn(e);
        return null;
    }
};