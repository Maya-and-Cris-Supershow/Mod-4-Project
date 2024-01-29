import { addPony, getPonies } from "./local";
import { getCharacterById } from "./main";

export const renderScrollPonies =  (ponyNodeArr) => {
    const scroller = document.querySelector('#scroller-wrapper');
    scroller.innerHTML = '';
    ponyNodeArr.forEach(ponyObj => scroller.appendChild(ponyObj.pony));
    scroller.onclick = (async (e)=> {
        if (e.target.tagName !== "IMG") return;
        const character = await getCharacterById(Number(e.target.dataset.id));
        const modal = makeModal(character.data[0],e.target.src);
        document.querySelector('#modal-wrapper').appendChild(modal);
        document.querySelector('#modal-wrapper').style.display = 'block';
    })
}

export const renderFavoritePonies = (ponyArr) => {
    const localPonies = document.querySelector('#local-ponies');
    localPonies.innerHTML = '';
    ponyArr.forEach(pony => {
        const {image,name,id} = pony;
        localPonies.append(makePonyNode(image[0],name,id));
    })
}

export const makePonyNode = (image,name,id) => {
    const img = document.createElement('img');
    img.className = "scroll-pony";
    img.src = image;
    img.draggable = false;
    img.dataset.name=name;
    img.dataset.id = id;
    return img;
}

const makeModal = (ponyData,img) => {
    const {name,alias,kind,occupation,residence,sex,url,image,id} = ponyData;
    document.querySelector('#modal-wrapper').innerHTML = '';
    const div = document.createElement('div');
    div.id = 'modal-content';
    const nameh3 = document.createElement('h2');
    nameh3.textContent = name.replace(/_/g," ");

    const imagePony = document.createElement('img');
    imagePony.src = img;

    const addButton = document.createElement('button');
    addButton.textContent = "Add to favorites"
    
    addButton.addEventListener('click', (e)=> {
        addPony(ponyData);
        renderFavoritePonies(getPonies());
    })

    div.append(nameh3,imagePony,addButton);
    const h2 = document.createElement('h2');
    h2.textContent = name.replace(/_/g,' ');

    const aliasDiv = document.createElement('div');
    const aliasP = document.createElement('p');
    const aliash3 = document.createElement('h3');
    aliash3.textContent = "Alias:"
    aliasP.textContent = alias;
    aliasDiv.append(aliash3, aliasP);

    const kindDiv = document.createElement('div');
    const kindh3 = document.createElement('h3');
    kindh3.textContent = "Kind:";
    const kindUl = document.createElement('ul');
    kind.forEach(el => {
        if (el === "Human") return;
        const li = document.createElement('li');
        li.textContent = el;
        kindUl.appendChild(li);
    })
    kindDiv.append(kindh3,kindUl);

    const occupationDiv = document.createElement('div');
    const occupationP = document.createElement('p');
    const occupationh3 = document.createElement('h3');
    occupationh3.textContent = "Occupation:"
    occupationP.textContent = occupation;
    occupationDiv.append(occupationh3,occupationP)

    const residenceDiv = document.createElement('div');
    const residence3 = document.createElement('h3');
    const residenceP = document.createElement('p');
    residence3.textContent = "Residence:";
    residenceP.innerHTML = residence;
    residenceDiv.append(residence3,residenceP)

    const sexDiv =document.createElement('div');
    const sexh3 = document.createElement('h3');
    const sexP = document.createElement('p');
    sexh3.textContent = "Sex:"
    sexP.textContent = sex;

    sexDiv.append(sexh3,sexP);

    const urlDiv = document.createElement('div');
    const urlA = document.createElement('a');
    const urlh3 = document.createElement('h3');
    urlA.href = url;
    urlA.textContent = url;
    urlA.target = '_blank';
    urlh3.textContent = "Url:";

    urlDiv.append(urlh3,urlA);

    const imgDiv = document.createElement('div');
    imgDiv.className = "modal-image-wrapper"
    image.forEach(el => {
        const imgTag = document.createElement('img');
        imgTag.className = 'modal-image'
        imgTag.src = el;
        imgDiv.appendChild(imgTag);
    })

    div.append(aliasDiv,kindDiv,occupationDiv,residenceDiv,sexDiv,urlDiv,imgDiv);
    return div;
};
