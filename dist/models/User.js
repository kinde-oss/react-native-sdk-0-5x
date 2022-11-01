Object.defineProperty(exports,"__esModule",{value:true});exports.UserFromJSON=UserFromJSON;exports.UserFromJSONTyped=UserFromJSONTyped;exports.UserToJSON=UserToJSON;exports.instanceOfUser=instanceOfUser;var _ApiClient=require("../ApiClient");function instanceOfUser(value){var isInstance=true;return isInstance;}function UserFromJSON(json){return UserFromJSONTyped(json,false);}function UserFromJSONTyped(json,ignoreDiscriminator){if(json===undefined||json===null){return json;}return{'id':!(0,_ApiClient.exists)(json,'id')?undefined:json['id'],'email':!(0,_ApiClient.exists)(json,'email')?undefined:json['email'],'fullName':!(0,_ApiClient.exists)(json,'full_name')?undefined:json['full_name'],'lastName':!(0,_ApiClient.exists)(json,'last_name')?undefined:json['last_name'],'firstName':!(0,_ApiClient.exists)(json,'first_name')?undefined:json['first_name'],'isSuspended':!(0,_ApiClient.exists)(json,'is_suspended')?undefined:json['is_suspended']};}function UserToJSON(value){if(value===undefined){return undefined;}if(value===null){return null;}return{'id':value.id,'email':value.email,'full_name':value.fullName,'last_name':value.lastName,'first_name':value.firstName,'is_suspended':value.isSuspended};}