import Link from "next/link";
import ReactGA from "react-ga";

import Header from "../components/Header";
import Layout from "../components/Layout";
import { colors, fonts, sizes, linkStyles } from "../styles/base";

class About extends React.Component {
    componentDidMount() {
        if (!window.GAInitialized) {
            ReactGA.initialize("UA-132781874-1");
            window.GAInitialized = true;
        }
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    render() {
        return (
            <Layout>
                <div className="container">
                    <div className="repo">
                        <h3>repository</h3>
                        <p>
                            To view the full repository on Github, click{" "}
                            <a
                                href="https://github.com/eadevries/notes-a-flexible-demo"
                                target="_blank"
                            >
                                here
                            </a>
                            .
                        </p>
                    </div>
                </div>
                <style jsx>{`
                    h3 {
                        color: ${colors.sd};
                        font-family: ${fonts.fancy};
                        font-size: 2.4rem;
                        margin-bottom: ${sizes.md};
                        margin-top: ${sizes.md};
                    }
                    p {
                        font-size: 1.4rem;
                        line-height: 2.2rem;
                        margin-bottom: ${sizes.sm};
                        text-align: justify;
                    }
                    a {
                        ${linkStyles}
                    }
                    .container {
                        display: flex;
                        flex-direction: column;
                        padding-left: ${sizes.md};
                        padding-right: ${sizes.md};
                    }
                    .demo-link {
                        order: 2;
                    }
                    .technologies {
                        order: 3;
                    }
                    .features {
                        order: 4;
                    }
                    .repo {
                        order: 5;
                    }
                    .creator {
                        order: 6;
                        padding: ${sizes.md} 0;
                    }
                    .demo-link button {
                        border: 1px solid ${colors.sd};
                        background-color: #333;
                        box-shadow: 2px 2px 2px 1px #222;
                        color: ${colors.tr};
                        padding: ${sizes.sm} ${sizes.md};
                        font-family: ${fonts.fancy};
                        font-size: 2.6rem;
                    }
                    .demo-link button:active {
                        background-color: #444;
                        border: 1px solid white;
                        box-shadow: unset;
                    }
                    .demo-link button:hover {
                        cursor: pointer;
                    }


                    @media (min-width: ${sizes.breakpoint}) {
                        p {
                            font-size: 1.6rem;
                            line-height: 2.5rem;
                            margin-bottom: ${sizes.md};
                        }
                        .container {
                            display: grid;
                            grid-column-gap: ${sizes.lg};
                            grid-template-columns: 3fr 1fr;
                            grid-template-areas "technologies creator"
                                                "technologies demo";
                        }
                        .demo-link {
                            grid-area: demo;
                            justify-self: center;
                        }
                        .creator {
                            align-self: start;
                            grid-area: creator;
                            padding: 0 0 ${sizes.md} 0;
                        }
                        .technologies {
                            grid-area: technologies;
                        }
                        .features {
                            grid-column-start: 1;
                            grid-column-end: 2;
                        }
                        .repo {
                            grid-column-start: 1;
                            grid-column-end: 2;
                        }
                    }
                `}</style>
            </Layout>
        );
    }
}

export default About;
