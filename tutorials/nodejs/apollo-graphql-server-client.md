# Apollo GraphQL

## Official Documentation

[Documentation](https://www.apollographql.com/docs/)
[10-part tutorial](https://www.apollographql.com/docs/tutorial/introduction/)
[3-part Odyssy Course](https://odyssey.apollographql.com)
    - [Part 1 - Complete basics: Apollo server & client](https://odyssey.apollographql.com/lift-off-part1)
    - [Part 2 - Advanced: Querying & resolvers](https://odyssey.apollographql.com/lift-off-part2)
    - [Part 3 - Advanced: Query Arguments & Mutations](https://odyssey.apollographql.com/lift-off-part3)

## Details

Apollo is a platform for building a data graph, a communication layer that seamlessly connects your application clients (such as React and iOS apps) to your back-end services

### Apollo Server

Apollo Server is an extensible, open-source JavaScript GraphQL server.
You have to define graphql schema & resolvers.

### Apollo Client

Apollo Client is a customizable, open-source JavaScript GraphQL client.
It lets you define queries directly within the UI components that use them, and automatically update those components as query results arrive or change. It also works seamlessly with TypeScript

## Installation

Install apollo server:

`$ npm install apollo-server graphql`

Install apollo client:

`$ npm install @apollo/client graphql`

## Topics (Apollo Server)

### 1. Build a schema

- Definitions in a GraphQL schema are object types. Each object type you define should represent an object that an application client might need to interact with.
- An exclamation point (!) after a declared field's type means "this field's value can never be null." (required field)
- If a declared field's type is in [Square Brackets], it's an array of the specified type. If an array has an exclamation point after it, the array cannot be null, but it can be empty.
- Our schema needs to define queries that clients can execute against the data graph.
- Queries enable clients to fetch data, but not to modify data.
- Enables clients to modify data, our schema needs to define some mutations.
- Run `npm start` to start your server! 🎉 Apollo Server is now available at http://localhost:4000

```:javascript
// src/index.js
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const server = new ApolloServer({ typeDefs });

// start server
server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
  `);
});


// src/schema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  # all object types (definitions)
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
    token: String
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }

  # all query types
  type Query {
    launches: [Launch]!
    launch(id: ID!): Launch
    me: User
  }

  # all mutations
  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String): User
  }

  # object type  
  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }
`;

module.exports = typeDefs;
```

### 2. Connect to data sources

- A data source is any database, service, or API that holds the data you use to populate your schema's fields.
- GraphQL API can interact with any combination of data sources.

#### Connect to Rest API

```:javascript
// src/datasources/launch.js
const { RESTDataSource } = require('apollo-datasource-rest');

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }

  // fetches data
  async getAllLaunches() {
    const response = await this.get('launches');
    return Array.isArray(response)
      ? response.map(launch => this.launchReducer(launch))
      : [];
  }

  // transforms returned launch data into the shape that our schema expects (Launch)
  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
    };
  };

  async getLaunchById({ launchId }) {
    const response = await this.get('launches', { flight_number: launchId });
    return this.launchReducer(response[0]);
  }

  getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId })),
    );
  };
}

module.exports = LaunchAPI;
```

#### Connect to database

- `npm install sqlite3 sequelize`

```:javascript
// src/datasources/user.js
class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }
  // add user API methods here
}

// src/utils.js
module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './store.sqlite',
    operatorsAliases,
    logging: false,
  });

  const users = db.define('user', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    email: SQL.STRING,
    token: SQL.STRING,
  });

  const trips = db.define('trip', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    launchId: SQL.INTEGER,
    userId: SQL.INTEGER,
  });

  return { users, trips };
};


// src/index.js
const { createStore } = require('./utils');
const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');
const store = createStore();
const server = new ApolloServer({
  typeDefs,
  // define datasources here
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  })
});
```

### 3. Write query resolvers

- A resolver is a function that's responsible for populating the data for a single field in your schema.
- Whenever a client queries for a particular field, the resolver for that field fetches the requested data from the appropriate data source.
- The resolver function signature
  - `fieldName: (parent, args, context, info) => data;`

