export function getPlayers(id) {
  let url = `http://ferret:8001/api/competitions/${id}/players`;
  return fetch(url, {method: 'GET',
                     headers: new Headers({'Accept': 'application/json'})})
    .then(response => {
      return new Promise((resolve) => {
        resolve(response.json());;
      });
    })
    .catch(response => console.log("Error!"));
}
