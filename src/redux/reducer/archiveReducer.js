 import { SET_ARCHIVE_DATA, SET_LOADING, SET_REFRESH_COUNTER, SET_PAGE } from '../actions/archiveActions';  

const initialState = {  
  data: [],  
  loading: false,  
  refreshCounter: 0,  
  page: 1,  
};  

const archiveReducer = (state = initialState, action) => {  
  switch (action.type) {  
    case SET_ARCHIVE_DATA:  
      return { ...state, data: action.payload };  
    case SET_LOADING:  
      return { ...state, loading: action.payload };  
    case SET_REFRESH_COUNTER:  
      return { ...state, refreshCounter: action.payload };  
    case SET_PAGE:  
      return { ...state, page: action.payload };  
    default:  
      return state;  
  }  
};  

export default archiveReducer;