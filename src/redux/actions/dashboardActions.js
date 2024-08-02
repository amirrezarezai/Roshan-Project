export const SET_DATA = 'SET_DATA';  
export const SET_LOADING = 'SET_LOADING';  

export const setData = (data) => ({  
  type: SET_DATA,  
  payload: data,  
});  

export const setLoading = (loading) => ({  
  type: SET_LOADING,  
  payload: loading,  
}); 
