export const reducer = (state, action) => {
  if (action.type === 'DARKTHEME') {
    const newDarkTheme = !state.isDarkTheme

    const body = document.querySelector('body')
    body.classList.toggle('dark-theme', newDarkTheme)
    localStorage.setItem('theme', newDarkTheme)

    return {
      ...state,
      isDarkTheme: newDarkTheme,
    }
  }

  if (action.type === 'SEARCHITEMS') {
    return {
      ...state,
      searchTerm: action.payload,
    }
  }

  if (action.type === 'SETNEWIMAGE') {
    return {
      ...state,
      newImage: action.payload,
    }
  }

  if (action.type === 'SETPAGE') {
    const newPage = state.page + 1

    return {
      ...state,
      page: newPage,
    }
  }
}
