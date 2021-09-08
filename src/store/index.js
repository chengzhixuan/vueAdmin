import { createStore, createLogger } from "vuex";
import Public from './modules/Public'
const debug = process.env.NODE_ENV !== 'production'
export default createStore({
    modules: {
        Public
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});