const initialStore = {
    collection: [],
}

export const rootReducer = (store = initialStore, action) => {
    switch(action.type){
        case "ADD_TO_COLLECTION":
            store = {
                ...store,
                collection: [...store.collection, action.collection],
            }
        break;
        case "REMOVE_FROM_COLLECTION":
            store = {
                ...store,
                collection: [...store.collection.filter(i => i.id !== action.collection.id)]
            }
        break;
        default: return store
    }
    return store
}