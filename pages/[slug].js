import Link from 'next/link'
import { useState,useEffect } from 'react';
import slugify from '@sindresorhus/slugify';

// Hooks
import useWishList from '../hooks/useWishList';

const Character = (props) => {
    const { character } = props;
    const { toggle } = useWishList();
    const [payloadCharcater, setCharacter] = useState(character);
    useEffect(() => {
        if(localStorage.getItem('wishlist')) {
            const favorites = JSON.parse(localStorage.getItem('wishlist'));
            const onlyFav = favorites.find((item) => item.id === character.id);
            const isOnlyFav = favorites.some((item) => item.id === character.id);
            if(isOnlyFav) {
                setCharacter(onlyFav);
            }
        }
    }, [])
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Hi {payloadCharcater.name}!</h1>
            <button style={{ background: `${payloadCharcater.isFavorite ? '#000' : 'green'}`, color: '#fff' }} onClick={() => toggle(payloadCharcater.id, payloadCharcater, setCharacter) }>Favorito</button>
            <div style={{ marginTop: 10 }}>
              <Link href="/">
                <a>Back to home</a>
               </Link>
            </div>
        </div>
    );
}

export const getStaticPaths = async () => {
    const res = await fetch('https://rickandmortyapi.com/api/character/');
    const json = await res.json();
    const allCharacter = json.results;
    return {
        paths: allCharacter.map((character) => `/${slugify(character.name)}`),
        fallback: false
    }
}

export const getStaticProps = async({ params: { slug } }) => {
    const res = await fetch('https://rickandmortyapi.com/api/character/');
    const json = await res.json();
    const data = await json.results;
    const onlyCharacter = data.find((character) => slugify(character.name) === slug);
    return {
        props: {
            character: onlyCharacter,
        }
    }
}

export default Character;
