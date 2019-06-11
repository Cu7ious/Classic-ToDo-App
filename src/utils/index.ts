import { Filter, TodoItem } from '../data';

export function capitalize (text: string): string {
  return text.trim()
    .replace(
      text.charAt(0),
      text.charAt(0).toUpperCase()
    );
}

export function filterItems(items: TodoItem[], filter: string): TodoItem[] {
  switch (filter) {
    case Filter.REMAINED:
      return items.filter(item => item.done === false)
    case Filter.COMPLETED:
      return items.filter(item => item.done === true)
    default:
      return items;
  }
}
