/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_auth_login } from '../models/Body_auth_login';
import type { Token } from '../models/Token';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Login
     * @param formData
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static authLogin(
        formData: Body_auth_login,
    ): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Logout
     * @returns any Successful Response
     * @throws ApiError
     */
    public static authLogout(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/logout',
        });
    }

}
