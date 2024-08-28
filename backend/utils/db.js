const db = require('mongoose')

const Connect = async(Url) => {
   try {
      await db.connect(Url).then(() => {
         console.log('Database connected successfully')
      })
   }catch (err) {
      console.error(err)
   }
}


module.exports = Connect;