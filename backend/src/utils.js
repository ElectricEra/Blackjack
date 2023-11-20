// A map to convert cards to points
export const convertRanksToPoints = (rank) => {
  const map = {
    'ace': [1, 11],
    'king': 10,
    'queen': 10,
    'jack': 10,
    '10': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2
  };

  return map[rank];
}

export const generateRandomString = (length) => {
  const availableCharacters = '1234567890abcdefghijklmnopqrstuvwxyz';

  let randomString = '';
  for (let i = 0; i < length; i++) {
    randomString += availableCharacters[Math.floor(Math.random() * availableCharacters.length)]
  }

  return randomString
};
