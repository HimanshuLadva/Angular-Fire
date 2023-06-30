export function convertSnaps<T>(result) {
    return <T[]>result.docs.map(doc => {
       return {
          id: doc.id,
           ...<any>doc.data()
       }
    })
 }