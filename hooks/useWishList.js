import { useEffect } from 'react';
import useSwr from 'swr';

const STORAGE_KEY = 'wishlist';

const useWishList = () => {
    const { data: items, mutate: setItem } = useSwr('wishList', {
        initialData: []
    });
    useEffect(() => {
        if(localStorage.getItem(STORAGE_KEY)) {
            const data = JSON.parse(localStorage.getItem(STORAGE_KEY))
            setItem(data);
        }
    }, []);
    const addWishList = (id, state, updateState) => {
        const isDuplicated = items.some((item) => item.id === id);
        if (isDuplicated) {
            const removeFavorites = state.map((item) => {
                if(item.id === id) {
                  item.isFavorite = false; 
                }
                return item;
            });
            updateState(removeFavorites);
            const newList = items.filter((item) => item.id !== id);    
            setItem(newList);
            const serializeItems = JSON.stringify(newList);
            localStorage.setItem(STORAGE_KEY, serializeItems);
        } else {
            console.log('id diferente');
            const favorites = state.map((item) => {
                if(item.id === id) {
                  item.isFavorite = true; 
                }
                return item;
            });
            const itemFavorite = state.find((item) => item.id === id);
            updateState(favorites);
            setItem([...items, itemFavorite]);
            const serializeItems = JSON.stringify([...items, itemFavorite]);
            localStorage.setItem(STORAGE_KEY, serializeItems);
        }
    };
    const toggle = (id, state, updateState) => {
        const isDuplicated = items.some((item) => item.id === id);
        if(isDuplicated) {
            console.log('existed ID en el array wishlist');
            const x = {
                ...state,
                isFavorite: false 
             }
             const removeItem = items.filter((item) => item.id !== id)
             setItem(removeItem);
             updateState(x);
             const serializeItem = JSON.stringify(removeItem);
             localStorage.setItem(STORAGE_KEY, serializeItem);
        } else {
            console.log('ID no existe en el arrya wishlist');
            const y = {
                ...state,
                isFavorite: true 
             }
             updateState(y);
             setItem([...items, y]);
             const serializeItem = JSON.stringify([...items, y]);
             localStorage.setItem(STORAGE_KEY, serializeItem);
        }
    }
    const removeWishlist = (id, state, updateState) => {
       const removeItem = items.filter((item) => item.id !== id);
       setItem(removeItem);
       updateState(removeItem);
       const serializeItem = JSON.stringify(removeItem);
       localStorage.setItem(STORAGE_KEY, serializeItem);
    }
    return {
        wishList: items,
        addWishList,
        toggle,
        removeWishlist,
    }
}

export default useWishList;
