const setLocalStorage = (key,value) => {
    try{localStorage.setItem(key,JSON.stringify(value));}
    catch(e) {
        throw new Error(e);
        return null;
    }
}

const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const makeDefaultPonies = () => {
    setLocalStorage('ponies',[]);
}

export const getPonies = () => {
    return getLocalStorage('ponies');
}

export const addPony = (ponyData) => {
    const ponies = getPonies();
    for (let i = 0; i < ponies.length; i++) {
        const pony = ponies[i];
        if (pony.id === ponyData.id) return;
    }
    ponies.push(ponyData)
    setLocalStorage('ponies', ponies);
}