const initialStore = {
    user: null,
    image: "",
    message:false,
}

export const rootReducer = (store = initialStore, action) => {
    switch(action.type){
        case "OK_MESSAGE":
            store = {
                ...store,
                message:true,
            }
        break;
        case "NO_MESSAGE":
            store = {
                ...store,
                message:false
            }
        break;
        case "LOGIN":
            store = {
                ...store,
                user: action.user
            }
        break;
        case "LOGOUT":
            store = {
                ...store,
                user: null
            }
        break;
        case "IMG_UPLOAD":
            store = {
                ...store,
                image: action.image
            }
        break;
        default: return store
    }
    // For now, don't handle any actions
    // and just return the store given to us.
    return store
}