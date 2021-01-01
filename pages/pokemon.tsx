import { GetServerSideProps } from 'next';
import React from 'react';

interface pokemonProps {}

const pokemon = ({pokeman}) => {
  console.log(pokeman)
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedId = ('00' + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;
    pokeman.image = image
    
    return {
      props: {
        pokeman,
      },
    };
  } catch (error) {
    console.error(error)
  }
};

export default pokemon;
