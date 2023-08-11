import { useCallback, useEffect, useState } from "react";

/**
 * This is a simple selection manager that allows you to select one of many items.
 * Each item is identified by a string id.
 */
type Selection = string | null; // null means no selection
type Subscriber = (value: Selection) => void; // a function that is called when the selection changes
type Unsubscribe = () => void; // a function that unsubscribes the subscriber
type Subscribe = (subscriber: Subscriber) => Unsubscribe; // a function that subscribes a subscriber and returns an unsubscribe function

// The selection manager is a singleton object that holds the current selection and a list of subscribers.
type SelectionManager = {
  value: Selection;
  subscribers: Subscriber[];
  subscribe: Subscribe;
};
export const selection: SelectionManager = {
  value: null,
  subscribers: [],
  subscribe(listener) {
    this.subscribers.push(listener);
    return () => {
      this.subscribers = this.subscribers.filter((l) => l != listener);
    };
  },
};

/**
 * This hook returns a tuple of two values:
 * - isSelected: a boolean that is true if the item with the given id is selected
 * - getSelection: a function that selects the item with the given id
 * @param id the id of the current item
 * @returns a tuple of two values: isSelected and getSelection
 */
export function useSelection(id: string) {
  const [selectedId, setSelectedId] = useState<Selection>(selection.value);
  useEffect(() => selection.subscribe((value) => setSelectedId(value)), [id]);
  const getSelection = useCallback(() => {
    selection.value = id;
    selection.subscribers.forEach((fn) => fn(id));
  }, [id]);

  const isSelected = selectedId === id;
  return [isSelected, getSelection] as const;
}
