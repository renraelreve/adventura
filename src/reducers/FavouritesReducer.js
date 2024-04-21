export const defaultFavourite = {
  name: "",
  rating: 4,
  comment: "",
  id: "",
}

export function favouriteReducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVOURITE': 
      return {...state, 
        createdAt: state.createdAt,
        name: state.name,
        rating: 4,
        comment: "",
    }
    
    case 'CHANGE_RATING': {
      return {...state, rating: action.rating};
    }

    case 'ADD_COMMENT': {
      return {...state, comment: action.comment }
    }   
    
    default:
      throw Error('favouriteReducer: unknown action:' + action.type);
  }
}