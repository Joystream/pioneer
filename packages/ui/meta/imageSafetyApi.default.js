const BlackListBearer = '$BLACKLIST_BEARER$'
const ReportBearer = '$REPORT_BEARER$'

module.exports = {
  ImageSafetyApi: {
    blacklist: async (jsonPath) => {
      const res = await fetch('$BLACKLIST_ENDPOINT$', {
        headers: {
          ...BlackListBearer ? { Authorization: `Bearer ${BlackListBearer}` } : {},
        },
        method: 'GET',
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
      headers: {
        'Content-Type': 'application/json',
        ...ReportBearer ? { Authorization: `Bearer ${ReportBearer}` } : {},
      },
      method: 'POST',
      body: '$REPORT_BODY$'.replace('{image}', image).replace('{page}', window.location.href),
    })
  }
}
