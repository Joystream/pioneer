export const report = async (image: string) => {
  if (process.env.REACT_APP_IMAGE_REPORT_API_URL) {
    return fetch(process.env.REACT_APP_IMAGE_REPORT_API_URL, {
      method: 'POST',
      headers: parseHeaders(process.env.REACT_APP_IMAGE_SAFETY_REPORT_HEADERS),
      body: (process.env.REACT_APP_IMAGE_SAFETY_REPORT_BODY_TEMPLATE ?? '{image}')
        .replace('{image}', image)
        .replace('{context}', window.location.href),
    })
  }
}

function parseHeaders(headers = '') {
  return Object.fromEntries(
    headers.split('\n').flatMap((header) => {
      const [, key, value] = header.match(/(\w[^\s:]+)\s*:\s*(.+)/) ?? []
      return !key || !value ? [] : [[key, value]]
    })
  )
}
