import { AsyncStorage } from "react-native";

function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

const storageKey = "flashcards:data";

function cardWithId(question, answer) {
  return {
    id: generateUID(),
    question: question,
    answer: answer,
  };
}

function deckWithId(title,deckId) {
  return {
    id: deckId,
    title: title,
    flashcards: {},
  };
}

async function getFromStorage() {
  const decks = await AsyncStorage.getItem(storageKey);
  if (!decks) {
    return {};
  }
  return JSON.parse(decks);
}

export async function _getDecks() {
  const decks = await getFromStorage();
  if (Object.keys(decks).length === 0) {
    return {};
  }
  return decks;
}

async function _saveDecks(decks) {
  await AsyncStorage.setItem(storageKey, JSON.stringify(decks));
}

export async function _addDeck(title,deckId) {
  const formattedDeck = deckWithId(title,deckId);
  const decks = await getFromStorage();
  decks[formattedDeck.id] = formattedDeck;
  await _saveDecks(decks);
  return formattedDeck;
}

export async function _deleteDeck(deckId) {
  const decks = await getFromStorage();
  delete decks[deckId];
  await _saveDecks(decks);
}

export async function _addFlashcard(deckId,formValues) {
  const{question,answer}=formValues;
  const formattedCard = cardWithId(question, answer);
  const decks = await getFromStorage();
  decks[deckId].flashcards[formattedCard.id] = formattedCard;
  await _saveDecks(decks);
  return formattedCard;
}
