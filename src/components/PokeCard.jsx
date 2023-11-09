import axios from "axios";
import React, { useEffect, useState } from "react";

const PokeCard = ({ name, url }) => {
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    fetchPokeDetailData();
  }, []);

  const fetchPokeDetailData = async () => {
    try {
      const response = await axios.get(url);
      console.log(response.data);
      formatPokemonData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatPokemonData = (params) => {};

  return <div>pokecard</div>;
};

export default PokeCard;
