import { colors, fonts, sizes } from "../styles/base";

export default class EditableTextField extends React.Component {
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
        return (
            <React.Fragment>
                {this.state.editing ? (
                    <input
                        className={"etf"}
                        autoFocus
                        onBlur={this.onFieldBlur}
                        onChange={this.onFieldChanged}
                        type="text"
                        value={this.state.value}
                    />
                ) : (
                    <h3 className={"etf"} onClick={this.onFieldClicked}>
                        {this.props.value}
                    </h3>
                )}
                <style jsx>{`
                    .etf {
                        background: ${colors.bg};
                        border: none;
                        color: ${colors.fg};
                        font-family: ${fonts.main};
                        font-size: 2rem;
                        margin: 0 0 ${sizes.sm} 0;
                        outline: none;
                        padding: ${sizes.sm} 0;
                        width: 100%;
                    }
                    h3 {
                        font-weight: 400;
                    }
                    input.etf {
                        background: #444;
                        display: block;
                        padding-left: ${sizes.xs};
                    }
                `}</style>
            </React.Fragment>
        );
    }
}
