# KindeReactNativeOAuth.UserApi

All URIs are relative to *https://app.kinde.com*

| Method                                          | HTTP request                 | Description                  |
| ----------------------------------------------- | ---------------------------- | ---------------------------- |
| [**getUserProfile**](UserApi.md#getUserProfile) | **GET** /oauth2/user_profile | Returns current user profile |

## getUserProfile

> UserProfile getUserProfile()

Returns current user profile

Test

### Example

```javascript
import KindeReactNativeOAuth from 'KindeReactNativeOAuth';
let defaultClient = KindeReactNativeOAuth.ApiClient.instance;
// Configure OAuth2 access token for authorization: oauth
let oauth = defaultClient.authentications['oauth'];
oauth.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new KindeReactNativeOAuth.UserApi();
apiInstance.getUserProfile((error, data, response) => {
    if (error) {
        console.error(error);
    } else {
        console.log('API called successfully. Returned data: ' + data);
    }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**UserProfile**](UserProfile.md)

### Authorization

[oauth](../README.md#oauth)

### HTTP request headers

-   **Content-Type**: Not defined
-   **Accept**: application/json
