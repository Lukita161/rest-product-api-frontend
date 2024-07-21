import { ReactNode } from "react"

type ErrorProps = {
    children: ReactNode
}

export const ErrorMessage = ({ children }: ErrorProps)=> {
    return(
        <div className="w-full mt-6 p-2 bg-red-500">{ children }</div>
    )
}