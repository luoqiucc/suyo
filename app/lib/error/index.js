export function stateInfo(error, message) {
    return {
        message,
        errors: {
            errorMessage: error
        }
    }
}