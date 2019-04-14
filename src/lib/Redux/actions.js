export const addToColl = (col) => {
    return {
        type: "ADD_TO_COLLECTION",
        col
    }
  }
  
  export const RemoveFromColl = (col) => {
    return {
        type: "REMOVE_FROM_COLLECTION",
        col
    }
  }