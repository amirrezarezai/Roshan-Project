import { SET_DATA,SET_LOADING} from "../actions/dashboardActions";

const initialState = {
  data: [],
  loading:false,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {  
    case SET_DATA:  
      return { ...state, data: action.payload };  
    case SET_LOADING:  
      return { ...state, loading: action.payload };   
    default:  
      return state;  
  } 
};

export default dashboardReducer;
