import { v4 } from "uuid";
import { create } from "zustand";

export type Submit = {
  type: "submit";
  text: string;
  id: string;
  label?: never;
  placeholder?: never;
};
export type Input = {
  type: "text" | "date" | "number";
  text?: never;
  placeholder: string;
  id: string;
  label: string | null;
};
export type Combobox = {
  type: "country";
  text?: never;
  id: string;
  label: string | null;
  placeholder: string;
};
export type Field = Input | Submit | Combobox;

const generateRandomUUID = () => {
  return v4(); // this may be replaced with other uuid generators
};
const INIT_FIELDS: Field[] = [
  { type: "text", placeholder: "Name", label: null, id: generateRandomUUID() },
  { type: "number", placeholder: "Age", label: null, id: generateRandomUUID() },
  {
    type: "date",
    placeholder: "Date of Birth",
    label: null,
    id: generateRandomUUID(),
  },
  {
    type: "country",
    placeholder: "Country",
    label: null,
    id: generateRandomUUID(),
  },
  { type: "submit", text: "submit", id: generateRandomUUID() },
];

/**
 * A store for managing form fields
 * TODO: implement a store for managing form fields
 **/
interface FieldsState {
  fields: Field[];
  update: (field: Partial<Field>, id: string) => void;
  add: (field: Field) => void;
  remove: (id: string) => void;
}

const useFieldsStore = create<FieldsState>((set) => ({
  fields: INIT_FIELDS,
  update: (field: Partial<Field>, id: string) =>
    set(({ fields }) => {
      const f = fields.find((s) => s.id === id);
      Object.assign(f as Field, field);
      return { fields };
    }),
  add: (field: Field) =>
    set(({ fields }) => ({ fields: [...fields, { ...field }] })),
  remove: (id: string) =>
    set(({ fields }) => ({
      fields: fields.filter((field) => field.id !== id),
    })),
}));

/**
 * A hook for managing form fields
 * TODO: complete this hook by wiring up the form store
 * @returns
 */
function useFields() {
  return useFieldsStore();
}

export default useFields;
