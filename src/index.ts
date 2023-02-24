import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {MongoClient} from "mongodb";
import bcrypt from "bcrypt";

let mongo;
let client;
export async function context(headers, secrets) {
  if (!mongo) {
  client = await MongoClient.connect(secrets.MONGO_URL);
  mongo = client.db("test");
}
return {
  headers,
  secrets,
  mongo,
};
};



// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }


  type User {
    _id: String
    name: String
    pass: String
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    currentUser: User
  }

  type Mutation {
    login(name: String!, pass: String!): User
    signup(name: String!, pass: String!): User
  }
`;

const TEMP_USER = {
  _id: "1",
  name: "Test",
  pass: "1234"
};

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    currentUser: () => {
      return TEMP_USER;
    },
  },
  Mutation: {
    login: (root, { name, pass }) => {
      // TODO: Make this real
      return TEMP_USER;
    },
    signup: async (root, { name, pass }, { mongo }) => {
      const Users = mongo.collection('users');
      const existingUser = await Users.findOne({ name });

      if (existingUser) {
        throw new Error('name already used');
      }
      
      // TODO: Make this real
      return TEMP_USER; 
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);