module.exports = {
  ImageSafetyApi: {
    blacklist: async (jsonPath) => {
      const res = await fetch(process.env.IMAGE_SAFETY_BLACKLIST_URL, {
        method: 'GET',
        headers: parseHeaders(process.env.IMAGE_SAFETY_BLACKLIST_HEADERS),
      })

      if (!res.headers.get('Content-Type').includes('application/json')) {
        return (await res.text()).split('\n')
      }

      const jsonRes = await res.json()
      if (jsonRes.error) {
        throw jsonRes.error
      }

      const path = (process.env.IMAGE_SAFETY_BLACKLIST_JSON_PATH ?? '*').replace(/^(?!\$)/, '$..')
      return jsonPath.query(jsonRes, path).filter((item) => item && typeof item === 'string')
    },
    report: async (image) => fetch(process.env.REACT_APP_IMAGE_REPORT_API_URL, {
      method: 'POST',
      headers: parseHeaders(process.env.REACT_APP_IMAGE_SAFETY_REPORT_HEADERS),
      body: (process.env.REACT_APP_IMAGE_SAFETY_REPORT_BODY_TEMPLATE ?? '{image}')
        .replace('{image}', image).replace('{context}', window.location.href),
    })
  }
}

function parseHeaders (headers) {
  return Object.fromEntries(
    headers.split('\n').flatMap((header) => {
      const [, key, value] = header.match(/(\w[^\s:]+)\s*:\s*(.+)/)
      return (!key || !value) ? [] : [[key, value]]
    })
  )
}
