import { useEffect } from 'react'
import { useCustomFetch } from './customFetch'

const Gallery = () => {
  const {
    data,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useCustomFetch()

  const event = () => {
    let newImages = false

    if (
      window.scrollY + window.innerHeight >=
      document.body.scrollHeight - 10
    ) {
      newImages = true
      fetchNextPage()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', event)

    return () => {
      window.removeEventListener('scroll', event)
    }
  }, [])

  if (isLoading) {
    return (
      <section className='image-container'>
        <p>Loading....</p>
      </section>
    )
  }

  if (isError) {
    return (
      <section className='image-container'>
        <p>Error....</p>
      </section>
    )
  }

  if (data.length < 1) {
    return (
      <section className='image-container'>
        <p>Error data....</p>
      </section>
    )
  }

  console.log(data)

  return (
    <section className='image-container'>
      {data.pages.map((page) => {
        return (page.results || page).map((item) => {
          return (
            <a href={item.links.html} key={item.id}>
              <img
                src={item.urls.regular}
                className='img'
                alt={item.alt_description}
              ></img>
            </a>
          )
        })
      })}
      <div> {isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </section>
  )
}

export default Gallery
