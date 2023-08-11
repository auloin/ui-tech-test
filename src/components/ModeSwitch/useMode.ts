import { useSearchParams } from "react-router-dom";
type Mode = "preview" | "edit";

export default function useMode() {
  const [params, setSearchParams] = useSearchParams();

  const toggle = () =>
    setSearchParams({
      mode: params.get("mode") === "edit" ? "preview" : "edit",
    });
  const mode: Mode = params.get("mode") === "edit" ? "edit" : "preview";
  return [mode, toggle];
}
