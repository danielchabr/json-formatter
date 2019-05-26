import {
    combineReducers,
    createStore,
    Reducer,
    Store,
    applyMiddleware,
    compose,
} from 'redux'
import thunk from 'redux-thunk'
import dataReducer, { DataShape } from './data/reducer'

export interface StoreShape {
    data: DataShape
}

const reducer = combineReducers({
    data: dataReducer as Reducer,
}) as Reducer

const enhancers: any[] = []

if (window !== undefined) {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__())
    }
}

const store: Store<StoreShape> = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        ...enhancers
    )
)

export default store
