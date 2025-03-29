
export enum USER_ACTION_TYPES {
    GET_USER = "GET_USER"
}

export const getUserAction = (userId: string) => ({
    type: USER_ACTION_TYPES.GET_USER,
    payload: {
        userId
    }
});