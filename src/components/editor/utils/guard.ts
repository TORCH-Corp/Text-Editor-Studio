export function isHTMLElement(x: unknown): x is HTMLElement {
  if (typeof window === 'undefined' || typeof HTMLElement === 'undefined') {
    return false
  }
  return x instanceof HTMLElement
}
