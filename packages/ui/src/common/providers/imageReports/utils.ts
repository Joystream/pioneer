export const postImageReport = (src: string) =>
  fetch(process.env.REACT_APP_BLACKLIST_TABLE_POST_URL ?? '', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_BLACKLIST_API_KEY}`,
    },
    method: 'POST',
    body: process.env.REACT_APP_BLACKLIST_POST_PAYLOAD_SCAFFOLD
      ? process.env.REACT_APP_BLACKLIST_POST_PAYLOAD_SCAFFOLD.replace('{value}', src)
      : '',
  })
