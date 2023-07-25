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
}
