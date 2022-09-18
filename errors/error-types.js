let ErrorType = {
    GENERAL_ERROR: { id: 1, httpCode: 600, message: 'Something went badly wrong', isShowStackTrace: true },
    ID_ALREADY_EXIST: { id: 2, httpCode: 601, message: 'id already exist', isShowStackTrace: false },
    EMAIL_ALREADY_EXIST: { id: 3, httpCode: 601, message: 'email already exist', isShowStackTrace: false },
    UNAUTHORIZED: { id: 3, httpCode: 401, message: 'login failed invalid user name or password', isShowStackTrace: false },
    UNAUTHORIZED_USER: { id: 3, httpCode: 401, message: 'you are not admin', isShowStackTrace: false },
}