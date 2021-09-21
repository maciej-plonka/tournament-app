export type ApiResponse<T = never> = { type: "error", message: string } | { type: "success", payload?: T }


export function createSuccessResponse<T>(payload?: T): ApiResponse<T> {
    return {type: "success", payload}
}

export function createErrorResponse<T>(message: string): ApiResponse<T> {
    return {type: "error", message}
}
