
export const fetchAPI = (api) => 
    fetch(`${JSON.parse(process.env.ELECTRON_PROD) ? 'http://localhost:8080/api' : '/api'}${api}`)