export interface BlacklistRecord {
  createdTime: string
  id: string
  fields: {
    url: string
    location: string
    moderatorId: string
    reason: string
  }
}

export const receiveImageBlacklist = () =>
  fetch(
    `https://api.airtable.com/v0/${process.env.REACT_APP_REPORT_BASE_ID}/${process.env.REACT_APP_BLACKLIST_TABLE_ID}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_REPORT_API_KEY}`,
      },
    }
  ).then((res) => res.json())

export const postImageReport = (src: string, pathname: string) =>
  fetch(
    `https://api.airtable.com/v0/${process.env.REACT_APP_REPORT_BASE_ID}/${process.env.REACT_APP_REPORT_TABLE_ID}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_REPORT_API_KEY}`,
      },
      method: 'POST',
      body: JSON.stringify({
        records: [
          {
            fields: {
              location: pathname,
              url: src,
            },
          },
        ],
      }),
    }
  )
