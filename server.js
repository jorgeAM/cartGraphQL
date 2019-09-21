const express = require('express');
const expressGraphql = require('express-graphql');
const schema = require('./graphql/schema')
const root = require('./graphql/resolver')
const app = express()
const PORT = process.env.PORT || 3000

app.use('/graphql', expressGraphql({
    schema,
    rootValue: root,
    graphiql: true
}))

app.listen(4000, () => console.log(`GraphQL erver is running on port ${PORT} 🚀`))

