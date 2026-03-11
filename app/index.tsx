import PokemoCard from "@/components/PokemonCard";
import { useEffect, useState } from "react";
import { ScrollView, TextInput } from "react-native";

interface Pokemon {
  name: string;
  url: string;
}

export default function Index() {
  const [result, setResult] = useState<Pokemon[]>([]);
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    try {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
      const response = await fetch(URL, { method: "GET" });

      if (response.ok) {
        const data = await response.json();
        setResult(data.results);
        setAllPokemons(data.results);
      } else {
        console.log("Bad Request");
      }
    } catch (error) {
      console.log("Ocurrió un error");
    }
  };

  const filterPokemon = (text: string) => {
    if (text === "") {
      setResult(allPokemons);
    } else {
      const arrayFiltered = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(text.toLowerCase()),
      );
      setResult(arrayFiltered);
    }
  };

  return (
    <ScrollView>
      <TextInput onChangeText={filterPokemon} placeholder="Buscar pokémon..." />
      {result.map((item) => (
        <PokemoCard key={item.name} name={item.name} url={item.url} />
      ))}
    </ScrollView>
  );
}
