import {_addDeck, _addFlashcard, _getDecks, _deleteDeck} from '../utils/api'

export const ALL_DECKS = 'ALL_DECKS'
export const DELETE_DECK = 'DELETE_DECK'
export const ALL_FLASHCARDS = 'ALL_FLASHCARDS'
export const NEW_DECK = 'NEW_DECK'
export const NEW_FLASHCARD = 'NEW_FLASHCARD'

export function allDecks(decks) {
    return {
        type: ALL_DECKS,
        decks
    }
}

export function deleteDeck(deckId) {
    return {
        type: DELETE_DECK,
        deckId
    }
}

export function newDeck(deck) {
    return {
        type: NEW_DECK,
        deck: deck
    }
}

export function newFlashcard(deckId, flashcard) {
    return {
        type: NEW_FLASHCARD,
        deckId: deckId,
        flashcard: flashcard
    }
}

export function getAllDecks() {
    return (dispatch) => {
        _getDecks().then(decks => {
            dispatch(allDecks(decks))
        });
    };
}

export function handleDeleteDeck(deckId) {
    return (dispatch) => {
        _deleteDeck(deckId).then(() => dispatch(deleteDeck(deckId)));
    }
}

export function createNewDeck(title,deckId) {
    return (dispatch) => {
        _addDeck(title,deckId).then((deck) => dispatch(newDeck(deck)))
    }
}

export function createNewFlashcard(deckId,formValues) {
    return (dispatch) => {
        _addFlashcard(deckId,formValues)
            .then((flashcard) => dispatch(newFlashcard(deckId, flashcard)))
    }
}