export default interface Replacer {
  /**
   * Replace source with parameters
   * @param text a string as input text
   * @param parameters an object contains replacement
   * @return a string
   */
  replace(text: string, parameters: object | null): string
}