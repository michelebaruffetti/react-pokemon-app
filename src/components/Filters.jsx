import { useRef } from "react";

const Filters = ({
  setSelect,
  setPokemonData,
  catchedPokemon,
  pokemonData,
  freePokemon,
}) => {
  const selectEl = useRef("all");
  const selectHandler = () => {
    const selectValue = selectEl.current.value;
    switch (selectValue) {
      case "all":
        setPokemonData(pokemonData);
        break;
      case "catched":
        setPokemonData(catchedPokemon);
        break;
      case "tocatch":
        setPokemonData(freePokemon);
        break;
      default:
        setPokemonData(pokemonData);
        break;
    }
  };
  return (
    <div className="filters container">
      <select
        ref={selectEl}
        onChange={() => selectHandler()}
        name="filters"
        id="filters"
      >
        <option selected value="all">
          All
        </option>
        <option value="catched">Catched</option>
        <option value="tocatch">To Catch</option>
      </select>
    </div>
  );
};

export default Filters;
