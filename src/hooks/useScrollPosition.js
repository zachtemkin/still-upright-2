import { useRef, useEffect, useCallback } from "react"

const isBrowser = typeof window !== `undefined`

function getScrollPosition({ element, useWindow }) {
  if (!isBrowser) return { x: 0, y: 0 }

  const target = element ? element.current : document.body
  const position = target.getBoundingClientRect()

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

export default function useScrollPosition(
  effect,
  deps,
  element,
  useWindow,
  wait
) {
  const position = useRef(getScrollPosition({ useWindow }))

  const throttleTimeout = useRef(null)

  const callBack = useCallback(() => {
    const currPos = getScrollPosition({ element, useWindow })
    effect({ prevPos: position.current, currPos })
    position.current = currPos
    throttleTimeout.current = null
  }, [effect, element, useWindow])

  useEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout.current === null) {
          throttleTimeout.current = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [...deps, callBack, wait])
}
