export async function gottaCatchEmAll(url) {
    const fetchData = await (await fetch(url)).json();
    return fetchData;
}; 