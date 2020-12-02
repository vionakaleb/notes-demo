import { Transition, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Note from "./Note";
import { sizes } from "../styles/base";

class NoteList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                {this.props.children}
                <div className="container">
                    {this.props.notes.length > 0 || this.props.children ? (
                        <Transition
                            items={this.props.notes}
                            keys={note => note.id}
                            native
                            from={{ opacity: 0, height: 0 }}
                            enter={{ opacity: 1, height: "auto" }}
                            leave={{ opacity: 0, height: 0 }}
                        >
                            {item => props => (
                                <animated.div style={props}>
                                    <Note key={item.id} {...item} />
                                </animated.div>
                            )}
                        </Transition>
                    ) : (
                        <div className="empty-list">
                            <p>No notes found!</p>
                            <p>
                                <em>
                                    You can always add one by clicking the{" "}
                                    <FontAwesomeIcon icon={"plus-circle"} />{" "}
                                    icon above— or if you've already added some,
                                    try changing your filter.
                                </em>
                            </p>
                        </div>
                    )}
                </div>
                <style jsx>{`
                    .container {
                        position: relative;
                        padding-left: ${sizes.sm};
                        padding-right: ${sizes.sm};
                    }
                    .empty-list {
                        background-color: #333;
                        padding: ${sizes.md};
                    }
                    .empty-list p {
                        line-height: 1.5;
                        margin-bottom: ${sizes.md};
                    }
                `}</style>
            </React.Fragment>
        );
    }
}

export default NoteList;
