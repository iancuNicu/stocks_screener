
export enum QUERY_ACTION_TYPES {
    GET_QUERIES = "GET_QUERIES",
    GET_DEFAULT_QUERY = "GET_DEFAULT_QUERY"
}

export const getUserDefaultQuery = (auth_token: string, email: string) => ({
    type: QUERY_ACTION_TYPES.GET_DEFAULT_QUERY,
    payload: {
        token: auth_token,
        email
    }
});

export const getUserQueries = (auth_token: string) => ({
    type: QUERY_ACTION_TYPES.GET_QUERIES,
    payload: {
        token: auth_token,
    }
});