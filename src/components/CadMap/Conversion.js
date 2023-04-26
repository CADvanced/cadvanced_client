// FiveM 0,0 is at 121.1,-159.1 in Leaflet
export const fiveM2Leaflet = (type, value) => {
    const start = type === 'x' ? 121.1 : -159.1;
    return start + value * 0.01871;
};

export const leaflet2FiveM = (type, value) => {
    const start = type === 'x' ? 121.1 : -159.1;
    return (value - start) / 0.01871;
};
