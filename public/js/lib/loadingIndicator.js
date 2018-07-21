const isLoading = () => $('#progress').is(':visible')
const setLoading = (state) => $('#progress').toggle(state)

export {
  isLoading,
  setLoading
}
