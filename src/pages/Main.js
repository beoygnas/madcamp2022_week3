import styled, { keyframes } from "styled-components";
import './Main.css'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import MainBackground from "../components/MainBackground";
import Menu from "../components/Menu";
import profile from "../assets/profile0.png"

function Main() {
    // const logo = document.querySelectorAll("#logo path")

    // for (let i=0; i<logo.length; i++) {
    //     console.log(logo[i].getTotalLength())
    // }
    
    return <>
        <MainBackground></MainBackground>
        <svg id="logo" width="524" height="82" viewBox="0 0 524 82" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-1-outside-1_26_7" maskUnits="userSpaceOnUse" x="0.5" y="0.600006" width="523" height="81" fill="black">
        <rect fill="white" x="0.5" y="0.600006" width="523" height="81"/>
        <path d="M78.7 6.50001V76H67.3V28.4L46.1 76H38.2L16.9 28.4V76H5.5V6.50001H17.8L42.2 61L66.5 6.50001H78.7Z"/>
        <path d="M135.584 61.8H106.484L101.484 76H89.5836L114.484 6.40001H127.684L152.584 76H140.584L135.584 61.8ZM132.384 52.5L121.084 20.2L109.684 52.5H132.384Z"/>
        <path d="M186.11 6.50001C193.51 6.50001 199.977 7.93334 205.51 10.8C211.11 13.6 215.41 17.6667 218.41 23C221.477 28.2667 223.01 34.4333 223.01 41.5C223.01 48.5667 221.477 54.7 218.41 59.9C215.41 65.1 211.11 69.1 205.51 71.9C199.977 74.6333 193.51 76 186.11 76H163.41V6.50001H186.11ZM186.11 66.7C194.243 66.7 200.477 64.5 204.81 60.1C209.143 55.7 211.31 49.5 211.31 41.5C211.31 33.4333 209.143 27.1333 204.81 22.6C200.477 18.0667 194.243 15.8 186.11 15.8H174.81V66.7H186.11Z"/>
        <path d="M230.509 41.1C230.509 34.3 232.075 28.2 235.209 22.8C238.409 17.4 242.709 13.2 248.109 10.2C253.575 7.13334 259.542 5.60001 266.009 5.60001C273.409 5.60001 279.975 7.43334 285.709 11.1C291.509 14.7 295.709 19.8333 298.309 26.5H284.609C282.809 22.8333 280.309 20.1 277.109 18.3C273.909 16.5 270.209 15.6 266.009 15.6C261.409 15.6 257.309 16.6333 253.709 18.7C250.109 20.7667 247.275 23.7333 245.209 27.6C243.209 31.4667 242.209 35.9667 242.209 41.1C242.209 46.2333 243.209 50.7333 245.209 54.6C247.275 58.4667 250.109 61.4667 253.709 63.6C257.309 65.6667 261.409 66.7 266.009 66.7C270.209 66.7 273.909 65.8 277.109 64C280.309 62.2 282.809 59.4667 284.609 55.8H298.309C295.709 62.4667 291.509 67.6 285.709 71.2C279.975 74.8 273.409 76.6 266.009 76.6C259.475 76.6 253.509 75.1 248.109 72.1C242.709 69.0333 238.409 64.8 235.209 59.4C232.075 54 230.509 47.9 230.509 41.1Z"/>
        <path d="M353.552 61.8H324.452L319.452 76H307.552L332.452 6.40001H345.652L370.552 76H358.552L353.552 61.8ZM350.352 52.5L339.052 20.2L327.652 52.5H350.352Z"/>
        <path d="M454.579 6.50001V76H443.179V28.4L421.979 76H414.079L392.779 28.4V76H381.379V6.50001H393.679L418.079 61L442.379 6.50001H454.579Z"/>
        <path d="M518.162 27.2C518.162 30.7333 517.329 34.0667 515.662 37.2C513.996 40.3333 511.329 42.9 507.663 44.9C503.996 46.8333 499.296 47.8 493.562 47.8H480.962V76H469.562V6.50001H493.562C498.896 6.50001 503.396 7.43334 507.062 9.30001C510.796 11.1 513.562 13.5667 515.362 16.7C517.229 19.8333 518.162 23.3333 518.162 27.2ZM493.562 38.5C497.896 38.5 501.129 37.5333 503.263 35.6C505.396 33.6 506.462 30.8 506.462 27.2C506.462 19.6 502.163 15.8 493.562 15.8H480.962V38.5H493.562Z"/>
        </mask>
        <path d="M78.7 6.50001V76H67.3V28.4L46.1 76H38.2L16.9 28.4V76H5.5V6.50001H17.8L42.2 61L66.5 6.50001H78.7Z" stroke="white" strokeWidth="10" mask="url(#path-1-outside-1_26_7)"/>
        <path d="M135.584 61.8H106.484L101.484 76H89.5836L114.484 6.40001H127.684L152.584 76H140.584L135.584 61.8ZM132.384 52.5L121.084 20.2L109.684 52.5H132.384Z" stroke="white" strokeWidth="10" mask="url(#path-1-outside-1_26_7)"/>
        <path d="M186.11 6.50001C193.51 6.50001 199.977 7.93334 205.51 10.8C211.11 13.6 215.41 17.6667 218.41 23C221.477 28.2667 223.01 34.4333 223.01 41.5C223.01 48.5667 221.477 54.7 218.41 59.9C215.41 65.1 211.11 69.1 205.51 71.9C199.977 74.6333 193.51 76 186.11 76H163.41V6.50001H186.11ZM186.11 66.7C194.243 66.7 200.477 64.5 204.81 60.1C209.143 55.7 211.31 49.5 211.31 41.5C211.31 33.4333 209.143 27.1333 204.81 22.6C200.477 18.0667 194.243 15.8 186.11 15.8H174.81V66.7H186.11Z" stroke="white" strokeWidth="10" mask="url(#path-1-outside-1_26_7)"/>
        <path d="M230.509 41.1C230.509 34.3 232.075 28.2 235.209 22.8C238.409 17.4 242.709 13.2 248.109 10.2C253.575 7.13334 259.542 5.60001 266.009 5.60001C273.409 5.60001 279.975 7.43334 285.709 11.1C291.509 14.7 295.709 19.8333 298.309 26.5H284.609C282.809 22.8333 280.309 20.1 277.109 18.3C273.909 16.5 270.209 15.6 266.009 15.6C261.409 15.6 257.309 16.6333 253.709 18.7C250.109 20.7667 247.275 23.7333 245.209 27.6C243.209 31.4667 242.209 35.9667 242.209 41.1C242.209 46.2333 243.209 50.7333 245.209 54.6C247.275 58.4667 250.109 61.4667 253.709 63.6C257.309 65.6667 261.409 66.7 266.009 66.7C270.209 66.7 273.909 65.8 277.109 64C280.309 62.2 282.809 59.4667 284.609 55.8H298.309C295.709 62.4667 291.509 67.6 285.709 71.2C279.975 74.8 273.409 76.6 266.009 76.6C259.475 76.6 253.509 75.1 248.109 72.1C242.709 69.0333 238.409 64.8 235.209 59.4C232.075 54 230.509 47.9 230.509 41.1Z" stroke="white" strokeWidth="10" mask="url(#path-1-outside-1_26_7)"/>
        <path d="M353.552 61.8H324.452L319.452 76H307.552L332.452 6.40001H345.652L370.552 76H358.552L353.552 61.8ZM350.352 52.5L339.052 20.2L327.652 52.5H350.352Z" stroke="white" strokeWidth="10" mask="url(#path-1-outside-1_26_7)"/>
        <path d="M454.579 6.50001V76H443.179V28.4L421.979 76H414.079L392.779 28.4V76H381.379V6.50001H393.679L418.079 61L442.379 6.50001H454.579Z" stroke="white" strokeWidth="10" mask="url(#path-1-outside-1_26_7)"/>
        <path d="M518.162 27.2C518.162 30.7333 517.329 34.0667 515.662 37.2C513.996 40.3333 511.329 42.9 507.663 44.9C503.996 46.8333 499.296 47.8 493.562 47.8H480.962V76H469.562V6.50001H493.562C498.896 6.50001 503.396 7.43334 507.062 9.30001C510.796 11.1 513.562 13.5667 515.362 16.7C517.229 19.8333 518.162 23.3333 518.162 27.2ZM493.562 38.5C497.896 38.5 501.129 37.5333 503.263 35.6C505.396 33.6 506.462 30.8 506.462 27.2C506.462 19.6 502.163 15.8 493.562 15.8H480.962V38.5H493.562Z" stroke="white" strokeWidth="10" mask="url(#path-1-outside-1_26_7)"/>
        </svg>
        <Link to={"/member"}>
            <Menu top={8} left={95} img={profile}></Menu>
        </Link>
        <Link to={"/project"}>
            <Menu top={20} left={95} img={profile}></Menu>
        </Link>
    </>
}

// const boxColor = keyframes`
//     0% {
//         background-color: #000000
//     }
//     100% {
//         background-color: #00C1FF
//     }
// `

// const MainDiv = styled.div`
//     height: 100vh;
//     background-color: #000000;

//     animation: ${boxColor} 1s ease forwards 3s;
// `

const LocationDiv = styled.div`
    background-color:transparent;
    width: 20vw;
    height: 20vh;
`
const CircleDiv = styled.div`
    position: absolute;
    top:90%;
    left:90%;
    transform: translate(-50%, -50%);
    width: 5vw;
    height: 5vw;
    background-color: white;
    border-radius: 50%;
`


export default Main