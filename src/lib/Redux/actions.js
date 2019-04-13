export const login = (user) => {
    return {
        type: "LOGIN",
        user
    }
  }
  
  
  export const logout = () => {
    return {
        type: "LOGOUT",
    }
  }
  
  export const message = () => {
    return {
        type: "OK_MESSAGE",
        message
    }
  }
  
  export const errorMessageAction = (message) => {
    return {
        type: "ADD_MESSAGE",
        message
    }
  }
  
  export const imgUpload = (e) => {
    return {
        type: "IMG_UPLOAD",
        image: e.image
    }
  }