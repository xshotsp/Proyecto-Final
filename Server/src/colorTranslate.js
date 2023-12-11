const axios = require("axios");

const capitalizeString = inputString => {
  const words = inputString.split(' ');

  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  const resultString = capitalizedWords.join(' ');

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
  translate,capitalizeString
}