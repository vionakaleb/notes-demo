import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactGA from "react-ga";
import { Transition, animated } from "react-spring";

import Header from "../components/Header";
import Layout from "../components/Layout";
import {
    addNoteToDB,
    refreshNotesFromDB,
    removeNoteFromDB,
    updateNoteInDB,
    loadUserFromDB,
    updateUserInDB
} from "../state/actions";
import NewNote from "../components/NewNote";
import NoteList from "../components/NoteList";
import { sortOptions, sortFuncs } from "../lib/sortOptions";
import { colors, fonts, sizes } from "../styles/base";
import "../styles/fontawesome";

class Index extends React.Component {
    constructor(props) {
        super(props);

        let sort = sortOptions.CREATED_DESC;
        if (this.props.user.saveSort && this.props.user.sort) {
            sort = this.props.user.sort;
        } else if (this.props.user.defaultSort) {
            sort = this.props.user.defaultSort;
        }
        this.state = {
            addingNote: false,
            filter:
                (this.props.user.saveFilter && this.props.user.filter) || "",
            newNote: {
                name: "",
                content: ""
            },
            sort
        };
    }

    async componentDidMount() {
        if (!window.GAInitialized) {
            ReactGA.initialize("UA-132781874-1");
            window.GAInitialized = true;
        }
        ReactGA.pageview(window.location.pathname + window.location.search);

        // Primarily needed because when localStorage is used for persistance,
        // it creates an issue with hydrating SSR'd HTML if data is included
        // on very first render. Not applicable when persistant storage is
        // available server-side as well (in this case this.props.notesAreStale
        // will evaluate to false).
        if (this.props.notesAreStale) {
            this.props.refreshNotes();
        }
        if (this.props.userIsStale) {
            await this.props.loadUser();
        }

        if (this.props.user.saveSort && this.props.user.sort) {
            this.setState({ sort: this.props.user.sort });
        } else if (this.props.user.defaultSort) {
            this.setState({ sort: this.props.user.defaultSort });
        }

        if (this.props.user.saveFilter && this.props.user.filter) {
            this.setState({ filter: this.props.user.filter });
        }
    }

    onAddClicked = () => {
        this.setState({
            addingNote: true,
            newNote: { name: "Enter Title", content: "Enter Note" }
        });
    };

    onNewNoteCanceled = () => {
        this.setState({
            addingNote: false,
            newNote: {
                name: "",
                content: ""
            }
        });
    };

    onNewNoteSaved = () => {
        this.props.onNoteAdded({ ...this.state.newNote });
        this.setState({
            addingNote: false,
            newNote: {
                name: "",
                content: ""
            }
        });
    };

    onNewNoteEdited = async updates => {
        // This function awaits the setState callback before
        // returning so that the calling code can make sure
        // state is up to date before the new note is saved.
        await new Promise(resolve => {
            this.setState(
                {
                    newNote: {
                        ...this.state.newNote,
                        ...updates
                    }
                },
                resolve
            );
        });
    };

    onFilterBlur = event => {
        const filter = event.target.value;
        if (this.props.user.saveFilter) {
            this.props.updateUser({ filter });
        }
    };

    onFilterChanged = event => {
        const filter = event.target.value;
        this.setState({ filter });
    };

    onSortChanged = event => {
        const sort = event.target.value;
        this.setState({ sort });
        if (this.props.user.saveSort) {
            this.props.updateUser({ sort });
        }
    };

