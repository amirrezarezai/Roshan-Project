import { useState } from "react"
import Show from "./Show"
import axios from 'axios';
import Swal from "sweetalert2";

const LoadFile = () =>{
    const [open, setOpen] = useState(0)
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
    const handleLoadFile = () =>{
      axios.post('/api2/api/transcribe_files/', {
      //   media_urls: [  
      //     link  
      // ] 
      formdata: [
        {
          "key": "language",
          "value": "FA",
          "type": "text"
        },
        {
          "key": "media",
          "type": "file",
          "src": "/home/mrh/Music/02.wav"
        }
      ]
      }, {
        headers: {  
          Authorization: `Token d3a08cd693cdac5e8eb50c10ada68b98bfea1f09`,   
      } 
      })
      .then(function (response) {
        console.log(response.data);
        // setData(response.data)
        // setOpen(1)
        
      })
      .catch(function (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      });
    }
    return(
        <>
        {open === 0  && <div className="content">
              <button className="load-button" style={{ marginRight: "10rem" }} onClick={()=>handleLoadFile()}>
                <svg
                  width="33"
                  height="28"
                  viewBox="0 0 33 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.7187 19.6195L16.2801 14.1809L10.8415 19.6195"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.2797 14.1809V26.4177"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M27.6869 22.8689C29.0131 22.146 30.0607 21.002 30.6644 19.6175C31.2681 18.233 31.3936 16.6869 31.0211 15.2232C30.6485 13.7595 29.7991 12.4615 28.607 11.5341C27.4148 10.6068 25.9478 10.1028 24.4374 10.1018H22.7242C22.3127 8.51 21.5456 7.03219 20.4807 5.77948C19.4158 4.52678 18.0808 3.53179 16.576 2.86931C15.0712 2.20683 13.4359 1.89411 11.7928 1.95464C10.1498 2.01518 8.54182 2.4474 7.08986 3.21882C5.63791 3.99024 4.37972 5.08077 3.4099 6.40844C2.44007 7.73611 1.78385 9.26636 1.49056 10.8842C1.19727 12.5019 1.27455 14.1652 1.71658 15.7488C2.15861 17.3324 2.9539 18.7952 4.04265 20.0273"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21.7187 19.6195L16.2801 14.1809L10.8415 19.6195"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <p
                style={{
                  color: "#626262",
                  fontWeight: "300",
                  marginTop: "1rem",
                  width: "415px",
                  height: "56px",
                  textAlign: "center",
                  marginRight: "-1rem",
                }}
              >
                برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید متن
                پیاده شده آن، در اینجا ظاهر می شود
              </p>
            </div>} 
        {open === 1 && <Show />}
        </>
    )
}

export default LoadFile