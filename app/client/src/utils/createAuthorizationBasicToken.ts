export const createAuthorizationBasicToken = (username: string, password: string): string => {
    return 'Basic ' + btoa(username + ':' + password)
}
