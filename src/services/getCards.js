
async function getCards(url) {
  try {
    const response = await fetch(url);
   

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const result = await response.json();
  
    return result;
  } catch (error) {
    console.error('Error during sending data:', error.message);
  }
}

export default getCards;