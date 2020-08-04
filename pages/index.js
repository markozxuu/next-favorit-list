import Link from 'next/link';
import { useState, useEffect } from 'react';
import slugify from '@sindresorhus/slugify';
import useWishlist from '../hooks/useWishList';
const Index = (props) => {
    const { allCharacter } = props;
    const [all, setAll] = useState(allCharacter);
    const { wishList, addWishList } = useWishlist();
    useEffect(() => {
        if(localStorage.getItem('wishlist')) {
            const wishList = JSON.parse(localStorage.getItem('wishlist'));
            const res = all.map((obj) => wishList.find((item) => item.id === obj.id) || obj);
            setAll(res);
        }
    console.log('mounting')
    return () => console.log('unmounting')
    }, []);
    return (
        <>
        <h1>Lista de personajes</h1>
            <Link href="/wishlist">
              <a>wishlist - {wishList.length}</a>
            </Link>
            {all.map((item) => {
                return (
                    <div key={item.id} style={{ textAlign: 'center' }}>
                         <Link href="/[slug]" as={`/${slugify(item.name)}`}>
                            <a>{item.name}</a>
                         </Link>
                         <br />
                        <button style={{ background: `${item.isFavorite ? '#000' : 'green'}`, color: '#fff' }} onClick={() => addWishList(item.id, all, setAll)}>Favorito</button>
                    </div>
                )
            })}
        </>
    )
}

export const getStaticProps = async() => {
  const res = await fetch('https://rickandmortyapi.com/api/character/');
  const json = await res.json();
  const data = json.results;
   data.map((item) => {
    item.isFavorite = false;
    return item;
  });
  return {
      props: {
          allCharacter: data
      }
  }
}
export default Index;
