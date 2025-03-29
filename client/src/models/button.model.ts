import { IconType } from "react-icons";

export enum ButtonVariantEnum {
    PRIMARY="primary",
    SECONDARY="secondary",
    SUCCESS="success",
    WARNING="warning",
    DANGER="danger",
    INFO="info",
    LIGHT="light",
    DARK="dark",
    LINK="link"
}

export interface CustomButtonI {
    className?: string,
    variant?: ButtonVariantEnum,
    onClick: any,
    Icon?: IconType,
    text: string
}