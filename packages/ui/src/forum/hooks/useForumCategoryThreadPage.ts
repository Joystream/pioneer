export const useForumCategoryThreadPage = () => {
  const locationHash = window.location.hash
  const queryString = locationHash.substring(locationHash.indexOf('?'))
  const urlParams = new URLSearchParams(queryString)
  return Number(urlParams.get('page')) || 1
}
