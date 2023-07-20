import React, { useEffect, useState } from 'react'
import { useGlobalContext } from './context'
import { useInfinitiveScroll } from './customFetch'

const Gallery = () => {
  const { searchTerm } = useGlobalContext()

  const {
    data,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfinitiveScroll()

  const event = () => {
    let newImage = false

    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 20
    ) {
      newImage = true
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
        <h4> Loading...</h4>
      </section>
    )
  }

  if (isError) {
    return (
      <section className='image-container'>
        <h4> Error...</h4>
      </section>
    )
  }

  if (data.length < 1) {
    return (
      <section className='image-container'>
        <h4> Error...</h4>
      </section>
    )
  }

  return (
    <section className='image-container'>
      {data.pages.map((page) => {
        return (page.results || page).map((item) => {
          return (
            <img
              src={item.urls.regular}
              className='img'
              key={item.id}
              alt={item.alt_description}
            />
          )
        })
      })}
      <div></div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </section>
  )
}

export default Gallery
