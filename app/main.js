import "./style.css";
import { fetchData } from "./utils.js";

const getAllCharacters = async () => {
  const { data } = await fetchData("https://ponyapi.net/v1/character/all");
  return data;
};

const getCharacterById = async (id) => {
  return await fetchData(
    `https://ponyapi.net/v1/character/${id}`
  );
};

const main = async () => {
  const allCharacters = await getAllCharacters();
  console.log(allCharacters);
  allCharacters.forEach(async (ponyObj) => {
    const {data} = await getCharacterById(ponyObj.id);
    console.log(ponyObj.id,data[0]);
  });
};
main();
