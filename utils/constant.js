const httpCode = {
  success: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unAuthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  gone: 410,
  unprocessEntity: 422,
  internalError: 500,
  serviceUnavailable: 503
}

const format = {
  error: (code, data, message) => ({
    code,
    data: data || null,
    message
  }),
  success: (data, message) => ({
    code: httpCode.success,
    data: data || null,
    message: message || 'OK'
  }),
  sourceCreated: (data, message) => ({
    code: httpCode.created,
    data: data || null,
    message: message || 'Content Created'
  }),
  noContent: (data, message) => ({
    code: httpCode.noContent,
    data: data || null,
    message: message || 'No Content Found'
  }),
  badRequest: (data, message) => ({
    code: httpCode.badRequest,
    data: data || null,
    message: message || 'Bad Request'
  }),
  unAuthorized: (data, message) => ({
    code: httpCode.unAuthorized,
    data: data || null,
    message: message || 'Unauthorized'
  }),
  forbidden: (data, message) => ({
    code: httpCode.forbidden,
    data: data || null,
    message: message || 'Not Eligible'
  }),
  notFound: (data, message) => ({
    code: httpCode.notFound,
    data: data || null,
    message: message || 'Not found'
  }),
  conflict: (data, message) => ({
    code: httpCode.conflict,
    data: data || null,
    message: message || 'Conflict'
  }),
  unprocessEntity: (data, message) => ({
    code: httpCode.unprocessEntity,
    data: data || null,
    message: message || 'Missing Or Invalid Parameters'
  }),
  internalError: (error, message) => ({
    code: httpCode.internalError,
    data: null,
    error: `${error}`,
    message: message || 'Internal Server Error'
  }),
  generateErrorObject: (param, message, location) => ({
    param,
    message,
    location
  }),
  gone: (data, message) => ({
    code: httpCode.gone,
    data: data || null,
    message: message || 'No Longer Available'
  }),
  currentlyUnavailable: (data, message) => ({
    code: httpCode.serviceUnavailable,
    data: data || null,
    message: message || 'Currently Service Unavailable'
  })
}

const modelNames = {
  userModel: 'users'
}

const tokenExpiration = {
  verifySignup: '5m',
  loginToken: '30d'
}

const tokenPurpose = {
  userAccess: 'user-access',
  signup: 'verify-signup'
}

module.exports = {
  httpCode,
  format,
  modelNames,
  tokenExpiration,
  tokenPurpose
}