import { useEffect, useState } from "react";
import useFields, { Field } from "./fields/useFields";
import { selection } from "./SelectionManager";

function Aside() {
  const [field, setField] = useState<Field>();
  const store = useFields();
  useEffect(
    () =>
      selection.subscribe((value) =>
        setField(store.fields.find((f) => f.id === value))
      ),
    [store]
  );
  return (
    <aside className="h-full border-l border-gray-200 w-1/6 px-4 py-10">
      <h3 className="text-lg border-b border-gray-100">Properties</h3>
      <div className="mt-2" />
      {field && (
        <form>
          <label>
            Type
            <select
              id="countries"
              className="rounded border w-full border-gray-200 text-base font-medium px-3 py-2 placeholder:font-normal"
            >
              <option value="submit" selected={field.type == "submit"}>
                Submit
              </option>
              <option value="text" selected={field.type == "text"}>
                Text
              </option>
              <option value="date" selected={field.type == "date"}>
                Date
              </option>
              <option value="number" selected={field.type == "number"}>
                Number
              </option>
            </select>
          </label>
          <label>
            Text
            <input
              placeholder={field.type === "submit" ? "required" : "optional"}
              name="text"
              type="text"
              className={
                "rounded border w-full border-gray-200 text-base font-medium px-3 py-2 placeholder:font-normal"
              }
              value={field.text}
            />
          </label>
          <label>
            Label
            <input
              placeholder="optional"
              name="label"
              type="text"
              className={
                "rounded border w-full border-gray-200 text-base font-medium px-3 py-2 placeholder:font-normal"
              }
              value={field.label}
            />
          </label>
          <label>
            Placeholder
            <input
              placeholder="optional"
              name="placeholder"
              type="text"
              className={
                "rounded border w-full border-gray-200 text-base font-medium px-3 py-2 placeholder:font-normal"
              }
              value={field.placeholder}
            />
          </label>
          <button
            type="button"
            className="block px-2 py-1 border border-gray-300 hover:bg-gray-50 rounded"
          >
            Save
          </button>
        </form>
      )}
    </aside>
  );
}

export default Aside;
