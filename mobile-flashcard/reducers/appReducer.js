import {
  ALL_DECKS,
  ALL_FLASHCARDS,
  NEW_DECK,
  NEW_FLASHCARD,
  DELETE_DECK
} from "../actions/app";

export function decks(state = {}, action) {
  switch (action.type) {
    case ALL_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ALL_FLASHCARDS:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          flashcards: action.flashcards,
        },
      };
    case NEW_DECK:
      return {
        ...state,
        [action.deck.id]: action.deck,
      };
    case NEW_FLASHCARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          flashcards: {
            ...(state[action.deckId].flashcards || {}),
            [action.flashcard.id]: action.flashcard,
          },
        },
      };
    case DELETE_DECK:
      const copy = {};
      Object.assign(copy, state);
      delete copy[action.deckId];
      return copy;
    default:
      return state;
  }
}
