import EditableTextBox from "../components/EditableTextBox";
import EditableTextField from "../components/EditableTextField";
import { colors, fonts, sizes } from "../styles/base";

class NewNote extends React.Component {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();
        this.contentRef = React.createRef();
        this.state = {
            editing: !!props.editing
        };
    }

    onEdit = updates => this.props.onEdit(updates);

    onFieldEdited = fieldName => update => this.onEdit({ [fieldName]: update });

    onSave = async () => {
        if (this.props.name !== this.nameRef.current.state.value.trim()) {
            await this.onFieldEdited("name")(
                this.nameRef.current.state.value.trim()
            );
        }
        if (this.props.content !== this.contentRef.current.state.value.trim()) {
            await this.onFieldEdited("content")(
                this.contentRef.current.state.value.trim()
            );
        }
        this.props.onSave();
    };

    render() {
        return (
            <div>
                <div className="note-container">
                    <EditableTextField
                        editing={this.state.editing}
                        onEdit={this.onFieldEdited("name")}
                        ref={this.nameRef}
                        value={this.props.name || "Enter Title"}
                    />
                    <EditableTextBox
                        onEdit={this.onFieldEdited("content")}
                        ref={this.contentRef}
                        value={this.props.content || "Enter Note"}
                    />
                    <div className="buttons">
                        <button onMouseDown={this.onSave}>Save</button>
                        <button onMouseDown={this.props.onCancel}>
                            Discard
                        </button>
                    </div>
                </div>
                <style jsx>{`
                    div.note-container {
                        margin-bottom: ${sizes.sm};
                        padding: ${sizes.sm};
                    }
                    button {
                        border: none;
                        background-color: #666666;
                        color: ${colors.fg};
                        cursor: pointer;
                        font-family: ${fonts.main};
                        margin-right: ${sizes.sm};
                        margin-top: ${sizes.sm};
                        padding: ${sizes.sm};
                    }
                    .buttons {
                        display: flex;
                        justify-content: flex-start;
                    }
                `}</style>
            </div>
        );
    }
}

export default NewNote;
