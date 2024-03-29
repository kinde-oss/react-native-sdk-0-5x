# @KindeOssReactNativeSdk05x.OAuthApi

All URIs are relative to _https://{businessName}.kinde.com/_

| Method                                               | HTTP request                    | Description                                         |
| ---------------------------------------------------- | ------------------------------- | --------------------------------------------------- |
| [**getUser**](OAuthApi.md#getUser)                   | **GET** /oauth2/user_profile    | Returns the details of the currently logged in user |
| [**getUserProfileV2**](OAuthApi.md#getUserProfileV2) | **GET** /oauth2/v2/user_profile | Returns the details of the currently logged in user |

## getUser

> UserProfile getUser()

Returns the details of the currently logged in user

Contains the id, names and email of the currently logged in user

### Example

```javascript
import @KindeOssReactNativeSdk05x from '@kinde-oss/react-native-sdk-0-5x';
let defaultClient = @KindeOssReactNativeSdk05x.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: kindeBearerAuth
let kindeBearerAuth = defaultClient.authentications['kindeBearerAuth'];
kindeBearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new @KindeOssReactNativeSdk05x.OAuthApi();
const data = await apiInstance.getUser();
console.log('API called successfully. Returned data: ' + data);

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**UserProfile**](UserProfile.md)

### Authorization

[kindeBearerAuth](../README.md#kindeBearerAuth)

### HTTP request headers

-   **Content-Type**: Not defined
-   **Accept**: application/json

## getUserProfileV2

> UserProfileV2 getUserProfileV2()

Returns the details of the currently logged in user

Contains the id, names and email of the currently logged in user

### Example

```javascript
import @KindeOssReactNativeSdk05x from '@kinde-oss/react-native-sdk-0-5x';
let defaultClient = @KindeOssReactNativeSdk05x.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: kindeBearerAuth
let kindeBearerAuth = defaultClient.authentications['kindeBearerAuth'];
kindeBearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new @KindeOssReactNativeSdk05x.OAuthApi();
const data = await apiInstance.getUserProfileV2();
console.log('API called successfully. Returned data: ' + data);

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**UserProfileV2**](UserProfileV2.md)

### Authorization

[kindeBearerAuth](../README.md#kindeBearerAuth)

### HTTP request headers

-   **Content-Type**: Not defined
-   **Accept**: application/json
