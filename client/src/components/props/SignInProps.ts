import { Dispatch, FormEvent, SetStateAction } from "react"
import { SignInData } from "../data/SignInData"

export interface SignInProps {
    data: SignInData
    onDataChange: Dispatch<SetStateAction<SignInData>>
    onSubmit: (event: FormEvent) => void
}
