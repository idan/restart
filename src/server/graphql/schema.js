import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

import {FooResourceType} from './schemaTypes'

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      fooResource: {
        type: FooResourceType,
        args: {
          id: {
            name: 'id',
            description: `The resource id.`,
            type: new GraphQLNonNull(GraphQLID)
          }
        },
        resolve: (parentValue, {id}, {rootValue: {session}}) => {
          // get a resource with the given id and return it
        }
      }
    }
  })
})

export default schema
