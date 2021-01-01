import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Link from 'next/link';

export interface Pokemon {
  name: string;
  url: string;
  image: string;
}

const Home = ({ pokemon }: { pokemon: Pokemon[] }) => {
  return (
    <Layout title="Next.js Pokedex">
      <h1 className="mb-8 text-4xl text-center">Next.js Pokedex</h1>
      <ul>
        {pokemon.map((pokeman, index) => (
          <li key={index}>
            <Link href={`/pokemon/${index + 1}`}>
              <a className="flex items-center p-4 my-2 text-lg capitalize bg-gray-100 border rounded-md border-gray">
                <img
                  className="w-20 h-20 mr-3"
                  src={pokeman.image}
                  alt={pokeman.name}
                />
                <span className="mr-2 font-bold">{index + 1}.</span>
                {pokeman.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const { results } = await res.json();
    const pokemon: Pokemon = results.map((result, index) => {
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

export default Home;
