import {Router} from 'express'
import graphqlHTTP from 'express-graphql'
import schema from '../graphql/schema'
const router = Router()

router.use('/', graphqlHTTP(request => ({
  schema: schema,
  rootValue: {session: request.session}, // so graphql can use sessions
  graphiql: process.env['NODE_ENV'] !== 'production'
})))

export default router
