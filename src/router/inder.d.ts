import { ReactNode } from "react";

export interface IMenuType {
    key: string
    label: ReactNode
    title: string
    icon?: ReactNode,
    element?: ReactNode,
    children?: IMenuType[],
    hiddent?:boolean
}