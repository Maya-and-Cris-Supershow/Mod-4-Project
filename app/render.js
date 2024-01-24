export const renderScrollPonies = (ponyNodeArr) => {
    const scroller = document.querySelector('#scroller-wrapper');
    scroller.innerHTML = '';
    ponyNodeArr.forEach(ponyObj => scroller.appendChild(ponyObj.pony));
    scroller.childNodes.forEach(pony => {
        const background = document.querySelector('#favorite-ponies').style.backgroundColor;
        pony.addEventListener('drag', (e) => {
            document.querySelector('#local-ponies').style.backgroundColor = "#99ccff";
        })

        pony.addEventListener('dragend', (e)=> {
            const dropZone = document.querySelector('#local-ponies');
            dropZone.style.backgroundColor = background;
            // console.log(isInElement(e,dropZone));
            if (isInElement(e,dropZone)) {
                dropZone.appendChild(makePonyNode(e.target.src));
                dropZone.style.height = auto;
            };
        })
    })
}

const isInElement = (event, element) => {
    const perimeter = element.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    // console.log(perimeter,x,y);
    return x <= perimeter.right && x>=perimeter.left && y>=perimeter.top && y<=perimeter.bottom;
}

 export const makePonyNode = (image) => {
    const img = document.createElement('img');
    img.className = "scroll-pony";
    img.src = image;
    return img;
}

