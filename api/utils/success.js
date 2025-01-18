export const successHandler = ((statusCode, message, data=null) => {
    const success = {
        statusCode: statusCode,
        message:message,
        data: data
    }
    return success
})