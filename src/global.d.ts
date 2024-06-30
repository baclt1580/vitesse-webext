declare const __DEV__: boolean
/** Extension name, defined in packageJson.name */
declare const __NAME__: string

declare module '*.vue' {
  const component: any
  export default component
}
const browser: import("webextension-polyfill").Browser;
interface Language {
  name: string;
  local: string | null;
  1: string | null;
  2: string | null;
  '2T': string | null;
  '2B': string | null;
  3: string;
  invertedName: string;
  refName: string;
  /**
   * @description
   * L = Living
   * E = Extinct
   * H = Historic
   * C = Constructed
   * S = Special Value
   */
  type: 'L' | 'E' | 'H' | 'C' | 'S';
  /**
   * @description
   * I = Individual
   * M = Macrolanguage
   * S = Special Value
   */
  scope: 'I' | 'M' | 'S';
}
const chrome:import ("@types/chrome")