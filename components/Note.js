import EditableTextBox from "../components/EditableTextBox";
import EditableTextField from "../components/EditableTextField";
import { colors, fonts, sizes } from "../styles/base";

class Note extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: !!props.editing
        };
    }

    onEdit = updates => this.props.onEdit(updates);

    onFieldEdited = fieldName => update => this.onEdit({ [fieldName]: update });

    render() {
        return (
            <div>
                <div className="note-container">
                    <EditableTextField
                        editing={this.state.editing}
                        value={this.props.name || "Enter Title"}
                        onEdit={this.onFieldEdited("name")}
                    />
                    <EditableTextBox
                        value={this.props.content || "Enter Note"}
                        onEdit={this.onFieldEdited("content")}
                    />
                    <div className="note-footer">
                        <div>
                            <button onMouseDown={this.props.onDelete}>
                                Delete
                            </button>
                        </div>
                        <div className="timestamp">
                            Created{" "}
                            {this.props.createdAt.format(
                                "MMM. Do YYYY, h:mm:ss a"
                            )}
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    div.note-container {
                        margin-bottom: ${sizes.sm};
                        padding: ${sizes.sm};
                    }
                    .timestamp {
                        color: ${colors.sd};
                        padding: ${sizes.sm} 0 ${sizes.xs} 0;
                    }
                    button {
                        border: none;
                        background-color: #666666;
                        color: ${colors.fg};
                        cursor: pointer;
                        font-family: ${fonts.main};
                        margin-top: ${sizes.sm};
                        padding: ${sizes.sm};
                    }
                    .note-footer {
                        display: flex;
                        justify-content: space-between;
                    }
                `}</style>
            </div>
        );
    }
}

export default Note;
