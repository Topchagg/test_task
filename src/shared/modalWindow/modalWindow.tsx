import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"

import Button from "../button/button"

import { modalWindow } from "./modalWindow.type"

import { RootState } from "../../store/store"
import { setModalWindowStatus } from "../../store/slices/windowSlices/windowSlices"

import './modalWindow.css'


const ModalWindow:FC<modalWindow> = ({Component,onSubmit,onDecline}) => {

    const modalWindowTitle = useSelector((state:RootState) => state.test.modalWindowTitle)
    const ModalWindowForm = useSelector((state:RootState) => state.test.modalWindowForm)
    const textOnSubmit = useSelector((state:RootState) => state.test.onSubmitText)

    const dispatch = useDispatch()

    return (
        <div className="modal-window-wrapper">
            <div className="modal-window">
                <div className="title-48">
                    {modalWindowTitle}
                </div>
                <div className="pt-30">
                    {(ModalWindowForm == "productForm" && Component) && <Component/>}
                </div>
                <div className="buttons-wrapper center">
                    {onDecline && <div onClick={() => onDecline()}><Button text="Decline"/></div> ||
                    <div onClick={() => dispatch(setModalWindowStatus())}><Button text="Decline"/></div>
                    }



                    {(onSubmit && textOnSubmit) && <div onClick={onSubmit}><Button text={textOnSubmit}/></div>}
                </div>
            </div>
        </div>
    )
}

export default ModalWindow