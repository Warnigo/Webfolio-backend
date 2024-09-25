type ErrorResponse = {
  statusCode: number
  message: string
}

export type ApiResponse<T> = {
  success: boolean
  messages: string[]
  data?: T
  error?: ErrorResponse
}
