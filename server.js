const express = require('express');
const expressGraphql = require('express-graphql');
const schema = require('./graphql/schema')
const root = require('./graphql/resolver')
const { sequelize } = require('./db/conn')
const migration = require('./models/index')
const app = express()
const PORT = process.env.PORT || 3000

app.use('/graphql', expressGraphql({
    schema,
    rootValue: root,
    graphiql: true
}))

sequelize.authenticate()
.then(() => {
    migration()
    console.log(`Connection has been established successfully 😎`)
    app.listen(4000, () => console.log(`GraphQL erver is running on port ${PORT} 🚀`))
})
.catch(err => console.error('Unable to connect to the database:', err))



