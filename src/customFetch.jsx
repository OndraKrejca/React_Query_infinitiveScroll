import axios from 'axios'
import { useGlobalContext } from './context'
import { useInfiniteQuery } from '@tanstack/react-query'

const clientID = `?client_id=${import.meta.env.VITE_API_KEY}`
const mainUrl = 'https://api.unsplash.com/photos'
const searchUrl = 'https://api.unsplash.com/search/photos'

export const useInfinitiveScroll = () => {
  const { searchTerm } = useGlobalContext()

  const getFetch = async (page, searchItem) => {
    let url
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${searchItem}`

    if (searchTerm) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }
    const { data } = await axios.get(url)

    return data
  }

  const {
    data,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['images', searchTerm],
    queryFn: ({ pageParam = 1 }) => getFetch(pageParam, searchTerm),

    getNextPageParam: (lastPage, allPages) => {
      const maxPage = Math.ceil(lastPage.total_pages / 10)
      const nextPage = allPages.length + 1
      if (!searchTerm) {
        return nextPage <= 10 ? nextPage : undefined
      }
      return nextPage <= maxPage ? nextPage : undefined
    },
  })

  return {
    data,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  }
}
