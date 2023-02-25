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
      signup: (root, { name, pass }) => {
        // TODO: Make this real
        return TEMP_USER;
      },
    },
  };
  