# @KindeOssReactNativeSdk05x.UsersApi

All URIs are relative to *https://app.kinde.com/api/v1*

| Method                                   | HTTP request   | Description                                                 |
| ---------------------------------------- | -------------- | ----------------------------------------------------------- |
| [**createUser**](UsersApi.md#createUser) | **POST** /user | Creates a user record                                       |
| [**getUsers**](UsersApi.md#getUsers)     | **GET** /users | Returns a paginated list of end-user records for a business |

## createUser

> CreateUser200Response createUser(opts)

Creates a user record

Creates a user record and optionally zero or more identities for the user. An example identity could be the email address of the user

### Example

```javascript
import @KindeOssReactNativeSdk05x from '@kinde-oss/react-native-sdk-0-5x';
let defaultClient = @KindeOssReactNativeSdk05x.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: kindeBearerAuth
let kindeBearerAuth = defaultClient.authentications['kindeBearerAuth'];
kindeBearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new @KindeOssReactNativeSdk05x.UsersApi();
let opts = {
  'createUserRequest': new @KindeOssReactNativeSdk05x.CreateUserRequest() // CreateUserRequest | The details of the user to create
};
apiInstance.createUser(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

| Name                  | Type                                          | Description                       | Notes      |
| --------------------- | --------------------------------------------- | --------------------------------- | ---------- |
| **createUserRequest** | [**CreateUserRequest**](CreateUserRequest.md) | The details of the user to create | [optional] |

### Return type

[**CreateUser200Response**](CreateUser200Response.md)

### Authorization

[kindeBearerAuth](../README.md#kindeBearerAuth)

### HTTP request headers

-   **Content-Type**: application/json
-   **Accept**: application/json

## getUsers

> [User] getUsers(opts)

Returns a paginated list of end-user records for a business

The returned list can be sorted by full name or email address in ascending or descending order. The number of records to return at a time can also be controlled using the page_size query string parameter.

### Example

```javascript
import @KindeOssReactNativeSdk05x from '@kinde-oss/react-native-sdk-0-5x';
let defaultClient = @KindeOssReactNativeSdk05x.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: kindeBearerAuth
let kindeBearerAuth = defaultClient.authentications['kindeBearerAuth'];
kindeBearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new @KindeOssReactNativeSdk05x.UsersApi();
let opts = {
  'sort': "sort_example", // String | Describes the field and order to sort the result by
  'pageSize': 56, // Number | The number of items to return
  'userId': 56, // Number | The id of the user to filter by
  'nextToken': "nextToken_example" // String | A string to get the next page of results if there are more results
};
apiInstance.getUsers(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

| Name          | Type       | Description                                                        | Notes      |
| ------------- | ---------- | ------------------------------------------------------------------ | ---------- |
| **sort**      | **String** | Describes the field and order to sort the result by                | [optional] |
| **pageSize**  | **Number** | The number of items to return                                      | [optional] |
| **userId**    | **Number** | The id of the user to filter by                                    | [optional] |
| **nextToken** | **String** | A string to get the next page of results if there are more results | [optional] |

### Return type

[**[User]**](User.md)

### Authorization

[kindeBearerAuth](../README.md#kindeBearerAuth)

### HTTP request headers

-   **Content-Type**: Not defined
-   **Accept**: application/json
