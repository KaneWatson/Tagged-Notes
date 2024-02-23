import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(function () {
    const jsonValue = localStorage.getItem(key)

    if (!jsonValue) {
      if (typeof initialValue === "function") return (initialValue as () => T)()
      else return initialValue
    } else return JSON.parse(jsonValue)
  })

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value))
    },
    [value, key]
  )

  return [value, setValue] as [T, typeof setValue]
}
