import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

export const FooResourceType = new GraphQLObjectType({
  name: 'FooResource',
  description: 'A foo.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the resource.'
    },
    name: {
      type: GraphQLString,
      description: 'The name of the resource.'
    }
  })
})
