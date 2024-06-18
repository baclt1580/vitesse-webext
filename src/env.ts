const forbiddenProtocols = [
  'chrome-extension://',
  'chrome-search://',
  'chrome://',
  'devtools://',
  'edge://',
  'https://chrome.google.com/webstore',
]

export function isForbiddenUrl(url: string): boolean {
  return forbiddenProtocols.some(protocol => url.startsWith(protocol))
}

export const isFirefox = navigator.userAgent.includes('Firefox')

export const firebaseConfig = {
  apiKey: "AIzaSyCHa4zOfJQ1PlVB6rK0aCrA_fx4KSuF2ao",
  authDomain: "concrete-kayak-417305.firebaseapp.com",
  projectId: "concrete-kayak-417305",
  storageBucket: "concrete-kayak-417305.appspot.com",
  messagingSenderId: "745047396107",
  appId: "1:745047396107:web:203a76f11336788c1c1c0e",
  measurementId: "G-FR8SC3SWNJ"
};