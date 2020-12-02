import { colors, fonts, sizes } from "../styles/base";

const Header = props => (
    <React.Fragment>
        <div className="header">
            <h1>{props.text}</h1>
            {props.tagline && <p className="tagline">{props.tagline}</p>}
        </div>
        <style jsx>{`
            .header {
                margin-bottom: ${sizes.md};
                padding-left: ${sizes.xs};
            }
            h1 {
                color: ${colors.tr};
                font-family: ${fonts.fancy};
                font-size: ${props.fontSize || "4rem"};
                margin-bottom: ${sizes.xs};
            }

            @media (min-width: ${sizes.breakpoint}) {
                .header {
                    margin-bottom: ${sizes.lg};
                }
            }
        `}</style>
    </React.Fragment>
);
export default Header;
