export default class Utils {
  // parseKeys will be [ 'sort', 'nw', 'se' ] for apartments and just [ 'sort' ] for users
  public static parseQS = (query: any, parseKeys: string[]) => {
    const obj: any = {}
    try {
      // { sort: '{"id":"asc"}' } suppose this is the result from query
      const keys = Object.keys(query);
      // Object.keys will take all the keys (left hand) properties of ours object
      // hence result will be [ 'sort' ] as left side is sort
      keys.forEach((key) => {
        const value = query[key]
        // suppose value result will be {"id":"asc"}
        if (parseKeys.includes(key) && value) {
          // JSON.parse will convert {"id":"asc"} into { id: 'asc' } after parsing the value
          obj[key] = JSON.parse(value)
          // obj[key] will be { id: 'asc' }
        } else {
          obj[key] = value
        }
      })
    } catch (error) {
      console.error(error)
      return query
    }
    // the final result for obj will be { sort: { id: 'asc' } }
    return obj
  }
}
