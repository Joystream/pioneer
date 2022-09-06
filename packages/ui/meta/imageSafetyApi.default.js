const BlackListHeaders = parseHeaders('$BLACKLIST_HEADERS$')
const ReportHeaders = parseHeaders('$REPORT_HEADERS$')

module.exports = {
  ImageSafetyApi: {
    blacklist: async (jsonPath) => {
      const res = await fetch('$BLACKLIST_ENDPOINT$', {
        method: 'GET',
        headers: BlackListHeaders,
      })

      if (!res.headers.get('Content-Type').includes('application/json')) {
        return (await res.text()).split('\n')
      }

      const jsonRes = await res.json()
      if (jsonRes.error) {
        throw jsonRes.error
      }

      return jsonPath.query(jsonRes, '$BLACKLIST_JSON_PATH$').filter((item) => item && typeof item === 'string')
    },
    report: async (image) => fetch('$REPORT_ENDPOINT$', {
      method: 'POST',
      headers: ReportHeaders,
      body: '$REPORT_BODY$'.replace('{image}', image).replace('{page}', window.location.href),
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
