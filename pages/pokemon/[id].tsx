import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';

interface pokemonProps {}

const Pokemon = ({ pokeman }) => {
  return (
    <Layout title={pokeman.name}>
      <h1 className="mb-2 text-4xl text-center capitalize">
        {pokeman.id}. {pokeman.name}
      </h1>
      <div className="flex items-center justify-center">
        <img
          className="w-40 h-40 mr-4"
          src={pokeman.image}
          alt={pokeman.name}
        />
        <div>
          <p>
            <span className="mr-2 font-bold">Weight:</span> {pokeman.weight}
          </p>
          <p>
            <span className="mr-2 font-bold">Height:</span>
            {pokeman.height}
          </p>
          <h2 className="mt-6 mb-2 text-2xl">Types</h2>
          {pokeman.types.map((type) => (
            <p key="index">{type.type.name}</p>
          ))}
        </div>
      </div>
      <p className="mt-10 text-center">
        <Link href="/">
          <a className="text-2xl underline">Home</a>
        </Link>
      </p>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedId = ('00' + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedId}.png`;
    pokeman.image = image;

    return {
      props: {
        pokeman,
      },
    };
  } catch (error) {
    console.error(error);
  }
};

export default Pokemon;
