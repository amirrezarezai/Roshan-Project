import { useState } from "react";
import SideMenu from "../components/SideMenu";
import Uploading from "../components/dashboardPage/Uploading";
import { useDispatch, useSelector } from 'react-redux';  
import { setOpenDropdown } from '../redux/actions/dashboardActions';  


const Dashboard = () => {
  
  const [open, setOpen] = useState(0);


  return (
    <div className="dashboard-page">
      <SideMenu step={0} />
      <div className="content">
        {open === 0 && (
          <div className="dropdown-up-close" onClick={() => setOpen(1)}>
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
            <p style={{ marginRight: "0.4rem",}}>مهمان</p>
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
          <div className="dropdown-up-open" onClick={() => setOpen(0)}>
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
        <div className="header">
          <p
            style={{
              fontWeight: "700",
              color: "#00BA9F",
              fontSize: "28px",
              marginRight: "30%",
              marginTop: "10%",
            }}
          >
            تبدیل گفتار به متن
          </p>
          <p style={{ fontWeight: "400", fontSize: "16px",color:'#969696',width:'434px',height:'56px',textAlign:'center',marginRight:'5rem' }}>
            آوا با استفاده از هزاران ساعت گفتار با صدای افراد مختلف،
             زبان فارسی
            را یاد گرفته است و می‌تواند متن صحبت‌ها را بنویسد.
          </p>
        </div>
        <div className="uploading">
            <Uploading />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
