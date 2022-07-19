import styled from "styled-components"

export default function Menu({top, left, img}) {

    function click() {
        console.log(click)
    }

    return (
        <MenuDiv top={top} left={left} onClick={click}>
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
    background-color: white;
    border-radius: 50%;
`

const MenuImg = styled.img`
    width: 90%;
    height: auto;
`