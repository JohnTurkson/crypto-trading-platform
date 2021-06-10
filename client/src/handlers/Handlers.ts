import React, { Dispatch, SetStateAction } from "react"

export function handleStateChange<T>(key: keyof T, state: T, handler: Dispatch<SetStateAction<T>>) {
    return (event: React.ChangeEvent<HTMLInputElement>) => handler({...state, [key]: event.target.value})
}
