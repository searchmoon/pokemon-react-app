import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const params = useParams();
  const pokemonId = params.id;
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const fetchPokemonData = async () => {
    const url = `${baseUrl}${pokemonId}`;
    try {
      const { data: pokemonData } = await axios.get(url);
      //반환하는 response의 data를 (response.data) 디스트럭쳐링.
      // 객체의 값을 가져온거기때문에 {} 감싸준다. data 라는 이름으로 쓰고 싶지 않으면
      // 이름을 붙여준다. (key: value) 와 혼동하지 않기. data: pokemonData
      console.log(pokemonData);

      if (pokemonData) {
        const { name, id, types, weight, height, stats, abilities } = pokemonData;
        const nextAndPreviousPokemon = await getNextAndPreviousPokemon(id);
        console.log(nextAndPreviousPokemon);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNextAndPreviousPokemon = async (id) => {
    const urlPokemon = `${baseUrl}?limit=1&offset=${id - 1}`;
    const { data: pokemonData } = await axios.get(urlPokemon);
    console.log(pokemonData);

    const nextResponse = pokemonData.next && (await axios.get(pokemonData.next));
    const previousResponse = pokemonData.previous && (await axios.get(pokemonData.previous));

    console.log(previousResponse);

    return {
      next: nextResponse?.data?.results?.[0].name,
      previous: previousResponse?.data?.results?.[0].name,
    };
  };

  return <div>DetailPage</div>;
};

export default DetailPage;