```:javascript
// src/resolvers.js
module.exports = {
  Query: {
    launches: (_, __, { dataSources }) =>
      dataSources.launchAPI.getAllLaunches(),
    launch: (_, { id }, { dataSources }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
  },
  Mission: {
    // The default size is 'LARGE' if not provided
    missionPatch: (mission, { size } = { size: 'LARGE' }) => {
      return size === 'SMALL'
        ? mission.missionPatchSmall
        : mission.missionPatchLarge;
    },
  },
  Launch: {
    isBooked: async (launch, _, { dataSources }) =>
      dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
  },
  User: {
    trips: async (_, __, { dataSources }) => {
      // get ids of launches by user
      const launchIds = await dataSources.userAPI.getLaunchIdsByUser();
      if (!launchIds.length) return [];
      // look up those launches by their ids
      return (
        dataSources.launchAPI.getLaunchesByIds({
          launchIds,
        }) || []
      );
    },
  },
};

// src/index.js
const resolvers = require('./resolvers');
const server = new ApolloServer({
  typeDefs,
  // add resolvers here
  resolvers,
  // rest of the code as in the example
});
```

#### paginated results

```:javascript
// src/schema.js
type Query {
  launches( # replace the current launches query with this one.
    """
    The number of results to show. Must be >= 1. Default = 20
    """
    pageSize: Int
    """
    If you add a cursor here, it will only return results _after_ this cursor
    """
    after: String
  ): LaunchConnection!
  launch(id: ID!): Launch
  me: User
}

"""
Simple wrapper around our list of launches that contains a cursor to the
last item in the list. Pass this cursor to the launches query to fetch results
after these.
"""
type LaunchConnection { # add this below the Query type as an additional type.
  cursor: String!
  hasMore: Boolean!
  launches: [Launch]!
}

// src/resolvers.js
const { paginateResults } = require('./utils');
module.exports = {
  Query: {
    launches: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allLaunches = await dataSources.launchAPI.getAllLaunches();
      // we want these in reverse chronological order
      allLaunches.reverse();
      const launches = paginateResults({
        after,
        pageSize,
        results: allLaunches
      });
      return {
        launches,
        cursor: launches.length ? launches[launches.length - 1].cursor : null,
        // if the cursor at the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: launches.length
          ? launches[launches.length - 1].cursor !==
            allLaunches[allLaunches.length - 1].cursor
          : false
      };
    },
    // ...other Query fields...
  }
};
```

### 4. Write mutation resolvers

- The context function defined above is called once for every GraphQL operation that clients send to our server.
- The return value of this function becomes the context argument that's passed to every resolver that runs as part of that operation.

```:javascript
// src/resolvers.js
// Query: {
//   ...
// },
Mutation: {
  login: async (_, { email }, { dataSources }) => {
    const user = await dataSources.userAPI.findOrCreateUser({ email });
    if (user) {
      user.token = Buffer.from(email).toString('base64');
      return user;
    }
  },
  bookTrips: async (_, { launchIds }, { dataSources }) => {
    const results = await dataSources.userAPI.bookTrips({ launchIds });
    const launches = await dataSources.launchAPI.getLaunchesByIds({
      launchIds,
    });

    return {
      success: results && results.length === launchIds.length,
      message:
        results.length === launchIds.length
          ? 'trips booked successfully'
          : `the following launches couldn't be booked: ${launchIds.filter(
              id => !results.includes(id),
            )}`,
      launches,
    };
  },
  cancelTrip: async (_, { launchId }, { dataSources }) => {
    const result = await dataSources.userAPI.cancelTrip({ launchId });

    if (!result)
      return {
        success: false,
        message: 'failed to cancel trip',
      };

    const launch = await dataSources.launchAPI.getLaunchById({ launchId });
    return {
      success: true,
      message: 'trip cancelled',
      launches: [launch],
    };
  },
},

// src/index.js
const isEmail = require('isemail');
const server = new ApolloServer({
  context: async ({ req }) => {
    // simple auth check on every request
    const auth = req.headers && req.headers.authorization || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');
    if (!isEmail.validate(email)) return { user: null };
    // find a user by their email
    const users = await store.users.findOrCreate({ where: { email } });
    const user = users && users[0] || null;
    return { user: { ...user.dataValues } };
  },
  // Additional constructor options
});
```

### 5. Connect to Apollo Studio

