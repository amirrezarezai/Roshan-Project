import { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import axios from "axios";
import ArchiveDetail from "../components/ArchiveDetail";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

const Archive = () => {
  const [open, setOpen] = useState(0);
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false)
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [page,setPage] = useState(1)
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

  const previousPage = () => {
    if(data.previous){
      setPage(page-1)
    }
  }

  const nextPage = () => {
    if(data.next){
      setPage(page+1)
    }
  }

  useEffect(() => {
    axios
      .get(`/api/requests/?page=${page}`, {
        headers: {
          Authorization: `Token a85d08400c622b50b18b61e239b9903645297196`,
        },
      } ,setLoading(true))
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
        setLoading(false)
      });
  }, [refreshCounter,page]);

  return (
    <div className="archive-page">
      <SideMenu step={1} />
      <div className="content">
        {open === 0 && (
          <div
            className="dropdown-up-close"
            onClick={() => setOpen(1)}
            style={{ top: "2rem", marginRight: "75%" }}
          >
            <svg
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: "0.5rem" }}
            >
              <path
                d="M16.3874 16.1875V14.6458C16.3874 13.8281 16.0626 13.0438 15.4843 12.4656C14.9061 11.8874 14.1218 11.5625 13.3041 11.5625H7.13741C6.31966 11.5625 5.5354 11.8874 4.95716 12.4656C4.37893 13.0438 4.05408 13.8281 4.05408 14.6458V16.1875"
                stroke="#00BA9F"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.2207 8.47917C11.9235 8.47917 13.304 7.09871 13.304 5.39583C13.304 3.69296 11.9235 2.3125 10.2207 2.3125C8.51778 2.3125 7.13733 3.69296 7.13733 5.39583C7.13733 7.09871 8.51778 8.47917 10.2207 8.47917Z"
                stroke="#00BA9F"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p style={{ marginRight: "0.4rem" }}>مهمان</p>
            <svg
              width="7"
              height="5"
              viewBox="0 0 7 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: "0.8rem", marginTop: "0.6rem" }}
            >
              <path
                d="M4.65282 4.12713C4.25404 4.58759 3.53973 4.58759 3.14096 4.12713L1.08888 1.7576C0.528006 1.10995 0.988058 0.102941 1.84481 0.102941L5.94896 0.102942C6.80571 0.102942 7.26577 1.10995 6.70489 1.7576L4.65282 4.12713Z"
                fill="#00BA9F"
              />
            </svg>
          </div>
        )}
        {open === 1 && (
          <div
            className="dropdown-up-open"
            onClick={() => setOpen(0)}
            style={{ top: "2rem", marginRight: "75%" }}
          >
            <div className="up">
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "0.5rem" }}
              >
                <path
                  d="M16.3874 16.1875V14.6458C16.3874 13.8281 16.0626 13.0438 15.4843 12.4656C14.9061 11.8874 14.1218 11.5625 13.3041 11.5625H7.13741C6.31966 11.5625 5.5354 11.8874 4.95716 12.4656C4.37893 13.0438 4.05408 13.8281 4.05408 14.6458V16.1875"
                  stroke="#00BA9F"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.2207 8.47917C11.9235 8.47917 13.304 7.09871 13.304 5.39583C13.304 3.69296 11.9235 2.3125 10.2207 2.3125C8.51778 2.3125 7.13733 3.69296 7.13733 5.39583C7.13733 7.09871 8.51778 8.47917 10.2207 8.47917Z"
                  stroke="#00BA9F"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p style={{ marginRight: "0.4rem" }}>مهمان</p>
              <svg
                width="7"
                height="5"
                viewBox="0 0 7 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "0.8rem", marginTop: "0.6rem" }}
              >
                <path
                  d="M4.65282 0.872872C4.25404 0.412411 3.53973 0.41241 3.14096 0.872872L1.08888 3.2424C0.528006 3.89005 0.988058 4.89706 1.84481 4.89706L5.94896 4.89706C6.80571 4.89706 7.26577 3.89005 6.70489 3.2424L4.65282 0.872872Z"
                  fill="#00BA9F"
                />
              </svg>
            </div>
            <svg
              width="84"
              height="1"
              viewBox="0 0 84 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "relative",
                bottom: "1.2rem",
                marginRight: "0.5rem",
              }}
            >
              <line
                x1="0.3"
                y1="0.7"
                x2="83.7"
                y2="0.7"
                stroke="#00BA9F"
                stroke-width="0.6"
                stroke-linecap="round"
              />
            </svg>
            <div className="down">
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "0.5rem" }}
              >
                <path
                  d="M4.24988 7.5H12.607"
                  stroke="#00BA9F"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.74553 1H2.45089C1.63839 1 1 1.63839 1 2.39286V12.5491C1 13.3616 1.63839 14 2.45089 14H6.74553"
                  stroke="#00BA9F"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.4021 5.29468L12.6075 7.50003L10.4021 9.70539"
                  stroke="#00BA9F"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p
                style={{
                  marginRight: "0.4rem",
                  position: "absolute",
                  left: "2.5rem",
                  bottom: "-1.5rem",
                }}
              >
                خروج
              </p>
            </div>
          </div>
        )}
        <div className="header">آرشیو من</div>
        {!loading && <div className="archive">
          <div className="table">
            <div className="header-table">
              <div></div>
              <p>نام فایل</p>
              <p>تاریخ بارگذاری</p>
              <p>نوع فایل</p>
              <p>مدت زمان</p>
              <div></div>
            </div>
            {data.results &&
              data.results.map((item) => <ArchiveDetail item={item} setRefreshCounter={setRefreshCounter}  />)}
          </div>
          <div className="pagination">
            <button className="pagination-btn" onClick={()=>previousPage()} >
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.418713 9.29766C0.335878 9.29764 0.254908 9.27716 0.186044 9.23879C0.117181 9.20043 0.0635161 9.14591 0.0318369 9.08212C0.000157703 9.01834 -0.00811283 8.94817 0.00807135 8.88047C0.0242555 8.81277 0.0641673 8.75059 0.122759 8.70179L4.98896 4.64663L0.122759 0.591457C0.0464711 0.525635 0.00425808 0.437476 0.00521228 0.345969C0.00616649 0.254462 0.0502116 0.166928 0.127861 0.10222C0.20551 0.0375125 0.310551 0.000808365 0.42036 1.31932e-05C0.530168 -0.000781979 0.635959 0.0343954 0.714946 0.0979689L5.87738 4.4C5.95589 4.46544 6 4.5542 6 4.64674C6 4.73928 5.95589 4.82804 5.87738 4.89349L0.714946 9.19551C0.676037 9.22792 0.62985 9.25362 0.579022 9.27114C0.528193 9.28867 0.47372 9.29768 0.418713 9.29766Z"
                  fill="black"
                />
              </svg>
            </button>
            {data.previous && <p style={{marginLeft:'0.5rem',marginRight:'0.5rem'}}>{page-1}</p>}
            <p style={{
              background:'#07B49B',
              color:'#FFFFFF',
              fontWeight:'400',
              borderRadius:'50%',
              width:'1.5rem',
              height:'1.5rem',
              paddingRight:'0.5rem',
              paddingTop:'0.1rem',
              marginLeft:'0.5rem',
              marginRight:'0.5rem',
            }}>{page}</p>
            {data.next && <p style={{marginLeft:'0.5rem',marginRight:'0.5rem'}}>{page+1}</p>}
            <button className="pagination-btn" onClick={()=>nextPage()}>
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.58129 9.29766C5.66412 9.29764 5.74509 9.27716 5.81396 9.23879C5.88282 9.20043 5.93648 9.14591 5.96816 9.08212C5.99984 9.01834 6.00811 8.94817 5.99193 8.88047C5.97574 8.81277 5.93583 8.75059 5.87724 8.70179L1.01104 4.64663L5.87724 0.591457C5.95353 0.525635 5.99574 0.437476 5.99479 0.345969C5.99383 0.254462 5.94979 0.166928 5.87214 0.10222C5.79449 0.0375125 5.68945 0.000808365 5.57964 1.31932e-05C5.46983 -0.000781979 5.36404 0.0343954 5.28505 0.0979689L0.12262 4.4C0.044107 4.46544 0 4.5542 0 4.64674C0 4.73928 0.044107 4.82804 0.12262 4.89349L5.28505 9.19551C5.32396 9.22792 5.37015 9.25362 5.42098 9.27114C5.47181 9.28867 5.52628 9.29768 5.58129 9.29766Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </div>}
        {loading && <Spinner style={{color:'#00ba9f',marginTop:'5rem',marginRight:'45%'}} animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>}
      </div>
    </div>
  );
};
export default Archive;
