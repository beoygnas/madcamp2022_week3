import { useEffect, useState } from "react"
import { Data } from "./Constant"
import styled, { css } from "styled-components"

export default function CardContainer() {
    let dpi = 100
    let cardList = []
    
    //0 ~ -380
    const [listCursor, setListCursor] = useState(0)
    const [pMouseX, setPMouseX] = useState(0)
    
    function pointerDownListner(e) {
        setPMouseX(e.clientX)
    }

    function pointerMoveListner(e) {
        if(e.buttons) {
            let movement = listCursor + (e.clientX - pMouseX) / window.innerWidth * dpi
            if(movement > 10 || movement < -390 ) return
            setListCursor(movement)
            setPMouseX(e.clientX)
        }
    }

    function onClickListner(e) {
    }

    for(let i=0; i<20; i++) {
        cardList.push(
            <CardDiv cursor={listCursor + 20*i + 50} color={Data.color[i]} onClick={onClickListner}></CardDiv>
        )
    }

    return <>
        <ContainerDiv onPointerDown={pointerDownListner} onPointerMove={pointerMoveListner}>
            {
                cardList.map((card) => card)
            }
        </ContainerDiv>
    </>
}

const ContainerDiv = styled.div`
    position: absolute;
    top:0%;
    left:0%;
    width: 100vw;
    height: 100vh;
    background-color:rgba(0, 0, 0, 0);
    overflow-x: hidden;
    overflow-y: hidden;
`
const calcZ = (n) => (50 - n) / 15

const CardDiv = styled.div.attrs(props => ({
    style: {
        position: 'absolute',
        top: ((2**calcZ(props.cursor) - 2**(-calcZ(props.cursor))) / (2**calcZ(props.cursor) + 2**(-calcZ(props.cursor)))) * 40 + 50 + '%',
        left:(props.cursor > 50 ? Math.sqrt((props.cursor - 50)*1.6) : -Math.sqrt((50 - props.cursor)*1.6)) * 5 + 50 + '%',
        width: (300 - 3.5*Math.abs(props.cursor - 50)) + 'px',
        height: (300 - 3.5*Math.abs(props.cursor - 50)) * 1.6 + 'px',
        transform: `translate(-50%, -50%) rotate(${props.cursor-50}deg)`
    }

}))`
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    ${(props) => css`
        background-color: ${'#'+props.color};
        z-index: ${Math.round(-Math.abs(props.cursor - 50)) + 100};
        box-shadow: 1px 1px 8px
    `}
`

