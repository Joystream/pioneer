export const useForumCategoryThreadPage = () => {
  const locationHash = window.location.hash
  const queryString = locationHash.substring(locationHash.indexOf('?'))
  const urlParams = new URLSearchParams(queryString)
  if (urlParams.has('page')) {
    const num = Number(urlParams.get('page')) || 1
    return num
  }
  return 1
}
