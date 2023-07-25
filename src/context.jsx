import React, { useContext, useState, useEffect, useReducer } from 'react'

import { reducer } from './reducer'
const AppContext = React.createContext()

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches
  const setTheme = localStorage.getItem('theme') === true
  return setTheme || prefersDarkMode
}

const initialState = {
  isDarkTheme: getInitialDarkMode(),
  searchTerm: '',
}

// URL

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const toggleDarkTheme = () => {
    dispatch({ type: 'DARKTHEME' })
  }

  const searchItems = (text) => {
    dispatch({ type: 'SEARCHITEMS', payload: text })
  }

  useEffect(() => {
    document.body.classList.toggle('dark-theme', state.isDarkTheme)
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleDarkTheme,
        searchItems,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
