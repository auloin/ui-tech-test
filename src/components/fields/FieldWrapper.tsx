import { Bars3Icon, TrashIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import React from "react";
import { useMode } from "../ModeSwitch";
import { useSelection } from "../SelectionManager";

function FieldWrapper({
  children,
  className,
  onRemove,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  onRemove?: () => void;
}) {
  const [mode] = useMode();
  const isEditable = mode == "edit";
  const [selected, getSelection] = useSelection(props.id);
  return (
    <div
      className={classNames(
        "flex items-baseline gap-1",
        className,
        selected && "border-4 border-indigo-200"
      )}
      {...props}
      onClick={isEditable ? getSelection : undefined}
    >
      <button
        type="button"
        tabIndex={-1}
        className={classNames("cursor-grab", {
          flex: isEditable,
          hidden: !isEditable,
        })}
      >
        {/** Drag icon */}
        <Bars3Icon className="w-5 h-5 text-gray-400" />
      </button>
      <button
        type="button"
        onClick={onRemove}
        tabIndex={-1}
        className={classNames({ flex: isEditable, hidden: !isEditable })}
      >
        {/** Remove icon */}
        <TrashIcon className="w-5 h-5 text-gray-400" />
      </button>
      <div className="grow space-y-2">{children}</div>
    </div>
  );
}
export default FieldWrapper;
