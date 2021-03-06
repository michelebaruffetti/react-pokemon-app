import Filters from "./Filters";

const Header = ({
  setSelect,
  setPokemonData,
  catchedPokemon,
  pokemonData,
  freePokemon,
}) => {
  return (
    <header>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <img className="img-fluid p-4" src="../pokedex1.png" alt="pokedex" />
        </div>
        <Filters
          setSelect={setSelect}
          setPokemonData={setPokemonData}
          catchedPokemon={catchedPokemon}
          pokemonData={pokemonData}
          freePokemon={freePokemon}
        />
      </div>
    </header>
  );
};

export default Header;