- Apollo Studio is a cloud platform that helps you with every phase of GraphQL development, from prototyping to deploying to monitoring.
- Follow [Connect to Apollo Studio](https://www.apollographql.com/docs/tutorial/production/)

## Topics (Apollo Client)

### 6. Set up Apollo Client

- Apollo Client is a comprehensive state management library for JavaScript.
- It enables you to use GraphQL to manage both local and remote data.
- Apollo Client is view-layer agnostic, so you can use it with React, Vue, Angular, or even vanilla JS.
- This tutorial uses React (which Apollo Client's core library supports out of the box)
- Run apollo server in server directory: `npm start`
- Run apollo client in client directory: `npm start`

```:javascript
import {
  ApolloClient,
  gql,
  NormalizedCacheObject
} from '@apollo/client';
import { cache } from './cache';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql'
});

client
  .query({
    query: gql`
      query TestQuery {
        launch(id: 56) {
          id
          mission {
            name
          }
        }
      }
    `
  })
  .then(result => console.log(result));
```

### 7. Fetch data with queries

- To connect Apollo Client to React, we wrap our app in the ApolloProvider component from the @apollo/client package.
- We pass our client instance to the ApolloProvider component via the client prop.
- useQuery: `const { data, loading, error } = useQuery(QUERY);`
- fetch policy
  - fetch policy defines how Apollo Client uses the cache for a particular query.
  - `const data = useQuery(query, { fetchPolicy: "network-only" })`
  - `network-only`: Apollo Client always queries our server to fetch the up-to-date (latest) data from the server.
  - `cache-first`: default - Apollo Client checks the cache to see if the result is present before making a network request

```:javascript
// src/index.tsx
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider
} from '@apollo/client';
import { cache } from './cache';
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import injectStyles from './styles';

// Initialize ApolloClient
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
});

injectStyles();

// Pass the ApolloClient instance to the ApolloProvider component
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById('root')
);

// src/pages/launces.tsx (initial version)
import React, { Fragment, useState }  from 'react';
import { RouteComponentProps } from '@reach/router';

interface LaunchesProps extends RouteComponentProps {}
const Launches: React.FC<LaunchesProps> = () => {
  return <div />;
}
export default Launches;

// src/pages/launces.tsx (final)
import React, { Fragment, useState }  from 'react';
import { RouteComponentProps } from '@reach/router';
import { gql, useQuery } from '@apollo/client'
import { LaunchTile, Header, Button, Loading } from '../components';
import * as GetLaunchListTypes from './__generated__/GetLaunchList';

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    __typename
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`;

export const GET_LAUNCHES = gql`
  query GetLaunchList($after: String) {
    launches(after: $after) {
      cursor
      hasMore
      launches {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

interface LaunchesProps extends RouteComponentProps {}

const Launches: React.FC<LaunchesProps> = () => {
  const {
    data,
    loading,
    error,
    fetchMore, // for pagination
  } = useQuery<
    GetLaunchListTypes.GetLaunchList,
    GetLaunchListTypes.GetLaunchListVariables
  >(GET_LAUNCHES);

  const [isLoadingMore, setIsLoadingMore] = useState(false); // for pagination

  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <Fragment>
      <Header />
      // without pagination
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.map((launch: any) => (
          <LaunchTile key={launch.id} launch={launch} />
        ))}
      // with pagination
      {data.launches && data.launches.hasMore && (
        isLoadingMore
          ? <Loading />
          : <Button
              onClick={async () => {
                setIsLoadingMore(true);
                await fetchMore({
                  variables: {
                    after: data.launches.cursor,
                  },
                });
                setIsLoadingMore(false);
              }}
            >
              Load More
        </Button>
      )}
    </Fragment>
  );
}

export default Launches;
```

### 8. Update data with mutations

- useMutation doesn't execute its operation as soon as its component renders.
- Instead, the hook returns a mutate function that we call to execute the mutation whenever we want (such as when the user submits a form).
- useMutation: `const [mutatationFunction, { loading, error }] = useMutation(MUTATION_QUERY);`

```:javascript
export default function Login() {
  const [login, { loading, error }] = useMutation<
    LoginTypes.Login,
    LoginTypes.LoginVariables
  >(
    LOGIN_USER,
    // optional callback
    {
      onCompleted({ login }) {
        if (login) {
          localStorage.setItem('token', login.token as string);
          localStorage.setItem('userId', login.id as string);
        }
      }
    }
  );

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}

// src/index.tsx
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
  headers: {
    authorization: localStorage.getItem('token') || '',
  }
});
```

### 9. Manage local state

## References

- Official Tutorial
  - [Guide](https://www.apollographql.com/)
  - [GitHub](https://github.com/apollographql/fullstack-tutorial)
