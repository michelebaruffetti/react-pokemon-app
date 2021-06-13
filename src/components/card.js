import { useEffect, useState } from 'react';
import './card.css';
import typecolors from './typecolors';

const Card = ({pokemon}) => {

    const [open, setOpen] = useState(false);
    const [save, setSave] = useState(false);

    const storePokemonLocal = () => {
        if (!localStorage.getItem('pokemonCatch')){
            console.log('creo file localstorage');    
            let localPokemon = [];
            localPokemon.push(pokemon);
            localStorage.setItem('pokemonCatch', JSON.stringify(localPokemon));
            setSave(true);
            console.log('pokemon catturato', save);
            console.log(JSON.parse(localStorage.getItem('pokemonCatch')));

        }else {
            let localPokemon =JSON.parse(localStorage.getItem('pokemonCatch'));
            if(localPokemon.some(e => e.id === pokemon.id)){
                setSave(true);
                console.log('include il pokemon, non pusho',localPokemon.includes(pokemon));
                console.log(JSON.parse(localStorage.getItem('pokemonCatch')));
            }else{
                console.log('non include il file e pusho');
                console.log('risultato di includes',localPokemon.includes(pokemon));
                localPokemon.push(pokemon);
                localStorage.setItem('pokemonCatch', JSON.stringify(localPokemon));
                setSave(true);
                console.log('pokemon aggiunto', JSON.parse(localStorage.getItem('pokemonCatch')));
            }
        }
        
    };

    const unstorePokemonLocal = () => {
        if (localStorage.getItem('pokemonCatch')){
            let localPokemon =JSON.parse(localStorage.getItem('pokemonCatch'));
            console.log(localPokemon);
            const filteredPokemon = localPokemon.filter(el => el.id !== pokemon.id); 
            localStorage.setItem('pokemonCatch', JSON.stringify(filteredPokemon));
            setSave(false);
            console.log('cattura annullata!', save);
            console.log(JSON.parse(localStorage.getItem('pokemonCatch')));
        }
    }

    const checkLocal = () => {
        if (localStorage.getItem('pokemonCatch')){    
            let localPokemon =JSON.parse(localStorage.getItem('pokemonCatch'));
            if (localPokemon.some(e => e.id === pokemon.id)){
                console.log('pokemon già catturato');
                setSave(true);
            }             
        }
    }

    useEffect(()=>{
        checkLocal();
    }, [])

    return (  
        <div className={open ? "card-open btn" : "col-md-6 col-lg-4 mb-3"} style={open ? {backgroundColor: typecolors[pokemon.types[0].type.name]} : null }>
            <div className={open ? "card-modal card m-0 border-dark btn" : "card m-0 border-dark btn"} onClick={()=>{setOpen(!open)}}>
                <img className="card-img-top p-3" src={pokemon.sprites.other.dream_world.front_default} alt="pokemon sprite" style={{height: 15+'rem'}}></img>
                <div className="card-body">
                    <h4 className="card-title">{pokemon.name.toUpperCase()}</h4>
                    <div className="card-type d-flex justify-content-center mb-2">
                        {pokemon.types.map(type => {
                            return (
                                <p className="card-text btn m-2 text-uppercase text-white" style={{ backgroundColor: typecolors[type.type.name] }}>
                                    {type.type.name}
                                </p>
                            )
                        })}
                     </div>
                    {open &&<div className="card-info">
                    <p className="card-text h5 id-pokemon">#{pokemon.id}</p>
                    <p className="card-text m-1 font-weight-bold">Altezza: <span className="font-weight-normal"> {pokemon.height+'0'} centimetri</span></p>
                    <p className="card-text m-1 font-weight-bold">Peso: <span className="font-weight-normal"> {pokemon.weight/10} kg</span></p>
                    <p className="card-text m-1 font-weight-bold">Livello: <span className="font-weight-normal"> {pokemon.base_experience}</span></p>
                    <div className="card-text m-1 font-weight-bold">Abilità: {pokemon.abilities.map( (ability,i) => {
                                                                            return(
                                                                                <p className="font-italic m-0" style={{color: typecolors[pokemon.types[0].type.name]}}>{ability.ability.name+"\n"}</p>
                                                                            )
                                                                        })}
                    </div>
                    </div>}
                    <div>
                        {/* {!open ? <button className="btn btn-default mt-2" onClick={()=>{setOpen(!open)}}>Mostra Caratteristiche</button> : null} */}
                    </div>
                    {!save ? <button className="btn btn-default mt-2 bg-success text-white" onClick={()=>storePokemonLocal()}>cattura pokemon!</button> : <button className="btn btn-default mt-2 bg-danger text-white" onClick={()=>unstorePokemonLocal()}>annulla cattura!</button>} 
                </div>
            </div>
        </div>
    );
}
 
export default Card;