export function getPlayers(id) {
  let url = `http://localhost:8001/api/players/${id}`;
  return fetch(url, {method: 'GET',
                     headers: new Headers({'Accept': 'application/json'})})
    .then(response => {
      return new Promise((resolve) => {
        resolve(response.json());;
      });
    })
    .catch(response => console.log("Error!"));
}
