export function errorInfo(error, message) {
    return {
        message,
        errors: {
            errorMessage: error
        }
    }
}