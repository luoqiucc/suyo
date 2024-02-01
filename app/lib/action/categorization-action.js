'use server'

export async function createCategorization(prevState, formData) {
    console.log(formData.get('categorizationName'))

    return {
        message: 'sssd',
        errors: {}
    }
}

export async function removeCategorization(prevState, formData) {
    console.log(formData.get('categorizationUid'))

    return {
        message: 'sssd',
        errors: {}
    }
}

export async function editCategorization(prevState, formData) {
    console.log(formData.get('categorizationUid'))
    
    return {
        message: 'sssd',
        errors: {}
    }
}

