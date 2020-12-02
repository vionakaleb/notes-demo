import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import db from "../persistence/database";
import { userReducer, noteReducer } from "./reducers";

const reducer = combineReducers({
    notes: noteReducer,
    user: userReducer
});

const initialState = {
    notes: {
        stale: false
    },
    user: {
        stale: false
    }
};

// Because SSR cannot access localStorage, in this case set notes and user
// data to stale so that they will be retrieved when the components they are
// needed for mount.
if (db.type === "localStorage") {
    initialState.notes = {
        notes: [],
        stale: true
    };
    initialState.user = {
        stale: true
    };
} else {
    initialState.notes.notes = db.getNotes();
    initialState.user = db.getUser();
}

export default () =>
    createStore(
        reducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunk))
    );