    render() {
        const sort =
            sortFuncs[this.state.sort] || sortFuncs[sortOptions.CREATED_DESC];
        const noteListProps = {
            notes: this.props.notes
                .filter(note => {
                    const filter = this.state.filter.trim().toLowerCase();
                    return (
                        note.content.toLowerCase().includes(filter) ||
                        note.name.toLowerCase().includes(filter)
                    );
                })
                .sort((note1, note2) => sort(note1, note2))
                .map(note => ({
                    ...note,
                    onDelete: () => this.props.onNoteDeleted(note.id),
                    onEdit: updates => this.props.onNoteEdited(note, updates)
                }))
        };

        const newNoteProps = {
            ...this.state.newNote,
            editing: true,
            onCancel: this.onNewNoteCanceled,
            onEdit: this.onNewNoteEdited,
            onSave: this.onNewNoteSaved
        };

        return (
            <Layout>
                <Header text="Home" fontSize="3.2rem" />
                <div className="list-controls">
                    <div className="left-controls">
                        <button
                            className="add-button"
                            disabled={this.state.addingNote}
                            onClick={this.onAddClicked}
                        >
                            <FontAwesomeIcon
                                aria-label={"Add a note"}
                                className={"add-icon"}
                                icon={"plus-circle"}
                            />
                            <div className="add-text">Add</div>
                        </button>
                    </div>
                    <div className="right-controls">
                        <div className={"filter-control"}>
                            <label>
                                <FontAwesomeIcon
                                    aria-label={"Filter notes"}
                                    className={"filter-icon"}
                                    icon={"filter"}
                                />
                                <div className="filter-text">Filter</div>
                                <input
                                    type="text"
                                    onBlur={this.onFilterBlur}
                                    onChange={this.onFilterChanged}
                                    value={this.state.filter}
                                />
                            </label>
                        </div>
                        <div className={"sort-control"}>
                            <label>
                                <FontAwesomeIcon
                                    aria-label={"Change sort method"}
                                    className={"sort-icon"}
                                    icon={"sort-amount-down"}
                                />
                                <div className="sort-text">Sort</div>
                                <select
                                    disabled={
                                        !(
                                            this.props.user &&
                                            this.props.user.defaultSort
                                        )
                                    }
                                    value={this.state.sort}
                                    onChange={this.onSortChanged}
                                >
                                    <option value={sortOptions.CREATED_DESC}>
                                        Created (Newest-Oldest)
                                    </option>
                                    <option value={sortOptions.CREATED_ASC}>
                                        Created (Oldest-Newest)
                                    </option>
                                    <option value={sortOptions.TITLE_A_Z}>
                                        Title (A-Z)
                                    </option>
                                    <option value={sortOptions.TITLE_Z_A}>
                                        Title (Z-A)
                                    </option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
                <NoteList {...noteListProps}>
                    {this.state.addingNote && (
                        <Transition
                            items={this.state.addingNote}
                            native
                            from={{ opacity: 0, height: 0 }}
                            enter={{ opacity: 1, height: "auto" }}
                            leave={{ opacity: 0, height: 0 }}
                        >
                            {addingNote =>
                                addingNote &&
                                (props => (
                                    <animated.div style={props}>
                                        <NewNote {...newNoteProps} />
                                    </animated.div>
                                ))
                            }
                        </Transition>
                    )}
                </NoteList>
                <style jsx>{`
                    .list-controls {
                        align-items: start;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        padding: ${sizes.sm};
                    }
                    .add-button {
                        align-items: center;
                        border: none;
                        background: ${colors.bg};
                        color: ${colors.fg};
                        cursor: pointer;
                        display: flex;
                        font-family: ${fonts.main};
                        font-size: 2rem;
                        justify-content: flex-start;
                        margin-bottom: ${sizes.md};
                    }
                    .add-button:hover {
                        color: ${colors.tr};
                    }
                    .add-button:disabled {
                        color: gray;
                        cursor: not-allowed;
                    }
                    .add-text {
                        font-size: 1.4rem;
                        padding: ${sizes.xs};
                    }
                    .right-controls {
                        align-items: baseline;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                    }
                    .filter-control {
                        font-size: 2rem;
                        margin-bottom: ${sizes.md};
                        padding-right: ${sizes.sm};
                    }
                    .filter-control label {
                        display: flex;
                    }
                    .filter-control input {
                        border: none;
                        background: #dddddd;
                        font-family: ${fonts.main};
                        padding: ${sizes.xs};
                    }
                    .sort-control {
                        font-size: 2rem;
                    }
                    .sort-control label {
                        display: flex;
                    }
                    .sort-control select {
                        background: #dddddd;
                        border: none;
                        font-family: ${fonts.main};
                        padding: ${sizes.xs};
                    }
                    .filter-text,
                    .sort-text {
                        font-size: 1.4rem;
                        margin-right: ${sizes.sm};
                        padding: ${sizes.xs};
                        width: 5rem;
                    }

                    @media (min-width: ${sizes.breakpoint}) {
                        .list-controls {
                            flex-direction: row;
                            margin-bottom: ${sizes.sm};
                            margin-top: ${sizes.lg};
                        }
                        .add-button {
                            font-size: 2.5rem;
                            margin: 0;
                        }
                        .add-text,
                        .filter-text,
                        .sort-text {
                            font-size: 1.8rem;
                        }
                        .right-controls {
                            flex-direction: row;
                        }
                        .filter-control {
                            font-size: 2.5rem;
                            margin-bottom: 0;
                            margin-right: ${sizes.sm};
                        }
                        .sort-control {
                            font-size: 2.5rem;
                        }
                    }
                `}</style>
                {/* Global (non-scoped) CSS needed for the FontAwesome icon: */}
                <style global jsx>{`
                    .add-icon,
                    .filter-icon,
                    .sort-icon {
                        color: ${colors.sd};
                        margin-right: ${sizes.sm};
                        padding: 0;
                    }
                    .add-icon {
                        display: block;
                    }
                    .add-button:hover .add-icon {
                        color: ${colors.tr};
                    }
                    .add-button:disabled .add-icon {
                        color: gray;
                    }
                `}</style>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    loadUser: () => dispatch(loadUserFromDB()),
    onNoteAdded: note => dispatch(addNoteToDB(note)),
    onNoteDeleted: noteId => dispatch(removeNoteFromDB(noteId)),
    onNoteEdited: (note, updates) => dispatch(updateNoteInDB(note, updates)),
    refreshNotes: () => dispatch(refreshNotesFromDB()),
    updateUser: updates => dispatch(updateUserInDB(updates))
});

const mapStateToProps = state => ({
    notes: state.notes.notes,
    notesAreStale: state.notes.stale,
    user: state.user,
    userIsStale: state.user.stale
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);
