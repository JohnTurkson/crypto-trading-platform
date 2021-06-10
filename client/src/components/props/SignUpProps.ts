import { SignUpData } from "../data/SignUpData"
import { Dispatch, FormEvent, SetStateAction } from "react"

export interface SignUpProps {
    data: SignUpData
    onDataChange: Dispatch<SetStateAction<SignUpData>>
    onSubmit: (event: FormEvent) => void
}
