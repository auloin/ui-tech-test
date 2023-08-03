import { Submit } from "./useFields";

function SubmitField({ id, text }: Submit) {
    return (
        <button
            id={id}
            type="submit"
            className="rounded border border-gray-200 text-base font-medium px-3 py-2 enabled:hover:bg-gray-50"
        >
            {text}
        </button>
    )
}
export default SubmitField