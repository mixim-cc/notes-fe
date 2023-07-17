import Cookies from "js-cookie"

const PREFERENCE_KEY = "whatsNewModal"

export const hasSeenWhatsNewModal = (): boolean => {
  return Cookies.get(PREFERENCE_KEY) === "true"
}

export const markWhatsNewModalAsSeen = (): void => {
  Cookies.set(PREFERENCE_KEY, "true", { expires: 7 }) // Expires in 7 days
}
