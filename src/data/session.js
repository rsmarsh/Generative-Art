export const getSeed = () => {
    if (localStorage) {
        return localStorage.getItem('seed');
    }

    return;
};

export const storeSeed = (seed) => {
    if (localStorage) {
        localStorage.setItem('seed', seed);
    }
}
