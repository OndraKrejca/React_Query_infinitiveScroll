import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useGlobalContext } from './context'

const clientID = `?client_id=${import.meta.env.VITE_API_KEY}`
const mainUrl = 'https://api.unsplash.com/photos'
const searchUrl = 'https://api.unsplash.com/search/photos'

export const useCustomFetch = () => {
  const { searchTerm } = useGlobalContext()

  const getFetch = async (page, searchItem) => {
    let url
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${searchItem}`

    if (searchItem) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }

    const { data } = await axios.get(url)
    return data
  }

  const {
    data,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['images', searchTerm],
    queryFn: ({ pageParam = 1 }) => getFetch(pageParam, searchTerm),
    getNextPageParam: (lastPage, allPages) => {
      const maxPage = Math.ceil(lastPage.total_pages / 10)
      const nextPage = allPages.length + 1

      if (!searchTerm) {
        return nextPage <= 10 ? nextPage : undefined
      } else {
        return nextPage <= maxPage ? nextPage : undefined
      }
    },
  })

  return {
    data,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  }
}
