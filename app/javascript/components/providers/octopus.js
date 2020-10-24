import axios from 'axios'

function parseText(text) {
  return text.split("\n");
}

function fetchRaw(url, token) {
  return axios.get(url,
    {
      headers: {
        'AccessToken': token
      },
      responseType: 'json',
      transformResponse: [
        function (data) {
          let result = []
          for (var i = 0; i < data["data"].length; i++) {
            result.push([
              data["data"][i]["attributes"]["name"],
              data["data"][i]["attributes"]["avatar_url"] || "http://gravatar.com/avatar/00000000000000000000000000000000.png?d=mm"
            ])
          }

          return result
        }
      ]
    }
  )
}

const PATTERN = /^https:\/\/api\.tinypulse\.com\/pulse\/v1\/organizations\/\d+\/leaders\?.*\n[a-z0-9]+/

export default {
  fetch(text) {
    return fetchRaw(...parseText(text))
  },
  isMatch(text) {
    return PATTERN.test(text)
  }
}
