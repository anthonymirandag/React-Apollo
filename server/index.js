const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
  {
    title: 'Harry Potter y la piedra filosofal',
    author: 'J.K. Rowling',
  },
  {
    title: 'Harry Potter y la orden deld',
    author: 'J.K. Rowling',
  },
];

const users =[
  {
    name : 'Anthony Miranda',
    book : books  
  }
]

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }
  

  input BookInput{
    title : String
    author : String
  }
  type User {
    name : String,
    book : [Book]
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books(text: String): [Book]
    nbooks(author:String) : [Book]
    users : [User]
  }
  type  Mutation{
    addBook(book: BookInput): Book  
  }

`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: (_,{text},context) => {
        //console.log(args)
        const booksHarry  = books.filter((book)=> book.title.includes(text))
        return booksHarry},
    nbooks: (_,{author},context)=>{
        const booksAuthor = books.filter((book)=>book.author.includes(author))
        return booksAuthor
    },
    users :() => users    
    },
    Mutation : {
        addBook:(_,{book})=>{
            return book
        }
    }

};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});