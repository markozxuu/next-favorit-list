import { useEffect, useCallback, useState } from 'react'

const STORAGE_KEY = 'wishlist'

const updateStorage = (data) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

const useWishList = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    const wishlist = localStorage.getItem(STORAGE_KEY)

    if (wishlist) {
      setList(JSON.parse(wishlist))
    }
  }, [])

  const toggle = useCallback((id) => {
    setList((list) => {
      const index = list.findIndex((item) => item === id)

      if (index === -1) {
        // Not included in the wishlist, add the ID
        const newList = [...list, id]
        updateStorage(newList)
        return newList
      } else {
        //   Already included in the wishlist, remove the ID
        const newList = [...list]
        newList.splice(index, 1)
        updateStorage(newList)
        return newList
      }
    })
  }, [])

  const removeWishList = useCallback((id) => {
    setList((list) => {
      const index = list.findIndex((item) => item === id);
      const newList = [...list]
      newList.splice(index, 1)
      updateStorage(newList)
      return newList
    })
  }, [])

  return {
    wishlist: list,
    toggle,
    removeWishList,
  }
}

export default useWishList
