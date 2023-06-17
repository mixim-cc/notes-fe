export const getAPIUrl = () => {
  const apiPathFromLocalStorage = typeof window !== "undefined" ? window.localStorage.getItem("url") : null

  if (apiPathFromLocalStorage) {
    return apiPathFromLocalStorage
  }

  return `${process.env["NEXT_PUBLIC_API_URL"]}`
}
