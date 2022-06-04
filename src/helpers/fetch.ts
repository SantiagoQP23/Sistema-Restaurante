
const baseUrl = process.env.REACT_APP_BASE_URL;

export const fetchSinToken = (endpoint: string, data?: any, method: string = 'GET') => {
  console.log(baseUrl);

  const url = `${baseUrl}/${endpoint}`;

  if (method === 'GET') {
    return fetch(url);

  } else {
    return fetch(url, {
      method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
    
}

export const fetchConToken = (endpoint: string, data?: any, method: string = 'GET') => {

  const url = `${baseUrl}/${endpoint}`;

  const token = localStorage.getItem('x-token') || '';

  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        'x-token': token
      }
    });

  } else {
    return fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify(data)
    })
  }
}

