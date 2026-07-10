const EMPTY = '-'

export function display(value: string | null | undefined): string {
  return value?.trim() || EMPTY
}
