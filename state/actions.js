import moment from "moment";
import uuid from "uuid/v1";

import userDefaults from "../lib/userDefaults";
import db from "../persistence/database";

const noteActions = {
    ADD_NOTE: "ADD_NOTE",
    REMOVE_NOTE: "REMOVE_NOTE",
    SET_NOTES: "SET_NOTES",
    UPDATE_NOTE: "UPDATE_NOTE"
};

const userActions = {
    CLEAR_USER: "CLEAR_USER",
    SET_USER: "SET_USER",
    UPDATE_USER: "UPDATE_USER"
};

const addNote = note => ({
    type: noteActions.ADD_NOTE,
    note
});

const removeNote = noteId => ({
    type: noteActions.REMOVE_NOTE,
    noteId
});

const setNotes = notes => ({
    type: noteActions.SET_NOTES,
    notes
});

const updateNote = (noteId, updates) => ({
    type: noteActions.UPDATE_NOTE,
    noteId,
    updates
});

const addNoteToDB = note => {
    return async dispatch => {
        const createdAt = moment();
        const id = uuid();
        if (await db.addNote({ ...note, createdAt: createdAt.format(), id })) {
            dispatch(addNote({ ...note, createdAt, id }));
        } else {
            console.error("Could not add note to DB");
        }
    };
};

const refreshNotesFromDB = () => {
    return async dispatch => {
        const dbNotes = await db.getNotes();
        const notes = dbNotes.map(note => ({
            ...note,
            createdAt: moment(note.createdAt)
        }));
        if (notes) {
            dispatch(setNotes(notes));
        } else {
            console.error("Could note get notes from DB");
        }
    };
};

const removeNoteFromDB = noteId => {
    return async dispatch => {
        if (await db.deleteNote(noteId)) {
            dispatch(removeNote(noteId));
        } else {
            console.error("Could not remove note from DB");
        }
    };
};

const updateNoteInDB = (note, updates) => {
    return async dispatch => {
        if (await db.updateNote(note.id, updates)) {
            dispatch(updateNote(note.id, updates));
        } else {
            console.error("Could not update note in DB");
        }
    };
};

const clearUser = () => ({
    type: userActions.CLEAR_USER
});

const setUser = user => ({
    type: userActions.SET_USER,
    user
});

const updateUser = updates => ({
    type: userActions.UPDATE_USER,
    updates
});

const loadUserFromDB = () => {
    return async dispatch => {
        const user = await db.getUser();
        if (user) {
            dispatch(
                setUser({
                    ...userDefaults,
                    ...user,
                    stale: false
                })
            );
        } else {
            console.error("Could not load user from DB");
        }
    };
};

const updateUserInDB = updates => {
    return async (dispatch, getState) => {
        const updatedUser = {
            ...getState().user,
            ...updates
        };
        if (await db.updateUser(updatedUser)) {
            dispatch(
                updateUser({
                    ...updates
                })
            );
        } else {
            console.error("Could not update user in DB");
        }
    };
};

export {
    noteActions,
    userActions,
    addNoteToDB,
    refreshNotesFromDB,
    removeNoteFromDB,
    updateNoteInDB,
    loadUserFromDB,
    updateUserInDB
};
