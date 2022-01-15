import { useState, useEffect } from "react";
import { gottaCatchEmAll } from "./services/fetchpokemon";
import Card from "./components/card";
import Header from "./components/header";
import Footer from "./components/footer";
import Loading from "./components/loading";

function App() {
  // set variables for all pokemon data, next+prev button, loading Message, url to start search
  const [pokemonData, setPokemonData] = useState([]);
  const [catchedPokemon, setCatchedPokemon] = useState([]);
  const [freePokemon, setFreePokemon] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const urlPokemon = "https://pokeapi.co/api/v2/pokemon/?limit=9";
  useEffect(() => {
    async function fetchData() {
      let response = await gottaCatchEmAll(urlPokemon);
      setNextUrl(response.next);
      await loadingPokemon(response.results);
      setIsLoading(false);
    }
    fetchData();
    checkLocal();
  }, []);

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  const loadingPokemon = async (data) => {
    const pokeData = await Promise.all(
      data.map(async (pokemon) => {
        return await gottaCatchEmAll(pokemon.url);
      })
    );

    setPokemonData([...pokemonData, ...pokeData]);
  };

  const showMore = async () => {
    setIsLoading(true);
    let data = await gottaCatchEmAll(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setIsLoading(false);
    scrollToBottom();
  };

  const checkLocal = () => {
    if (localStorage.getItem("pokemonCatch")) {
      let localPokemon = JSON.parse(localStorage.getItem("pokemonCatch"));
      console.log("local pokemon use effetc", localPokemon);
      setCatchedPokemon(localPokemon);
      console.log("catched pokemon", catchedPokemon);
      let pokemonDifference = pokemonData.filter(
        (x) => !catchedPokemon.includes(x)
      );
      console.log("difference", pokemonDifference);
      setFreePokemon(pokemonDifference);
      console.log("freepokemon", freePokemon);
    }
  };

  return (
    <div className="App">
      <Header
        setPokemonData={setPokemonData}
        catchedPokemon={catchedPokemon}
        pokemonData={pokemonData}
        freePokemon={freePokemon}
      />

      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-12 card-deck ">
            {isLoading ? (
              <Loading />
            ) : (
              pokemonData.map((pokemon, i) => {
                return (
                  <Card
                    key={i}
                    pokemon={pokemon}
                    setCatchedPokemon={setCatchedPokemon}
                    setFreePokemon={setFreePokemon}
                    catchedPokemon={catchedPokemon}
                    pokemonData={pokemonData}
                    freePokemon={freePokemon}
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 px-4">
            {isLoading ? null : (
              <button
                className="btn btn-lg btn-block btn-success text-uppercase p-3"
                onClick={() => {
                  showMore();
                }}
              >
                Mostra altri Pokemon
              </button>
            )}
          </div>
        </div>
      </div>
      {isLoading ? null : <Footer />}
    </div>
  );
}

export default App;
