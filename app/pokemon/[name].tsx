import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function PokemonDetailsScreen() {
  const params = useLocalSearchParams();
  const [PokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = async () => {
    try {
      const URL = `https://pokeapi.co/api/v2/pokemon/${params.name}`;
      const response = await fetch(URL, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setPokemonData(data);
      } else {
        console.log("Bad Request");
      }
    } catch (error) {
      console.log("ocurrio un error");
    }
  };

  return (
    <View>
      <Text>{params.name}</Text>

      {PokemonData && <Text>{JSON.stringify(PokemonData)}</Text>}
    </View>
  );
}
