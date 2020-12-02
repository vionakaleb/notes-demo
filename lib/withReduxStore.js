import createStore from "../state/createStore";

function getOrCreateStore() {
    if (typeof window === "undefined") {
        return createStore();
    }

    const key = "__REDUX_STORE__";
    if (!window[key]) {
        window[key] = createStore();
    }
    return window[key];
}

export default App => {
    return class AppWithRedux extends React.Component {
        constructor(props) {
            super(props);
            this.store = getOrCreateStore();
        }

        static async getInitialProps(appContext) {
            const store = getOrCreateStore();

            appContext.ctx.store = store;

            let props = {};
            if (typeof App.getInitialProps === "function") {
                props = await App.getInitialProps(appContext);
            }

            return {
                ...props,
                initialReduxState: store.getState()
            };
        }

        render() {
            return <App {...this.props} store={this.store} />;
        }
    };
};
