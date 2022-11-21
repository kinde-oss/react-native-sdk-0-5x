var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _base=_interopRequireDefault(require("./base"));var _global$sessionStorag;function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=(0,_getPrototypeOf2["default"])(Derived),result;if(hasNativeReflectConstruct){var NewTarget=(0,_getPrototypeOf2["default"])(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else{result=Super.apply(this,arguments);}return(0,_possibleConstructorReturn2["default"])(this,result);};}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true;}catch(e){return false;}}var Storage=function(_BaseStore){(0,_inherits2["default"])(Storage,_BaseStore);var _super=_createSuper(Storage);function Storage(){(0,_classCallCheck2["default"])(this,Storage);return _super.call(this);}(0,_createClass2["default"])(Storage,[{key:"getAccessToken",value:function getAccessToken(){return this.getItem('accessToken');}},{key:"setAccessToken",value:function setAccessToken(newAccessToken){return this.setItem('accessToken',this.convertString(newAccessToken));}},{key:"getState",value:function getState(){return this.getItem('state');}},{key:"setState",value:function setState(newState){return this.setItem('state',this.convertString(newState));}},{key:"getCodeVerifier",value:function getCodeVerifier(){return this.getItem('codeVerifier');}},{key:"setCodeVerifier",value:function setCodeVerifier(newCodeVerifier){return this.setItem('codeVerifier',this.convertString(newCodeVerifier));}},{key:"getAuthStatus",value:function getAuthStatus(){return this.getItem('authStatus');}},{key:"setAuthStatus",value:function setAuthStatus(newAuthStatus){return this.setItem('authStatus',this.convertString(newAuthStatus));}},{key:"convertString",value:function convertString(str){return typeof str==='string'?str:JSON.stringify(str);}}]);return Storage;}(_base["default"]);var sessionStorage=global.sessionStorage=(_global$sessionStorag=global.sessionStorage)!==null&&_global$sessionStorag!==void 0?_global$sessionStorag:new Storage();var _default=sessionStorage;exports["default"]=_default;