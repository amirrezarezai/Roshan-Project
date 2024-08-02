import axios from "axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const SET_ARCHIVE_DATA = 'SET_ARCHIVE_DATA';  
export const SET_LOADING = 'SET_LOADING';  
export const SET_REFRESH_COUNTER = 'SET_REFRESH_COUNTER';  
export const SET_PAGE = 'SET_PAGE';  

export const setArchiveData = (data) => ({  
  type: SET_ARCHIVE_DATA,  
  payload: data,  
});  

export const setLoading = (loading) => ({  
  type: SET_LOADING,  
  payload: loading,  
});  

export const setRefreshCounter = (counter) => ({  
  type: SET_REFRESH_COUNTER,  
  payload: counter,  
});  

export const setPage = (page) => ({  
  type: SET_PAGE,  
  payload: page,  
});  

export const fetchArchiveData = (page) => {  
  return (dispatch) => {  
    dispatch(setLoading(true));  
    axios.get(`/api1/api/requests/?page=${page}`, {  
      headers: {  
        Authorization: `Token a85d08400c622b50b18b61e239b9903645297196`,  
      },  
    })  
    .then((response) => {  
      dispatch(setArchiveData(response.data));  
      dispatch(setLoading(false));  
    })  
    .catch((error) => {  
      dispatch(setLoading(false));  
      Toast.fire({
              icon: "error",
              title: error.message,
            });
    });  
  };  
};