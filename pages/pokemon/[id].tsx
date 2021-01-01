import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';

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
          {pokeman.types.map((type, index) => (
            <p key={index}>{type.type.name}</p>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
  const { results } = await res.json();

  const paths = results.map((result, index) => ({
    params: { id: `${index + 1}` },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
    const pokeman = await res.json();
    const paddedId = ('00' + params.id).slice(-3);
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
