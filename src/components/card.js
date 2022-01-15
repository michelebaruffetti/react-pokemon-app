import { useEffect, useState } from "react";
import "../styles/app.scss";
import typecolors from "../services/typecolors";

const Card = ({ pokemon }) => {
  const [open, setOpen] = useState(false);
  const [save, setSave] = useState(false);
  console.log(pokemon.name, save);

  // push pokemon in local storage
  const storePokemonLocal = () => {
    if (!localStorage.getItem("pokemonCatch")) {
      //create file in localstorage
      let localPokemon = [];
      localPokemon.push(pokemon);
      localStorage.setItem("pokemonCatch", JSON.stringify(localPokemon));
      setSave(true);
      console.log(
        "all pokemon in local storage: ",
        JSON.parse(localStorage.getItem("pokemonCatch"))
      );
    } else {
      //get all pokemon in local storage
      let localPokemon = JSON.parse(localStorage.getItem("pokemonCatch"));

      //check if pokemon is already in local storage
      if (localPokemon.some((e) => e.id === pokemon.id)) {
        setSave(true);
      } else {
        //if pokemon is not in local storage push in array
        localPokemon.push(pokemon);
        localStorage.setItem("pokemonCatch", JSON.stringify(localPokemon));
        setSave(true);
      }
    }
  };

  // delete pokemon from local storage
  const unstorePokemonLocal = () => {
    if (localStorage.getItem("pokemonCatch")) {
      let localPokemon = JSON.parse(localStorage.getItem("pokemonCatch"));
      console.log(localPokemon);
      const filteredPokemon = localPokemon.filter((el) => el.id !== pokemon.id);
      localStorage.setItem("pokemonCatch", JSON.stringify(filteredPokemon));
      setSave(false);
      console.log("cattura annullata!", save);
      console.log(JSON.parse(localStorage.getItem("pokemonCatch")));
    }
  };

  // check local storage for catched pokemon
  const checkLocal = () => {
    if (localStorage.getItem("pokemonCatch")) {
      let localPokemon = JSON.parse(localStorage.getItem("pokemonCatch"));
      if (localPokemon.some((e) => e.id === pokemon.id)) {
        setSave(true);
      }
    }
  };

  useEffect(() => {
    checkLocal();
  }, []);

  const setWrapperCardStyle = () => {
    return {
      backgroundColor: open ? typecolors[pokemon.types[0].type.name] : null,
    };
  };

  return (
    <div className={"col-md-6 col-lg-4 mb-3"}>
      {/* card standard */}
      <div>
        <div
          className={"card m-0 border-dark btn hover-shadow"}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <img
            className="card-img-top p-3"
            src={pokemon.sprites.other.dream_world.front_default}
            alt="pokemon sprite"
            style={{ height: 15 + "rem" }}
          ></img>
          <div className="card-body">
            <h4 className="card-title">{pokemon.name.toUpperCase()}</h4>
            <div className="card-type d-flex justify-content-center mb-2">
              {pokemon.types.map((type, index) => {
                return (
                  <p
                    key={index}
                    className="card-text btn m-2 text-uppercase text-white"
                    style={{ backgroundColor: typecolors[type.type.name] }}
                  >
                    {type.type.name}
                  </p>
                );
              })}
            </div>
            {open && (
              <div className="card-info">
                <p className="card-text h5 id-pokemon">#{pokemon.id}</p>
                <p className="card-text m-1 font-weight-bold">
                  Altezza:{" "}
                  <span className="font-weight-normal">
                    {" "}
                    {pokemon.height + "0"} centimetri
                  </span>
                </p>
                <p className="card-text m-1 font-weight-bold">
                  Peso:{" "}
                  <span className="font-weight-normal">
                    {" "}
                    {pokemon.weight / 10} kg
                  </span>
                </p>
                <p className="card-text m-1 font-weight-bold">
                  Livello:{" "}
                  <span className="font-weight-normal">
                    {" "}
                    {pokemon.base_experience}
                  </span>
                </p>
                <div className="card-text m-1 font-weight-bold">
                  Abilità:{" "}
                  {pokemon.abilities.map((ability, i) => {
                    return (
                      <p
                        key={i}
                        className="font-italic m-0"
                        style={{
                          color: typecolors[pokemon.types[0].type.name],
                        }}
                      >
                        {ability.ability.name + "\n"}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            <div>
              {!open ? (
                <button
                  className="btn btn-default mt-2"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  Mostra Caratteristiche
                </button>
              ) : null}
            </div>
          </div>
        </div>
        {!save ? (
          <button
            className="btn btn-default mt-1 bg-success text-white capture-button"
            onClick={() => storePokemonLocal()}
          >
            cattura!
          </button>
        ) : (
          <button
            className="btn btn-default mt-1 bg-danger text-white capture-button"
            onClick={() => unstorePokemonLocal()}
          >
            rilascia!
          </button>
        )}
      </div>
      {/* card on click */}
      <div
        className={open ? "card-open btn" : "d-none"}
        style={setWrapperCardStyle()}
      >
        <div
          className={open ? "card-modal card m-0 border-dark btn" : "d-none"}
        >
          <img
            className="card-img-top p-3"
            src={pokemon.sprites.other.dream_world.front_default}
            alt="pokemon sprite"
            style={{ height: 15 + "rem" }}
          ></img>
          <div className="card-body">
            <h4 className="card-title">{pokemon.name.toUpperCase()}</h4>
            <div className="card-type d-flex justify-content-center mb-2">
              {pokemon.types.map((type, index) => {
                return (
                  <p
                    key={index}
                    className="card-text btn m-2 text-uppercase text-white"
                    style={{ backgroundColor: typecolors[type.type.name] }}
                  >
                    {type.type.name}
                  </p>
                );
              })}
            </div>
            {open && (
              <div className="card-info">
                <button
                  type="button"
                  class="close close-button"
                  aria-label="Close"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <p className="card-text h5 id-pokemon">#{pokemon.id}</p>
                <p className="card-text m-1 font-weight-bold">
                  Altezza:{" "}
                  <span className="font-weight-normal">
                    {" "}
                    {pokemon.height + "0"} centimetri
                  </span>
                </p>
                <p className="card-text m-1 font-weight-bold">
                  Peso:{" "}
                  <span className="font-weight-normal">
                    {" "}
                    {pokemon.weight / 10} kg
                  </span>
                </p>
                <p className="card-text m-1 font-weight-bold">
                  Livello:{" "}
                  <span className="font-weight-normal">
                    {" "}
                    {pokemon.base_experience}
                  </span>
                </p>
                <div className="card-text m-1 font-weight-bold">
                  Abilità:{" "}
                  {pokemon.abilities.map((ability, i) => {
                    return (
                      <p
                        key={i}
                        className="font-italic m-0"
                        style={{
                          color: typecolors[pokemon.types[0].type.name],
                        }}
                      >
                        {ability.ability.name + "\n"}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            <div>
              {!open ? (
                <button
                  className="btn btn-default mt-2"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  Mostra Caratteristiche
                </button>
              ) : null}
            </div>
            {!save ? (
              <button
                className="btn btn-default mt-1 bg-success text-white"
                onClick={() => storePokemonLocal()}
              >
                cattura pokemon!
              </button>
            ) : (
              <button
                className="btn btn-default mt-1 bg-danger text-white"
                onClick={() => unstorePokemonLocal()}
              >
                annulla cattura!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
