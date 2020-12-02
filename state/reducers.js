import { noteActions, userActions } from "./actions";

export const noteReducer = (state = {}, action) => {
    let notes = [];
    switch (action.type) {
        case noteActions.ADD_NOTE:
            notes = state.notes ? [action.note, ...state.notes] : [action.note];
            return {
                ...state,
                notes
            };
        case noteActions.REMOVE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.noteId)
            };
        case noteActions.SET_NOTES:
            return {
                ...state,
                notes: [...action.notes],
                stale: false
            };
        case noteActions.UPDATE_NOTE:
            notes = state.notes.map(note => {
                return note.id === action.noteId
                    ? { ...note, ...action.updates }
                    : note;
            });
            return {
                ...state,
                notes
            };
        default:
            return state;
    }
};

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case userActions.CLEAR_USER:
            return {};
        case userActions.SET_USER:
            return {
                ...action.user
            };
        case userActions.UPDATE_USER:
            return {
                ...state,
                ...action.updates
            };
        default:
            return state;
    }
};
