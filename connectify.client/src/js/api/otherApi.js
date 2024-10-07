const getLocationUrl = (searchTerm) => {
    return `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json&addressdetails=1`
}
export { getLocationUrl };