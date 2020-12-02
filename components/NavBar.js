import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import "../styles/fontawesome";

import { colors, fonts, sizes } from "../styles/base";

class NavBar extends React.Component {
    toggleMenu() {
        const menu = document.querySelector(".navlinks-narrow");
        if (!menu) {
            return;
        }

        menu.style.display = menu.style.display === "block" ? "none" : "block";
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="navbar narrow-nav">
                        <div className="logo">notes</div>
                        <FontAwesomeIcon
                            className={"nav-icon"}
                            icon={"bars"}
                            onClick={this.toggleMenu}
                        />
                        <div className="navlinks navlinks-narrow">
                            <Link href="/">
                                <a onClick={this.toggleMenu}>home</a>
                            </Link>
                            <Link href="/about">
                                <a onClick={this.toggleMenu}>about</a>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar wide-nav">
                        <div className="logo">notes</div>
                        <div className="navlinks navlinks-wide">
                            <Link href="/">
                                <a>home</a>
                            </Link>
                            <Link href="/about">
                                <a>about</a>
                            </Link>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .container {
                        background-color: ${colors.bg};
                        border-bottom: 2px solid ${colors.sd};
                        display: flex;
                        margin-bottom: ${sizes.md};
                    }
                    .logo {
                        color: ${colors.sd};
                        font-family: ${fonts.fancy};
                        font-size: 2.4rem;
                        padding: 0 0 ${sizes.xs} ${sizes.md};
                    }
                    .navbar {
                        align-items: baseline;
                        padding: ${sizes.xs} 0 ${sizes.sm} 0;
                        width: 100%;
                    }
                    .narrow-nav {
                        display: block;
                        font-size: 2.4rem;
                    }
                    .wide-nav {
                        display: none;
                    }
                    .navlinks-narrow {
                        display: none;
                        margin-top: ${sizes.xs};
                        text-align: center;
                    }
                    .navlinks-wide {
                        display: flex;
                    }
                    .navlinks {
                        color: ${colors.fg};
                    }
                    .navlinks a {
                        border-top: 1px solid ${colors.sd};
                        color: ${colors.fg};
                        display: block;
                        padding: ${sizes.sm} 0;
                        text-decoration: none;
                    }
                    .navlinks a:last-child {
                        padding: ${sizes.sm} 0 0 0;
                    }
                    .navlinks a:hover {
                        background-color: #333;
                        color: ${colors.sd};
                    }

                    @media (min-width: ${sizes.breakpoint}) {
                        .container {
                            border-bottom: 2px solid ${colors.sd};
                            display: flex;
                            justify-content: space-around;
                            padding-left: ${sizes.sm};
                        }
                        .logo {
                            padding: 0 0 ${sizes.xs} ${sizes.sm};
                        }
                        .navbar {
                            border: none;
                            justify-content: start;
                            padding: ${sizes.sm} 0 ${sizes.sm} 0;
                            width: 800px;
                        }
                        .navlinks a {
                            border: none;
                            padding: 0;
                            margin-right: ${sizes.lg};
                        }
                        .navlinks a:first-child {
                            margin-left: ${sizes.lg};
                        }
                        .navlinks a:last-child {
                            padding: 0;
                        }
                        .narrow-nav {
                            display: none;
                        }
                        .wide-nav {
                            display: flex;
                        }
                    }
                `}</style>
                {/* Global styles needed for FontAwesomeIcon */}
                <style global jsx>{`
                    .nav-icon {
                        color: ${colors.tr};
                        cursor: pointer;
                        position: absolute;
                        top: 0.8rem;
                        right: 1rem;
                    }
                `}</style>
            </React.Fragment>
        );
    }
}

export default NavBar;
