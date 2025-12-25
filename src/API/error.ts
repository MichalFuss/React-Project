export function ApiError( status : number){
  switch(status){
        case 400:
            throw new Error("Bad Request - Invalid input data.");
        case 401:
            throw new Error("Unauthorized - Incorrect email or password.");
        case 403:
            throw new Error("Forbidden - You do not have permission to access this resource.");
        case 404:
            throw new Error("Not Found - The requested resource could not be found.");
        case 409:
            throw new Error("Conflict - The request could not be completed due to a conflict with the current state of the resource.");
        case 500:
            throw new Error("Internal Server Error - Please try again later.");
        default:
            throw new Error(`Unexpected error: ${status}`);
    }
}