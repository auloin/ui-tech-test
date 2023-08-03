import { useReducer } from "react"
type Mode = "preview" | "edit"

export default function useMode() {
    // TODO: re-implement this hook so that it reads and writes the mode query parameter from the URL
    return useReducer((mode: Mode) => (mode === "preview" ? "edit" : "preview"), "preview")
}