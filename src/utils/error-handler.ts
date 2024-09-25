import { HttpException, HttpStatus } from '@nestjs/common'

export function handleHttpError(
  error: any,
  defaultMessage: string,
  defaultStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
): HttpException {
  const message = error?.message || defaultMessage
  const statusCode = error?.statusCode || defaultStatus

  return new HttpException(
    {
      success: false,
      messages: [defaultMessage],
      error: {
        statusCode,
        message,
      },
    },
    statusCode,
  )
}
