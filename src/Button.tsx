import React from "react";

type ButtonPropsType = {
    title: string;
    onClickHandler?: () => void
    isDisabled?: boolean
    classes?: string
}

export const Button = ({title, isDisabled, onClickHandler, classes}: ButtonPropsType) => {
    return (
        <button disabled={isDisabled} onClick={onClickHandler} className={classes}>{title}</button>
    )
}