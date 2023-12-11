const axios = require("axios");

const capitalizeString = inputString => {
  const parts = inputString.split('/');

  const capitalizedParts = parts.map(part => {
      if (part === part.toUpperCase()) {
          return part.charAt(0) + part.slice(1).toLowerCase();
      } else if (part === part.toLowerCase()) {
          return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      } else {
          return part;
      }
  });

  const resultString = capitalizedParts.join('/');

  return resultString;
};

const translate = async (color) => {

const options = {
  method: 'POST',
  url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
  params: {
    'to[0]': 'es',
    'api-version': '3.0',
    profanityAction: 'NoAction',
    textType: 'plain'
  },
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'd2211adac8msh10b35b17ccb3806p13cdcdjsnd587b98ef700',
    'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
  },
  data: [
    {
      Text: color
    }
  ]
};

try {
	const response = await axios.request(options);
	return capitalizeString(response.data[0].translations[0].text)
} catch (error) {
	console.error(error);
}
};

module.exports = {
  translate
}