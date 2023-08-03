import Editor from "./Editor";
import { useMode } from "../ModeSwitch";

function Label({ defaultValue = null, onChange }: { defaultValue: string | null, onChange?: (value: string) => void }) {
    const [mode] = useMode()
    return (
        <div
            className={
                mode == "edit" ? 'px-3 py-2 rounded-md border border-gray-200 focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-200' : ""
            }
        >
            <div className="relative">
                <Editor editable={mode == "edit"} defaultValue={defaultValue} onChange={onChange} />
            </div>
        </div>
    )
}
export default Label