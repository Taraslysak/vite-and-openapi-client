/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ToDoIn } from '../models/ToDoIn';
import type { ToDoOut } from '../models/ToDoOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TodoService {

    /**
     * Get All Todos
     * @returns string Successful Response
     * @throws ApiError
     */
    public static todoGetAllTodos(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/todos',
        });
    }

    /**
     * Get Todo Details
     * @param id
     * @returns any Successful Response
     * @throws ApiError
     */
    public static todoGetTodoDetails(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/todos/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Todo
     * @param id
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static todoUpdateTodo(
        id: string,
        requestBody: ToDoOut,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/todos/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Todo
     * @param id
     * @returns any Successful Response
     * @throws ApiError
     */
    public static todoDeleteTodo(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/todos/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Add Todo
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static todoAddTodo(
        requestBody: ToDoIn,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/todos/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
