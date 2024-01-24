import { makePonyNode, renderScrollPonies } from "./render.js";
import "./style.css";
import { fetchData } from "./utils.js";

const getAllCharacters = async () => {
  const { data } = await fetchData("https://ponyapi.net/v1/character/all");
  return data;
};

const getCharacterById = async (id) => {
  return await fetchData(`https://ponyapi.net/v1/character/${id}`);
};

const getCharacterByName = async (name) => {
  return await fetchData(
    `https://ponyapi.net/v1/character/${name.replace(/\s/g, "_")}`
  );
};

const main = async () => {
  const scrollLeft = (amount = 1) => {
    for (let i =0; i < amount; i++) {
    const newIndex = Number(displayedCharacters[0].index) === 0 ? allCharacters.length - 1 : Number(displayedCharacters[0].index) - 1;
    const ponyUp = allCharacters[newIndex];
    displayedCharacters.unshift({
      pony: makePonyNode(ponyUp.image[0]),
      index: newIndex,
    });
    displayedCharacters.pop();
  }
    renderScrollPonies(displayedCharacters);
  };

  const scrollRight = async (amount = 1) => {
    for(let i =0; i< amount; i++) {
    const newIndex = Number(displayedCharacters[displayedCharacters.length-1].index) === allCharacters.length-1 ? 0 : Number(displayedCharacters[displayedCharacters.length-1].index) + 1;
    const ponyUp = allCharacters[newIndex];
    displayedCharacters.push({
      index: newIndex,
      pony:makePonyNode(ponyUp.image[0]),
    })
    displayedCharacters.shift();
  }
    renderScrollPonies(displayedCharacters);
  };

  const handleScrollerButton = async (e) => {
    if (e.target.dataset.direction === "left") {
      scrollLeft();
    } else {
      scrollRight();
    }
  };

  const allCharacters = await getAllCharacters();
  console.log(allCharacters);
  const displayedCharacters = [];
  for (let i = 0; i < 5; i++) {
    displayedCharacters[i] = {
      index: i,
      pony: makePonyNode(allCharacters[i].image[0]),
    };
  }
  document.querySelectorAll(".direction-scroll").forEach((button) => {
    button.addEventListener("click", handleScrollerButton);
  });
  document.body.addEventListener('keydown', (e) => {
    switch(e.key) {
      case ("ArrowLeft"):
        scrollLeft();
        break;
      case ("ArrowRight"):
        scrollRight();
        break;
      case ("ArrowUp"):
        scrollRight(5);
        break;
      case("ArrowDown"):
        scrollLeft(5);
        break;
    };
  })

  renderScrollPonies(displayedCharacters);
};
main();
