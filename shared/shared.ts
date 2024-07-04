import type { RequestResponseMapping } from "./requests"

export interface GenericRequest<TRequest> {
   type: RequestId
   payload: TRequest
}

export type GenericResponse<TResponse> =
   | { success: true; payload: TResponse }
   | { success: false; error: string }

export type AllRequests = {
   [K in keyof RequestResponseMapping]: RequestResponseMapping[K]["request"]
}[keyof RequestResponseMapping]

// Define a type for the request IDs
export type RequestId = keyof RequestResponseMapping // Extend this as you add more requests

// Define a generic type for associating request and response types
export interface RequestResponsePair<TRequest, TResponse> {
   request: TRequest
   response: TResponse
}
