const TokenKey = 'zwgo-Token';

export function getToken() {
    return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
    return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
    return sessionStorage.removeItem(TokenKey)
}

/**
 * Remove class from element
 * @param {array} pageRole
 * @param {array} userRole
 */
export function hasRoles(pageRole, userRole) {
    if (pageRole && pageRole.length) {
        if (userRole.length) {
            for (let i = 0; i < userRole.length; i++) {
                if (pageRole.includes(userRole[i])) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    } else {
        return true;
    }
}