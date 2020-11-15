import axios from "axios";
import { PokemonURL } from "../config";

export async function fetchAllPokemon(like) {
  const regex = like !== null ? new RegExp(like) : new RegExp("");

  const initial = await axios.get(PokemonURL); // first request contains count of all pokemon
  const _list = await axios.get(PokemonURL + `?limit=${initial.data.count}`);

  const _pokemon = await Promise.all(
    _list.data.results
      .filter((e) => regex.test(e.name))
      .map(async (pokemon) => {
        try {
          const result = await axios.get(pokemon.url);
          return result.data;
        } catch (e) {
          return null;
        }
      })
  );
  return _pokemon.filter((e) => e !== null);
}

export async function fetchPokemon(id) {
  const result = await axios.get(PokemonURL + `/${id}`);
  let pokemon = result.data;

  const abilities = await Promise.all(pokemon.abilities.map(async (ability) => {
    const tmp = await axios.get(ability.ability.url);
    return tmp.data;
  }));
  pokemon.abilities = abilities;

  const moves = await Promise.all(pokemon.moves.map(async (move) => {
    const tmp = await axios.get(move.move.url);
    return tmp.data;
  }));
  pokemon.moves = moves;

  const stats = await Promise.all(pokemon.stats.map(async (stat) => {
    const tmp = await axios.get(stat.stat.url);
    tmp.data.base_stat = stat.base_stat;
    return tmp.data;
  }));
  pokemon.stats = stats;

  const types = await Promise.all(pokemon.types.map(async (type) => {
    const tmp = await axios.get(type.type.url);
    return tmp.data;
  }));
  pokemon.types = types;

  return pokemon;
}
