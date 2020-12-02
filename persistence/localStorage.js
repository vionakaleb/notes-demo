const storageAvailable = type => {
    if (typeof window === "undefined") {
        return false;
    }
    try {
        const storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // testing name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0
        );
    }
};

const addNote = note => {
    const notes = getNotes();
    notes.push(note);
    try {
        localStorage.setItem("notes", JSON.stringify(notes));
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const deleteNote = noteID => {
    const notes = getNotes().filter(note => note.id !== noteID);
    try {
        localStorage.setItem("notes", JSON.stringify(notes));
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const getNotes = () => {
    if (localStorage.getItem("notes")) {
        const notes = JSON.parse(localStorage.getItem("notes"));
        if (!(notes instanceof Array)) {
            return [];
        } else {
            return notes;
        }
    } else {
        return [];
    }
};

const updateNote = (id, updates) => {
    const notes = getNotes();
    const updatedNote = notes.find(note => note.id === id);
    if (!updatedNote) {
        console.error(`Could not find existing note with ID ${id}`);
        return false;
    }
    try {
        localStorage.setItem(
            "notes",
            JSON.stringify(
                notes.map(note => {
                    if (note.id === id) {
                        return {
                            ...note,
                            ...updates
                        };
                    } else {
                        return note;
                    }
                })
            )
        );
        return true;
    } catch (e) {
        console.error("Could not update note in DB");
        return false;
    }
};

const getUser = () => {
    let userString;
    try {
        userString = localStorage.getItem("user");
    } catch (e) {
        console.error(e);
        return;
    }
    if (userString) {
        return JSON.parse(userString);
    } else {
        return {};
    }
};

const updateUser = updates => {
    const user = getUser();
    const updatedUser = {
        ...user,
        ...updates
    };
    try {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return true;
    } catch (e) {
        console.error("Could note update user in DB");
        return false;
    }
};

export default (() => {
    const type = "localStorage";
    if (typeof window === "undefined") {
        // No data can be retrieved from localStorage when SSR'ing
        return {
            type,
            getNotes: () => [],
            getUser: () => {}
        };
    } else if (!storageAvailable("localStorage")) {
        console.error("Local storage not available");
        return;
    }

    return {
        type,
        addNote,
        deleteNote,
        getNotes,
        updateNote,
        getUser,
        updateUser
    };
})();
