import styled from "styled-components";
import Bounce from "../components/Bounce";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Menu from "../components/Menu";
import profile from "../assets/container_5.png"

function Member() {
    return <>
        <Bounce/>
        <Link to={"/"}>
            <Menu top={60} left={2} opacity = {0}></Menu>
        </Link>
    </>
}

const Header = styled.header`
    position: absolute;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default Member