import styled from "styled-components"

export default function Menu({top, left, img, opacity}) {

    function click() {
        console.log(click)
    }

    return (
        <MenuDiv top={top} left={left} opacity = {opacity} onClick={click}>
            <MenuImg src={img} ></MenuImg>
        </MenuDiv>
    )
}

const MenuDiv = styled.div`
    position: absolute;
    top: ${(props) => props.top}%;
    left: ${((props) => props.left)}%;
    transform: translate(-50%, -50%);
    width: 5vw;
    height: 5vw;
    background-color: #FFFAF3;
    border-radius: 50%;
    opacity : ${(props) => props.opacity};
    ;
`

const MenuImg = styled.img`
    width: 90%;
    height: auto;
`