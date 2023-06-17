export const getAPIUrl = () => {
  const schemaPathFromLocalStorage = typeof window !== "undefined" ? window.localStorage.getItem("url") : null

  if (schemaPathFromLocalStorage) {
    return schemaPathFromLocalStorage
  }

  return `${process.env["NEXT_PUBLIC_API_URL"]}`
}
