export function getPlayers(id) {
  let url = `http://ferret:8001/api/competitions/${id}/players`;
  return fetch(url, {method: 'GET',
                     headers: new Headers({'Accept': 'application/json'})})
    .then(response => {
      if(response.ok) {
        return new Promise((resolve) => {
          resolve(response.json());
        });
      }
      else {
        return new Promise((resolve, reject) => {
          reject(response);
        });
      }
    });
}
