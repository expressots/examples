// Exclude keys from user
function excludeFromQuery<T, Key extends keyof T>(
    user: T,
    keys: Key[],
): Omit<T, Key> {
    for (let key of keys) {
        delete user[key];
    }
    return user;
}

export default excludeFromQuery;
