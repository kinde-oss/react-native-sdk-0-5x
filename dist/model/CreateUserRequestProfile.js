var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _ApiClient=_interopRequireDefault(require("../ApiClient"));var CreateUserRequestProfile=function(){function CreateUserRequestProfile(){(0,_classCallCheck2["default"])(this,CreateUserRequestProfile);CreateUserRequestProfile.initialize(this);}(0,_createClass2["default"])(CreateUserRequestProfile,null,[{key:"initialize",value:function initialize(obj){}},{key:"constructFromObject",value:function constructFromObject(data,obj){if(data){obj=obj||new CreateUserRequestProfile();if(data.hasOwnProperty('given_name')){obj['given_name']=_ApiClient["default"].convertToType(data['given_name'],'String');}if(data.hasOwnProperty('family_name')){obj['family_name']=_ApiClient["default"].convertToType(data['family_name'],'String');}}return obj;}}]);return CreateUserRequestProfile;}();CreateUserRequestProfile.prototype['given_name']=undefined;CreateUserRequestProfile.prototype['family_name']=undefined;var _default=CreateUserRequestProfile;exports["default"]=_default;