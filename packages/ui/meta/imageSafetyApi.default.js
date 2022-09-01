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

      if (res.headers.get('Content-Type') === 'application/json') {
        return jsonPath.query(await res.json(), '$BLACKLIST_JSON_PATH$').filter((item) => typeof item === 'string')
      } else {
        return (await res.text()).split('\n')
      }
    },
    report: async (url) => fetch('$REPORT_ENDPOINT$', {
      headers: {
        'Content-Type': 'application/json',
        ...ReportBearer ? { Authorization: `Bearer ${ReportBearer}` } : {},
      },
      method: 'POST',
      body: '$REPORT_BODY$'.replace('{value}', url),
    })
  }
}
