export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(res => {
        if(!res.ok) {
          throw new Error(res.message)
        }
        return res.json()
      })
}

export const postUrl = (url) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    body: JSON.stringify(url),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then (res => {
    if(!res.ok) {
      throw new Error(res.message)
    }
    return res.json()
  })
}