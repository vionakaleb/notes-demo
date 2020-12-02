import ReactMarkdown from "react-markdown";

import { colors, fonts, sizes } from "../styles/base";

export default class EditableTextBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: !!props.editing,
            value: props.value
        };
    }

    handleText = () => {
        if (this.state.editing) {
            this.setState({
                editing: false
            });
            const trimmedValue = this.state.value.trim();
            if (trimmedValue && trimmedValue !== this.props.value) {
                this.props.onEdit(trimmedValue);
            } else {
                this.state.value = this.props.value;
            }
        }
    };

    onFieldBlur = () => {
        if (this.state.editing) {
            this.handleText();
        }
    };

    onFieldChanged = even => {
        this.setState({
            value: event.target.value
        });
    };

    onFieldClicked = event => {
        this.setState({
            editing: true
        });
    };

    render() {
        // Set the # of rows for the textarea to at least 6:
        const lines = this.state.value.split("\n").length;
        const rows = lines > 6 ? lines : 6;

        return (
            <React.Fragment>
                {this.state.editing ? (
                    <textarea
                        className={"etb"}
                        autoFocus
                        onBlur={this.onFieldBlur}
                        onChange={this.onFieldChanged}
                        rows={rows}
                        type="text"
                        value={this.state.value}
                    />
                ) : (
                    <React.Fragment>
                        <div className={"etb"} onClick={this.onFieldClicked}>
                            <ReactMarkdown source={this.props.value} />
                        </div>
                    </React.Fragment>
                )}
                <style jsx>{`
                    .etb {
                        background: #ddd;
                        color: black;
                        font-family: ${fonts.main};
                        font-size: 1.6rem;
                        line-height: 100%;
                        padding: ${sizes.sm};
                        width: 100%;
                    }
                `}</style>
                <style global jsx>{`
                    .etb ul,
                    .etb ol {
                        list-style-position: inside;
                    }
                    .etb * {
                        padding: ${sizes.xs};
                    }
                    .etb a {
                        color: ${colors.tr};
                        font-weight: 700;
                    }
                    .etb h1,
                    .etb h2,
                    .etb h3,
                    .etb h4,
                    .etb h5,
                    .etb h6 {
                        padding: ${sizes.sm} ${sizes.xs} ${sizes.md} ${sizes.xs};
                    }
                `}</style>
            </React.Fragment>
        );
    }
}
