import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "@mui/material/Slider";
import { useAudio } from "../../hook/useAudio";
import moment from "moment-jalaali";
import axios from "axios";
import Swal from "sweetalert2";
import { setRefreshCounter } from "../../redux/actions/archiveActions";
import { useDispatch, useSelector } from "react-redux";

const ArchiveDetail = ({ item }) => {
  const [openArchive, setOpenArchive] = useState(0);
  const [step, setStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const audioRef = useRef(null);
  const {
    isPaused,
    isMuted,
    currentVolume,
    currentTime,
    play,
    pause,
    togglePause,
    increaseVolume,
    decreaseVolume,
    mute,
    unmute,
    toggleMute,
    forward,
    back,
    handleVolumeChange,
  } = useAudio(audioRef);
  const dispatch = useDispatch();

  const jalaliDate = moment(item.processed.slice(0, 10))
    .locale("fa")
    .format("jYYYY/jM/jD");

  const parseDuration = (duration) => {
    const parts = duration.split(":");
    const hours = parts.length === 3 ? parts[0] : 0;
    const minutes = parts.length === 3 ? parts[1] : parts[0];
    const seconds = parts.length === 3 ? parts[2].split(".")[0] : parts[1];

    return { hours, minutes, seconds };
  };
  const { hours, minutes, seconds } = parseDuration(item.duration);
  const fullText = item.segments.map((segment) => segment.text).join(" ");

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

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const formatTimestamp = (time) => {
    const parts = time.split(":");
    const part2 = parts[2].split(".");

    const minutes = parts[1].padStart(2, "0");
    const seconds = part2[0].padStart(2, "0");

    if (parts[0] !== "0") {
      return `${parts[0]}:${minutes}:${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  const handleDownload = (e) => {
    const a = document.createElement("a");
    a.href = item.url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    e.stopPropagation();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    axios
      .delete(`/api1/api/requests/${item.id}/`, {
        headers: {
          Authorization: `Token a85d08400c622b50b18b61e239b9903645297196`,
        },
      })
      .then(function (response) {
        console.log(response.data);
        dispatch(setRefreshCounter((prevCounter) => prevCounter + 1));
        Toast.fire({
          icon: "success",
          title: "با موفقیت حذف شد",
        });
      })
      .catch(function (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error.message,
        });
      });
  };

  const handleCopy = (e) => {
    Toast.fire({
      icon: "success",
      title: "متن مورد نظر شما کپی شد",
    });
    navigator.clipboard.writeText(fullText);
    e.stopPropagation();
  };

  return (
    <>
      {openArchive === 0 && (
        <div className="content-table" onClick={() => setOpenArchive(1)}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="15.8801"
              cy="15.645"
              rx="15.8801"
              ry="15.645"
              fill="#FF1654"
            />
            <path
              d="M15.1553 10.8238L17.0139 8.99267C18.1892 7.9694 19.9385 8.07712 20.9772 9.2081C21.9338 10.2314 21.9338 11.8201 20.9772 12.8703L19.0912 14.7014L19.6652 15.2669L21.5512 13.4089C22.9451 12.0355 22.8905 9.77359 21.4692 8.40025C20.0752 7.08077 17.8613 7.08077 16.4673 8.40025L14.5813 10.2314C13.1873 11.6316 13.1873 13.8667 14.5813 15.2669L15.1553 14.7014C14.0893 13.6243 14.0893 11.9009 15.1553 10.8238Z"
              fill="white"
            />
            <path
              d="M14.8272 23.1032L16.7132 21.2721C18.1072 19.8718 18.1072 17.6368 16.7132 16.2634L16.1392 16.8289C17.2325 17.906 17.2325 19.6294 16.1392 20.7066L14.2532 22.5377C13.1599 23.6148 11.4106 23.6148 10.3173 22.5377C9.22401 21.4606 9.22401 19.7372 10.3173 18.66L12.2033 16.8289L11.6293 16.2634L9.77066 18.0945C8.32202 19.4409 8.24003 21.676 9.60666 23.1032C10.9733 24.5304 13.2419 24.6111 14.6906 23.2647C14.7452 23.184 14.7999 23.157 14.8272 23.1032Z"
              fill="white"
            />
            <path
              d="M18.2286 13.8298L17.6488 13.2585L13.1263 17.7141L13.7061 18.2853L18.2286 13.8298Z"
              fill="white"
            />
          </svg>
          <Link
            to={item.url}
            style={{ fontSize: "0.8rem", marginTop: "0.3rem" }}
          >
            ...{item.url.slice(0, 30)}
          </Link>
          <p>{jalaliDate}</p>
          <p>{item.url.slice(-3)}.</p>
          <p>
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}{" "}
          </p>
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => handleDownload(e)}
          >
            <path
              d="M6.39307 10C6.32739 10.0001 6.26235 9.98485 6.20166 9.95523C6.14098 9.92561 6.08584 9.88217 6.0394 9.82739C5.99296 9.77261 5.95613 9.70757 5.93102 9.63599C5.90591 9.5644 5.89301 9.48768 5.89307 9.41021V0.58979C5.89307 0.433368 5.94574 0.283352 6.03951 0.172745C6.13328 0.0621384 6.26046 0 6.39307 0C6.52567 0 6.65285 0.0621384 6.74662 0.172745C6.84039 0.283352 6.89307 0.433368 6.89307 0.58979V9.41021C6.89307 9.56663 6.84039 9.71665 6.74662 9.82725C6.65285 9.93786 6.52567 10 6.39307 10Z"
              fill={isHovered ? "#00BA9F" : "#8F8F8F"}
            />
            <path
              d="M6.60354 10.5149C6.42349 10.5152 6.24516 10.4799 6.0788 10.4111C5.91243 10.3423 5.76131 10.2412 5.63411 10.1138L2.74082 7.22052C2.6404 7.1201 2.58398 6.9839 2.58398 6.84188C2.58398 6.69986 2.6404 6.56366 2.74082 6.46324C2.84125 6.36281 2.97745 6.3064 3.11947 6.3064C3.26148 6.3064 3.39769 6.36281 3.49811 6.46324L6.39139 9.35652C6.41925 9.38438 6.45233 9.40648 6.48873 9.42156C6.52513 9.43664 6.56414 9.4444 6.60354 9.4444C6.64294 9.4444 6.68195 9.43664 6.71835 9.42156C6.75475 9.40648 6.78782 9.38438 6.81568 9.35652L9.70897 6.46324C9.80998 6.36562 9.94528 6.31159 10.0857 6.31277C10.2262 6.31395 10.3606 6.37025 10.4599 6.46955C10.5593 6.56885 10.6157 6.70319 10.6169 6.84366C10.6182 6.98412 10.5642 7.11946 10.4667 7.22052L7.57297 10.1138C7.44574 10.2412 7.29461 10.3422 7.12825 10.411C6.96189 10.4799 6.78358 10.5152 6.60354 10.5149Z"
              fill={isHovered ? "#00BA9F" : "#8F8F8F"}
            />
            <path
              d="M12.1319 14.5983H1.2892C0.947409 14.5979 0.619735 14.4481 0.378053 14.1818C0.13637 13.9156 0.000411796 13.5546 0 13.178V9.43318C0 9.29109 0.0512319 9.15483 0.142425 9.05437C0.233619 8.9539 0.357303 8.89746 0.48627 8.89746C0.615237 8.89746 0.738922 8.9539 0.830115 9.05437C0.921308 9.15483 0.97254 9.29109 0.97254 9.43318V13.178C0.972643 13.2705 1.00604 13.3592 1.0654 13.4246C1.12476 13.49 1.20525 13.5268 1.2892 13.5269H12.1319C12.2158 13.5268 12.2963 13.49 12.3557 13.4246C12.415 13.3592 12.4484 13.2705 12.4485 13.178V9.43318C12.4485 9.29109 12.4997 9.15483 12.5909 9.05437C12.6821 8.9539 12.8058 8.89746 12.9348 8.89746C13.0638 8.89746 13.1874 8.9539 13.2786 9.05437C13.3698 9.15483 13.4211 9.29109 13.4211 9.43318V13.178C13.4206 13.5546 13.2847 13.9156 13.043 14.1818C12.8013 14.4481 12.4736 14.5979 12.1319 14.5983Z"
              fill={isHovered ? "#00BA9F" : "#8F8F8F"}
            />
          </svg>
          <svg
            width="13"
            height="18"
            viewBox="0 0 13 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
          >
            <path
              d="M11.7 17.08H1.3C0.585 17.08 0 16.495 0 15.78V2.25996C0 1.54496 0.585 0.959961 1.3 0.959961H6.591C6.942 0.959961 7.753 1.25294 8 1.49994L12.5 5.99994C12.747 6.24694 13 7.01796 13 7.36896V15.78C13 16.495 12.415 17.08 11.7 17.08ZM1.3 1.99994C0.871 1.99994 1 1.83096 1 2.25996V15.2031C1 15.6321 1.571 15.9999 2 15.9999H10.5C10.929 15.9999 12 16.209 12 15.78V7.49994C12 7.29194 11.656 6.64294 11.5 6.49994L8.5 3.49994C7.5 2.49994 7 1.99994 7 1.99994H1.3Z"
              fill={isHovered2 ? "#00BA9F" : "#8F8F8F"}
            />
            <path
              d="M8.41107 13.1799H7.33207L6.73407 10.8399C6.70807 10.7619 6.66907 10.5799 6.61707 10.3199C6.56507 10.0599 6.52607 9.87795 6.52607 9.79995C6.51307 9.90395 6.48707 10.0859 6.43507 10.3329C6.38307 10.5799 6.34407 10.7489 6.31807 10.8529L5.72007 13.1799H4.64107L3.51007 8.72095H4.43307L5.00507 11.1519C5.10907 11.6069 5.17407 11.9839 5.22607 12.3219C5.23907 12.2049 5.26507 12.0229 5.30407 11.7889C5.34307 11.5549 5.39507 11.3599 5.42107 11.2299L6.07107 8.73395H6.96807L7.61807 11.2299C7.64407 11.3469 7.68307 11.5159 7.72207 11.7369C7.76107 11.9579 7.80007 12.1659 7.82607 12.3219C7.85207 12.1659 7.87807 11.9709 7.93007 11.7239C7.98207 11.4769 8.02107 11.2949 8.04707 11.1519L8.61907 8.72095H9.54207L8.41107 13.1799Z"
              fill={isHovered2 ? "#00BA9F" : "#8F8F8F"}
            />
          </svg>
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setIsHovered3(true)}
            onMouseLeave={() => setIsHovered3(false)}
            onClick={(e) => handleCopy(e)}
          >
            <path
              d="M6.62156 17.2009H14.4574C14.8664 17.2004 15.2585 17.0233 15.5476 16.7085C15.8368 16.3938 15.9994 15.967 15.9998 15.522V6.99509C15.9993 6.55014 15.8366 6.12358 15.5475 5.80901C15.2583 5.49443 14.8663 5.31753 14.4574 5.31714H6.62202C6.2132 5.31753 5.82123 5.49445 5.53215 5.80904C5.24307 6.12363 5.08051 6.55019 5.08014 6.99509V15.522C5.08038 15.9669 5.24282 16.3936 5.5318 16.7083C5.82078 17.0231 6.2127 17.2003 6.62156 17.2009ZM14.4574 6.56376C14.5626 6.56376 14.6634 6.60919 14.7378 6.69006C14.8122 6.77094 14.8541 6.88065 14.8542 6.99509V15.522C14.8542 15.6365 14.8124 15.7464 14.738 15.8275C14.6636 15.9086 14.5627 15.9542 14.4574 15.9543H6.62202C6.51682 15.954 6.41601 15.9084 6.3417 15.8273C6.2674 15.7463 6.22567 15.6365 6.22567 15.522V6.99509C6.22567 6.88069 6.26743 6.77098 6.34176 6.69009C6.41609 6.6092 6.5169 6.56376 6.62202 6.56376H14.4574Z"
              fill={isHovered3 ? "#00BA9F" : "#8F8F8F"}
            />
            <path
              d="M1.73396 11.8808H5.65028C5.80219 11.8808 5.94787 11.8151 6.05529 11.6982C6.1627 11.5813 6.22305 11.4228 6.22305 11.2575C6.22305 11.0922 6.1627 10.9336 6.05529 10.8167C5.94787 10.6998 5.80219 10.6342 5.65028 10.6342H1.73396C1.62875 10.634 1.52789 10.5885 1.4535 10.5075C1.37911 10.4266 1.33727 10.3168 1.33715 10.2023V1.67795C1.33727 1.56351 1.37913 1.4538 1.45353 1.37292C1.52794 1.29205 1.6288 1.24662 1.73396 1.24662H9.56936C9.67452 1.24662 9.77538 1.29205 9.84978 1.37292C9.92419 1.4538 9.96605 1.56351 9.96617 1.67795V5.94039C9.96617 6.1057 10.0265 6.26424 10.1339 6.38114C10.2413 6.49803 10.387 6.5637 10.5389 6.5637C10.6908 6.5637 10.8365 6.49803 10.9439 6.38114C11.0513 6.26424 11.1117 6.1057 11.1117 5.94039V1.67795C11.1112 1.23344 10.9489 0.807251 10.6602 0.492746C10.3715 0.178241 9.98011 0.00105523 9.57165 0H1.73396C1.3251 0.000395897 0.933077 0.177291 0.643925 0.491867C0.354772 0.806444 0.192105 1.23301 0.19162 1.67795V10.2048C0.192711 10.6494 0.35563 11.0754 0.644704 11.3895C0.933778 11.7036 1.32545 11.8803 1.73396 11.8808Z"
              fill={isHovered3 ? "#00BA9F" : "#8F8F8F"}
            />
          </svg>
          {isHovered4 ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onMouseEnter={() => setIsHovered4(true)}
              onMouseLeave={() => setIsHovered4(false)}
              style={{ marginBottom: "1rem" }}
              onClick={(e) => handleDelete(e)}
            >
              <ellipse
                cx="12.7011"
                cy="12.6332"
                rx="12.7011"
                ry="12.513"
                fill="#DC3545"
              />
              <path
                d="M8.16531 7.56934H16.6194C16.8918 7.56934 17.1111 7.78457 17.1111 8.05192V19.5175C17.1111 19.7848 16.8918 20.0001 16.6194 20.0001H8.16531C7.89289 20.0001 7.67358 19.7848 7.67358 19.5175V8.05192C7.67358 7.78457 7.89289 7.56934 8.16531 7.56934V7.56934Z"
                stroke="white"
                stroke-miterlimit="6.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.70937 6.42236H17.1038"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.72292 9.17505V18.3949"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.3922 9.17505V18.3949"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.0617 9.17505V18.3949"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.0273 6H13.7862"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="11"
              height="16"
              viewBox="0 0 11 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onMouseEnter={() => setIsHovered4(true)}
              onMouseLeave={() => setIsHovered4(false)}
              onClick={(e) => handleDelete(e)}
            >
              <path
                d="M1.49172 2.56934H9.94577C10.2182 2.56934 10.4375 2.78457 10.4375 3.05192V14.5175C10.4375 14.7848 10.2182 15.0001 9.94577 15.0001H1.49172C1.21931 15.0001 1 14.7848 1 14.5175V3.05192C1 2.78457 1.21931 2.56934 1.49172 2.56934V2.56934Z"
                stroke={isHovered4 ? "#ffff" : "#8F8F8F"}
                stroke-miterlimit="6.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.03578 1.42236H10.4302"
                stroke={isHovered4 ? "#ffff" : "#8F8F8F"}
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.04933 4.17505V13.3949"
                stroke={isHovered4 ? "#ffff" : "#8F8F8F"}
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.71863 4.17505V13.3949"
                stroke={isHovered4 ? "#ffff" : "#8F8F8F"}
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.38811 4.17505V13.3949"
                stroke={isHovered4 ? "#ffff" : "#8F8F8F"}
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.35373 1H7.11263"
                stroke={isHovered4 ? "#ffff" : "#8F8F8F"}
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
        </div>
      )}
      {openArchive === 1 && (
        <div className="content-table-up" onClick={() => setOpenArchive(0)}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="15.8801"
              cy="15.645"
              rx="15.8801"
              ry="15.645"
              fill="#FF1654"
            />
            <path
              d="M15.1553 10.8238L17.0139 8.99267C18.1892 7.9694 19.9385 8.07712 20.9772 9.2081C21.9338 10.2314 21.9338 11.8201 20.9772 12.8703L19.0912 14.7014L19.6652 15.2669L21.5512 13.4089C22.9451 12.0355 22.8905 9.77359 21.4692 8.40025C20.0752 7.08077 17.8613 7.08077 16.4673 8.40025L14.5813 10.2314C13.1873 11.6316 13.1873 13.8667 14.5813 15.2669L15.1553 14.7014C14.0893 13.6243 14.0893 11.9009 15.1553 10.8238Z"
              fill="white"
            />
            <path
              d="M14.8272 23.1032L16.7132 21.2721C18.1072 19.8718 18.1072 17.6368 16.7132 16.2634L16.1392 16.8289C17.2325 17.906 17.2325 19.6294 16.1392 20.7066L14.2532 22.5377C13.1599 23.6148 11.4106 23.6148 10.3173 22.5377C9.22401 21.4606 9.22401 19.7372 10.3173 18.66L12.2033 16.8289L11.6293 16.2634L9.77066 18.0945C8.32202 19.4409 8.24003 21.676 9.60666 23.1032C10.9733 24.5304 13.2419 24.6111 14.6906 23.2647C14.7452 23.184 14.7999 23.157 14.8272 23.1032Z"
              fill="white"
            />
            <path
              d="M18.2286 13.8298L17.6488 13.2585L13.1263 17.7141L13.7061 18.2853L18.2286 13.8298Z"
              fill="white"
            />
          </svg>
          <Link style={{ fontSize: "0.8rem", marginTop: "0.3rem" }}>
            ...{item.url.slice(0, 30)}
          </Link>
          <p>{jalaliDate}</p>
          <p>{item.url.slice(-3)}.</p>
          <p>
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}{" "}
          </p>
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => handleDownload(e)}
          >
            <path
              d="M6.39307 10C6.32739 10.0001 6.26235 9.98485 6.20166 9.95523C6.14098 9.92561 6.08584 9.88217 6.0394 9.82739C5.99296 9.77261 5.95613 9.70757 5.93102 9.63599C5.90591 9.5644 5.89301 9.48768 5.89307 9.41021V0.58979C5.89307 0.433368 5.94574 0.283352 6.03951 0.172745C6.13328 0.0621384 6.26046 0 6.39307 0C6.52567 0 6.65285 0.0621384 6.74662 0.172745C6.84039 0.283352 6.89307 0.433368 6.89307 0.58979V9.41021C6.89307 9.56663 6.84039 9.71665 6.74662 9.82725C6.65285 9.93786 6.52567 10 6.39307 10Z"
              fill={isHovered ? "#00BA9F" : "#8F8F8F"}
            />
            <path
              d="M6.60354 10.5149C6.42349 10.5152 6.24516 10.4799 6.0788 10.4111C5.91243 10.3423 5.76131 10.2412 5.63411 10.1138L2.74082 7.22052C2.6404 7.1201 2.58398 6.9839 2.58398 6.84188C2.58398 6.69986 2.6404 6.56366 2.74082 6.46324C2.84125 6.36281 2.97745 6.3064 3.11947 6.3064C3.26148 6.3064 3.39769 6.36281 3.49811 6.46324L6.39139 9.35652C6.41925 9.38438 6.45233 9.40648 6.48873 9.42156C6.52513 9.43664 6.56414 9.4444 6.60354 9.4444C6.64294 9.4444 6.68195 9.43664 6.71835 9.42156C6.75475 9.40648 6.78782 9.38438 6.81568 9.35652L9.70897 6.46324C9.80998 6.36562 9.94528 6.31159 10.0857 6.31277C10.2262 6.31395 10.3606 6.37025 10.4599 6.46955C10.5593 6.56885 10.6157 6.70319 10.6169 6.84366C10.6182 6.98412 10.5642 7.11946 10.4667 7.22052L7.57297 10.1138C7.44574 10.2412 7.29461 10.3422 7.12825 10.411C6.96189 10.4799 6.78358 10.5152 6.60354 10.5149Z"
              fill={isHovered ? "#00BA9F" : "#8F8F8F"}
            />
            <path
              d="M12.1319 14.5983H1.2892C0.947409 14.5979 0.619735 14.4481 0.378053 14.1818C0.13637 13.9156 0.000411796 13.5546 0 13.178V9.43318C0 9.29109 0.0512319 9.15483 0.142425 9.05437C0.233619 8.9539 0.357303 8.89746 0.48627 8.89746C0.615237 8.89746 0.738922 8.9539 0.830115 9.05437C0.921308 9.15483 0.97254 9.29109 0.97254 9.43318V13.178C0.972643 13.2705 1.00604 13.3592 1.0654 13.4246C1.12476 13.49 1.20525 13.5268 1.2892 13.5269H12.1319C12.2158 13.5268 12.2963 13.49 12.3557 13.4246C12.415 13.3592 12.4484 13.2705 12.4485 13.178V9.43318C12.4485 9.29109 12.4997 9.15483 12.5909 9.05437C12.6821 8.9539 12.8058 8.89746 12.9348 8.89746C13.0638 8.89746 13.1874 8.9539 13.2786 9.05437C13.3698 9.15483 13.4211 9.29109 13.4211 9.43318V13.178C13.4206 13.5546 13.2847 13.9156 13.043 14.1818C12.8013 14.4481 12.4736 14.5979 12.1319 14.5983Z"
              fill={isHovered ? "#00BA9F" : "#8F8F8F"}
            />
          </svg>
          <svg
            width="13"
            height="18"
            viewBox="0 0 13 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
          >
            <path
              d="M11.7 17.08H1.3C0.585 17.08 0 16.495 0 15.78V2.25996C0 1.54496 0.585 0.959961 1.3 0.959961H6.591C6.942 0.959961 7.753 1.25294 8 1.49994L12.5 5.99994C12.747 6.24694 13 7.01796 13 7.36896V15.78C13 16.495 12.415 17.08 11.7 17.08ZM1.3 1.99994C0.871 1.99994 1 1.83096 1 2.25996V15.2031C1 15.6321 1.571 15.9999 2 15.9999H10.5C10.929 15.9999 12 16.209 12 15.78V7.49994C12 7.29194 11.656 6.64294 11.5 6.49994L8.5 3.49994C7.5 2.49994 7 1.99994 7 1.99994H1.3Z"
              fill={isHovered2 ? "#00BA9F" : "#8F8F8F"}
            />
            <path
              d="M8.41107 13.1799H7.33207L6.73407 10.8399C6.70807 10.7619 6.66907 10.5799 6.61707 10.3199C6.56507 10.0599 6.52607 9.87795 6.52607 9.79995C6.51307 9.90395 6.48707 10.0859 6.43507 10.3329C6.38307 10.5799 6.34407 10.7489 6.31807 10.8529L5.72007 13.1799H4.64107L3.51007 8.72095H4.43307L5.00507 11.1519C5.10907 11.6069 5.17407 11.9839 5.22607 12.3219C5.23907 12.2049 5.26507 12.0229 5.30407 11.7889C5.34307 11.5549 5.39507 11.3599 5.42107 11.2299L6.07107 8.73395H6.96807L7.61807 11.2299C7.64407 11.3469 7.68307 11.5159 7.72207 11.7369C7.76107 11.9579 7.80007 12.1659 7.82607 12.3219C7.85207 12.1659 7.87807 11.9709 7.93007 11.7239C7.98207 11.4769 8.02107 11.2949 8.04707 11.1519L8.61907 8.72095H9.54207L8.41107 13.1799Z"
              fill={isHovered2 ? "#00BA9F" : "#8F8F8F"}
            />
          </svg>
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setIsHovered3(true)}
            onMouseLeave={() => setIsHovered3(false)}
            onClick={(e) => handleCopy(e)}
          >
            <path
              d="M6.62156 17.2009H14.4574C14.8664 17.2004 15.2585 17.0233 15.5476 16.7085C15.8368 16.3938 15.9994 15.967 15.9998 15.522V6.99509C15.9993 6.55014 15.8366 6.12358 15.5475 5.80901C15.2583 5.49443 14.8663 5.31753 14.4574 5.31714H6.62202C6.2132 5.31753 5.82123 5.49445 5.53215 5.80904C5.24307 6.12363 5.08051 6.55019 5.08014 6.99509V15.522C5.08038 15.9669 5.24282 16.3936 5.5318 16.7083C5.82078 17.0231 6.2127 17.2003 6.62156 17.2009ZM14.4574 6.56376C14.5626 6.56376 14.6634 6.60919 14.7378 6.69006C14.8122 6.77094 14.8541 6.88065 14.8542 6.99509V15.522C14.8542 15.6365 14.8124 15.7464 14.738 15.8275C14.6636 15.9086 14.5627 15.9542 14.4574 15.9543H6.62202C6.51682 15.954 6.41601 15.9084 6.3417 15.8273C6.2674 15.7463 6.22567 15.6365 6.22567 15.522V6.99509C6.22567 6.88069 6.26743 6.77098 6.34176 6.69009C6.41609 6.6092 6.5169 6.56376 6.62202 6.56376H14.4574Z"
              fill={isHovered3 ? "#00BA9F" : "#8F8F8F"}
            />
            <path
              d="M1.73396 11.8808H5.65028C5.80219 11.8808 5.94787 11.8151 6.05529 11.6982C6.1627 11.5813 6.22305 11.4228 6.22305 11.2575C6.22305 11.0922 6.1627 10.9336 6.05529 10.8167C5.94787 10.6998 5.80219 10.6342 5.65028 10.6342H1.73396C1.62875 10.634 1.52789 10.5885 1.4535 10.5075C1.37911 10.4266 1.33727 10.3168 1.33715 10.2023V1.67795C1.33727 1.56351 1.37913 1.4538 1.45353 1.37292C1.52794 1.29205 1.6288 1.24662 1.73396 1.24662H9.56936C9.67452 1.24662 9.77538 1.29205 9.84978 1.37292C9.92419 1.4538 9.96605 1.56351 9.96617 1.67795V5.94039C9.96617 6.1057 10.0265 6.26424 10.1339 6.38114C10.2413 6.49803 10.387 6.5637 10.5389 6.5637C10.6908 6.5637 10.8365 6.49803 10.9439 6.38114C11.0513 6.26424 11.1117 6.1057 11.1117 5.94039V1.67795C11.1112 1.23344 10.9489 0.807251 10.6602 0.492746C10.3715 0.178241 9.98011 0.00105523 9.57165 0H1.73396C1.3251 0.000395897 0.933077 0.177291 0.643925 0.491867C0.354772 0.806444 0.192105 1.23301 0.19162 1.67795V10.2048C0.192711 10.6494 0.35563 11.0754 0.644704 11.3895C0.933778 11.7036 1.32545 11.8803 1.73396 11.8808Z"
              fill={isHovered3 ? "#00BA9F" : "#8F8F8F"}
            />
          </svg>
          {isHovered4 ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onMouseEnter={() => setIsHovered4(true)}
              onMouseLeave={() => setIsHovered4(false)}
              style={{ marginBottom: "1rem" }}
              onClick={(e) => handleDelete(e)}
            >
              <ellipse
                cx="12.7011"
                cy="12.6332"
                rx="12.7011"
                ry="12.513"
                fill="#DC3545"
              />
              <path
                d="M8.16531 7.56934H16.6194C16.8918 7.56934 17.1111 7.78457 17.1111 8.05192V19.5175C17.1111 19.7848 16.8918 20.0001 16.6194 20.0001H8.16531C7.89289 20.0001 7.67358 19.7848 7.67358 19.5175V8.05192C7.67358 7.78457 7.89289 7.56934 8.16531 7.56934V7.56934Z"
                stroke="white"
                stroke-miterlimit="6.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.70937 6.42236H17.1038"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.72292 9.17505V18.3949"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.3922 9.17505V18.3949"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.0617 9.17505V18.3949"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.0273 6H13.7862"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="11"
              height="16"
              viewBox="0 0 11 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onMouseEnter={() => setIsHovered4(true)}
              onMouseLeave={() => setIsHovered4(false)}
              onClick={(e) => handleDelete(e)}
            >
              <path
                d="M1.49172 2.56934H9.94577C10.2182 2.56934 10.4375 2.78457 10.4375 3.05192V14.5175C10.4375 14.7848 10.2182 15.0001 9.94577 15.0001H1.49172C1.21931 15.0001 1 14.7848 1 14.5175V3.05192C1 2.78457 1.21931 2.56934 1.49172 2.56934V2.56934Z"
                stroke={isHovered4 ? "#ffff" : "#8F8F8F"}
                stroke-miterlimit="6.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.03578 1.42236H10.4302"
                stroke={isHovered4 ? "#ffff" : "#8F8F8F"}
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.04933 4.17505V13.3949"
                stroke={isHovered4 ? "#ffff" : "#8F8F8F"}
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.71863 4.17505V13.3949"
                stroke={isHovered4 ? "#ffff" : "#8F8F8F"}
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.38811 4.17505V13.3949"
                stroke={isHovered4 ? "#ffff" : "#8F8F8F"}
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.35373 1H7.11263"
                stroke={isHovered4 ? "#ffff" : "#8F8F8F"}
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}

          <div
            className="show-archive-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="step-buttons">
              <button
                style={
                  step === 0
                    ? {
                        width: "100px",
                        height: "15px",
                        background: "#ffffff00",
                        color: "#000000",
                        border: "none",
                        fontSize: "12px",
                        fontWeight: "400",
                        paddingBottom: "2.2rem",
                        borderBottom: "1px solid #000000",
                      }
                    : {
                        width: "100px",
                        height: "15px",
                        background: "#ffffff00",
                        color: "#000000",
                        border: "none",
                        fontSize: "12px",
                        fontWeight: "400",
                        paddingBottom: "2.2rem",
                        borderBottom: "none",
                      }
                }
                onClick={() => setStep(0)}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginLeft: "0.3rem" }}
                >
                  <path
                    d="M1.47821 3.69568H15.7065"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.35858 6.92932H15.7064"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1.47821 10.163H15.7065"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.35858 13.3967H15.7064"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                متن ساده
              </button>
              <button
                style={
                  step === 1
                    ? {
                        width: "136.81px",
                        height: "15px",
                        background: "#ffffff00",
                        color: "#000000",
                        border: "none",
                        fontSize: "12px",
                        fontWeight: "300",
                        marginRight: "1rem",
                        borderBottom: "1px solid #000000",
                        paddingBottom: "2.1rem",
                      }
                    : {
                        width: "136.81px",
                        height: "15px",
                        background: "#ffffff00",
                        color: "#000000",
                        border: "none",
                        fontSize: "12px",
                        fontWeight: "300",
                        marginRight: "1rem",
                        borderBottom: "none",
                      }
                }
                onClick={() => setStep(1)}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginLeft: "0.3rem" }}
                >
                  <path
                    d="M8.50001 16.8125C6.27938 16.8125 4.19235 15.948 2.62248 14.3775C0.0562897 11.8119 -0.553491 7.92109 1.10604 4.69703C1.25626 4.4055 1.6137 4.29091 1.90582 4.44053C2.19795 4.59016 2.31254 4.94819 2.16232 5.24031C0.739696 8.00362 1.2622 11.3381 3.46204 13.538C4.80748 14.884 6.59645 15.625 8.50001 15.625C10.403 15.625 12.1925 14.884 13.538 13.538C14.8834 12.1919 15.625 10.403 15.625 8.5C15.625 6.59644 14.884 4.80747 13.538 3.46203C12.1919 2.11659 10.4036 1.375 8.50001 1.375C6.59645 1.375 4.80748 2.11659 3.46204 3.46203C3.22988 3.69419 2.85463 3.69419 2.62248 3.46203C2.39032 3.22987 2.39032 2.85462 2.62248 2.62247C4.19235 1.05259 6.27938 0.1875 8.50001 0.1875C10.7206 0.1875 12.8083 1.05259 14.3775 2.62247C15.948 4.19234 16.8125 6.27938 16.8125 8.5C16.8125 10.72 15.948 12.8077 14.3775 14.3775C12.8083 15.948 10.7206 16.8125 8.50001 16.8125Z"
                    fill="black"
                    fill-opacity="0.6"
                  />
                  <path
                    d="M11.4682 11.4688C11.3381 11.4688 11.2075 11.4266 11.0977 11.3387L8.12891 8.96372C7.98819 8.85091 7.90625 8.6805 7.90625 8.5V3.75C7.90625 3.42225 8.17225 3.15625 8.5 3.15625C8.82775 3.15625 9.09375 3.42225 9.09375 3.75V8.215L11.8398 10.4113C12.0957 10.6167 12.1373 10.9902 11.9325 11.2461C11.8149 11.3922 11.6427 11.4688 11.4682 11.4688Z"
                    fill="black"
                    fill-opacity="0.6"
                  />
                </svg>
                متن زمان بندی شده
              </button>
            </div>
            <hr
              width="225rem"
              style={{
                marginRight: "1.5rem",
                position: "relative",
                bottom: "1.55rem",
              }}
            />
            {step === 0 && (
              <div className="archive-text">
                <p>{fullText}</p>
              </div>
            )}
            {step === 1 && (
              <div className="archive-text">
                <div className="table">
                  {item.segments.map((segment) => (
                    <div
                      className="table-row"
                      style={
                        (formatTime(currentTime) >=
                          formatTimestamp(segment.start)) &
                        (formatTime(currentTime) <=
                          formatTimestamp(segment.end))
                          ? { color: "#118AD3" }
                          : {}
                      }
                    >
                      <p style={{ width: "2rem" }}>
                        {formatTimestamp(segment.end)}
                      </p>
                      <p style={{ width: "2rem" }}>
                        {formatTimestamp(segment.start)}
                      </p>
                      <p>{segment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div
              className="audio-player"
              dir="ltr"
              style={{
                width: "0.5rem",
                height: "0.5rem",
                position: "relative",
                bottom: "5.5rem",
                right: "80%",
              }}
            >
              <div>
                <audio ref={audioRef} src={item.url} />
                <div
                  className="player"
                  style={{
                    width: "550px",
                    marginLeft: "2.5rem",
                    background: "#F8F8F8",
                    marginTop: "1.5rem",
                    borderRadius: "10px",
                  }}
                >
                  <button
                    style={{
                      background: "#ffffff00",
                      border: "none",
                      marginLeft: "0.5rem",
                    }}
                    onClick={togglePause}
                  >
                    {!isPaused ? (
                      <svg
                        width="7"
                        height="16"
                        viewBox="0 0 7 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.53081 11.9998H0.469187C0.210063 11.9998 0 11.5367 0 10.9656V1.04373C0 0.472552 0.210063 0.00952148 0.469187 0.00952148H1.53081C1.78994 0.00952148 2 0.472552 2 1.04373V10.9656C2 11.5367 1.78994 11.9998 1.53081 11.9998Z"
                          fill="#3D3D3D"
                        />
                        <path
                          d="M6.53081 11.9902H5.46919C5.21006 11.9902 5 11.5272 5 10.956V1.03421C5 0.463031 5.21006 0 5.46919 0H6.53081C6.78994 0 7 0.463031 7 1.03421V10.956C7 11.5272 6.78994 11.9902 6.53081 11.9902Z"
                          fill="#3D3D3D"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="12" height="12" rx="2" fill="#3D3D3D" />
                      </svg>
                    )}
                  </button>
                  <Slider
                    type="range"
                    style={{
                      display: "inline",
                      width: "325px",
                      marginLeft: "1rem",
                      marginTop: "0.85rem",
                    }}
                    min={0}
                    size="small"
                    max={audioRef.current?.duration || 0}
                    value={currentTime}
                    onChange={(e) =>
                      audioRef.current &&
                      (audioRef.current.currentTime = Number(e.target.value))
                    }
                  />
                  <p style={{ marginLeft: "0.5rem", marginTop: "1rem" }}>
                    {formatTime(currentTime)}
                  </p>
                  <button
                    style={{
                      background: "#ffffff00",
                      border: "none",
                      marginLeft: "1rem",
                    }}
                  >
                    <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.19652 8.9946L7.6608 12.3799C7.75893 12.4781 7.89522 12.538 8.04516 12.538C8.3448 12.538 8.59023 12.2955 8.59023 11.9982V0.53973C8.59023 0.24267 8.3448 0 8.04516 0C7.89237 0 7.75344 0.0627 7.65522 0.16356L4.19913 3.54336H2.0487C1.44639 3.54336 0.958496 4.03128 0.958496 4.63365V7.9044C0.958496 8.50674 1.44642 8.9946 2.0487 8.9946H4.19652ZM11.6566 2.92197C11.3949 3.18084 11.3949 3.60336 11.6566 3.86508C12.3053 4.5165 12.7085 5.41329 12.7085 6.40533C12.7085 7.39764 12.3026 8.29413 11.654 8.9457C11.392 9.20739 11.392 9.62982 11.654 9.88875C11.9127 10.1505 12.3353 10.1505 12.597 9.88875C13.4882 8.99739 14.0415 7.76553 14.0415 6.40536C14.0415 5.04801 13.4937 3.81861 12.6052 2.92746L12.5996 2.922C12.3381 2.66022 11.9183 2.66022 11.6566 2.92197ZM11.0923 8.38134C11.5964 7.87458 11.9073 7.1766 11.9073 6.4053C11.9073 5.63391 11.5964 4.93623 11.0923 4.42917C10.8307 4.16754 10.4082 4.16754 10.1492 4.42917C9.88752 4.68819 9.88752 5.11056 10.1492 5.37228C10.4109 5.63673 10.5743 6.00192 10.5743 6.4053C10.5743 6.80877 10.4109 7.17399 10.1492 7.43835C9.88752 7.70004 9.88752 8.1198 10.1492 8.38137C10.4082 8.64042 10.8307 8.64303 11.0923 8.38134Z"
                        fill="#3D3D3D"
                      />
                    </svg>
                  </button>
                  <Slider
                    type="range"
                    style={{
                      display: "inline",
                      width: "40px",
                      marginLeft: "0.5rem",
                      marginTop: "0.85rem",
                    }}
                    className="volume"
                    size="small"
                    min={0}
                    max={100}
                    value={currentVolume}
                    onChange={(e) => handleVolumeChange(e)}
                  />
                </div>
                {}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ArchiveDetail;
