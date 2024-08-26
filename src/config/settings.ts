export const config = {

    pg_connection_string: {
        development: 
        {
            host: "postgresql-156168-0.cloudclusters.net",
            database: "db_ibc",
            user: "sen_super",
            password: "ibc@2811",
            port: 19098,
            ssl: false,
            max: 20,
            idleTimeoutMillis: 15000,
            connectionTimeoutMillis: 15000,
            maxUses: 7500
        },
        production: 
        {
            host: "postgresql-156168-0.cloudclusters.net",
            database: "db_ibc",
            user: "sen_super",
            password: "secret!",
            port: 19098,
            ssl: true,
            max: 20, // set pool max size to 20
            idleTimeoutMillis: 15000, // close idle clients after 15 seconds
            connectionTimeoutMillis: 15000, // return an error after 15 seconds if connection could not be established
            maxUses: 7500 // close (and replace) a connection after it has been used 7500 times (see below for discussion)
        }
    },
    sequelize_connection_string: {
        development: {
            host: "postgresql-156168-0.cloudclusters.net",
            database: "db_ibc",
            user: "sen_super",
            password: "ibc@2811",
            port: 19098,
            ssl: false,
            max: 20,
            idleTimeoutMillis: 15000,
            connectionTimeoutMillis: 15000,
            maxUses: 7500,
            dialect : 'postgres',
            pool: {
                /*
                * Lambda functions process one request at a time but your code may issue multiple queries
                * concurrently. Be wary that `sequelize` has methods that issue 2 queries concurrently
                * (e.g. `Model.findAndCountAll()`). Using a value higher than 1 allows concurrent queries to
                * be executed in parallel rather than serialized. Careful with executing too many queries in
                * parallel per Lambda function execution since that can bring down your database with an
                * excessive number of connections.
                *
                * Ideally you want to choose a `max` number where this holds true:
                * max * EXPECTED_MAX_CONCURRENT_LAMBDA_INVOCATIONS < MAX_ALLOWED_DATABASE_CONNECTIONS * 0.8
                */
                max: 2,
                /*
                * Set this value to 0 so connection pool eviction logic eventually cleans up all connections
                * in the event of a Lambda function timeout.
                */
                min: 0,
                /*
                * Set this value to 0 so connections are eligible for cleanup immediately after they're
                * returned to the pool.
                */
                idle: 0,
                // Choose a small enough value that fails fast if a connection takes too long to be established.
                acquire: 3000,
                /*
                * Ensures the connection pool attempts to be cleaned up automatically on the next Lambda
                * function invocation, if the previous invocation timed out.
                */
                evict: 3 //3 SECONDS //CURRENT_LAMBDA_FUNCTION_TIMEOUT
            }
        },
        production: {
            host: "postgresql-156168-0.cloudclusters.net",
            database: "db_ibc",
            user: "sen_super",
            password: "ibc@2811",
            port: 19098,
            ssl: false,
            max: 20,
            idleTimeoutMillis: 15000,
            connectionTimeoutMillis: 15000,
            maxUses: 7500,
            dialect : 'postgres',
            pool: {
                /*
                * Lambda functions process one request at a time but your code may issue multiple queries
                * concurrently. Be wary that `sequelize` has methods that issue 2 queries concurrently
                * (e.g. `Model.findAndCountAll()`). Using a value higher than 1 allows concurrent queries to
                * be executed in parallel rather than serialized. Careful with executing too many queries in
                * parallel per Lambda function execution since that can bring down your database with an
                * excessive number of connections.
                *
                * Ideally you want to choose a `max` number where this holds true:
                * max * EXPECTED_MAX_CONCURRENT_LAMBDA_INVOCATIONS < MAX_ALLOWED_DATABASE_CONNECTIONS * 0.8
                */
                max: 2,
                /*
                * Set this value to 0 so connection pool eviction logic eventually cleans up all connections
                * in the event of a Lambda function timeout.
                */
                min: 0,
                /*
                * Set this value to 0 so connections are eligible for cleanup immediately after they're
                * returned to the pool.
                */
                idle: 0,
                // Choose a small enough value that fails fast if a connection takes too long to be established.
                acquire: 3000,
                /*
                * Ensures the connection pool attempts to be cleaned up automatically on the next Lambda
                * function invocation, if the previous invocation timed out.
                */
                evict: 3 //3 SECONDS //CURRENT_LAMBDA_FUNCTION_TIMEOUT
            }
        }
    },
    model_name_list: [ "auth", "master"]
};