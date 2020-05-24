export default class Query extends Map<string, any> {
  public toString(): string {
    let query = "";
    for (let [key, value] of this) {
      if (query !== "") {
        query = `${query}&`;
      }
      query = `${query}${key}=${value}`;
    }
    
    return query;
  }
}