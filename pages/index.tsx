import { GetStaticProps } from 'next';
import Layout from '../components/Layout';

export default function Home({ pokemon }) {
  console.log(pokemon);
  return (
    <Layout title="Next.js Pokedex">
      <h1 className="mb-8 text-4xl text-center">Next.js Pokedex</h1>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    console.log(res);
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedId = ('00' + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
      return {
        ...result,
        image,
      };
    });
    return {
      props: { pokemon },
    };
  } catch (error) {
    console.error(error);
  }
};
