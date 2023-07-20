import { LucidModel, LucidRow, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm';

export default class Sort {
  public static types = ['asc', 'desc'] as const // sort with ascending order or descending order
  public static typesRole = ['user', 'blogger', 'admin', 'super-admin'] as const // sort with ascending order or descending order
  public static typesBooleam = ['true', 'false'] as const // sort with ascending order or descending order

  
  public static mapObjToQuery = (
    obj: any, // means object can be array, string, number etc and we specify any because if we sort price which is number if we sort name which is string therefore obj type can be any
    query: ModelQueryBuilderContract<LucidModel, LucidRow>
    ): void => {
      if (!obj) {
        return
      }

    Object.keys(obj).forEach((sortKey) => { // obj is parameter of .keys() and it must have to be Object.keys() and forEach can take number, string, array, array of strings any type
      const sort = obj[sortKey] // since forEach works for array only
      // const sort will be either asc or desc
      // sortKey will be id, name, email etc
      
      if (sortKey === "role") {
        query.from("users").where(sortKey, sort)
      } else if (sortKey === "isVerified") {
        if (sort === "true") {
          query.from("users").where(sortKey, 1)
        } else {
          query.from("users").where(sortKey, 0)
        }
      } {
        query.orderBy(sortKey, sort) // sequence order first sortKey which can be price, name, rooms, status then sort which is of type rather ascending or descending
      }     

      // console.log('object sortKey', sortKey) // sortKey can be price, name, rooms, status(status can be available and rented) etc since all these are of diff types
      // console.log("what is sort in func", sortKey);
    })
  }
}
