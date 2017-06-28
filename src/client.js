import fetch from 'isomorphic-fetch';

const apiUrl = "http://soccer-players.us-east-2.elasticbeanstalk.com";

export function getPlayers(id) {
  let url = `${apiUrl}/api/competitions/${id}/players`;
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
