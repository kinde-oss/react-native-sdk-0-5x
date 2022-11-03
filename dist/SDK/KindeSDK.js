var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _Utils=require("./Utils");var _urlParse=_interopRequireDefault(require("url-parse"));var _reactNative=require("react-native");var _AuthorizationCode=_interopRequireDefault(require("./OAuth/AuthorizationCode"));var _Storage=require("./Storage");var KindeSDK=function(){function KindeSDK(issuer,redirectUri,clientId,logoutRedirectUri){var scope=arguments.length>4&&arguments[4]!==undefined?arguments[4]:'openid offline';(0,_classCallCheck2["default"])(this,KindeSDK);(0,_defineProperty2["default"])(this,"issuer",void 0);(0,_defineProperty2["default"])(this,"redirectUri",void 0);(0,_defineProperty2["default"])(this,"clientId",void 0);(0,_defineProperty2["default"])(this,"logoutRedirectUri",void 0);(0,_defineProperty2["default"])(this,"scope",void 0);(0,_defineProperty2["default"])(this,"clientSecret",void 0);this.issuer=issuer;(0,_Utils.checkNotNull)(this.issuer,'Issuer');this.redirectUri=redirectUri;(0,_Utils.checkNotNull)(this.redirectUri,'Redirect URI');this.clientId=clientId;(0,_Utils.checkNotNull)(this.clientId,'Client Id');this.logoutRedirectUri=logoutRedirectUri;(0,_Utils.checkNotNull)(this.logoutRedirectUri,'Logout Redirect URI');this.scope=scope;this.clientSecret='';}(0,_createClass2["default"])(KindeSDK,[{key:"login",value:function(){var _login=(0,_asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(){var auth;return _regenerator["default"].wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:this.cleanUp();auth=new _AuthorizationCode["default"]();return _context.abrupt("return",auth.login(this,true));case 3:case"end":return _context.stop();}}},_callee,this);}));function login(){return _login.apply(this,arguments);}return login;}()},{key:"getToken",value:function getToken(url){var _this=this;return new Promise(function(){var _ref=(0,_asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3(resolve,reject){var URLParsed,_URLParsed$query,code,error,error_description,msg,formData,state,codeVerifier;return _regenerator["default"].wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:try{(0,_Utils.checkNotNull)(url,'URL');URLParsed=(0,_urlParse["default"])(url,true);_URLParsed$query=URLParsed.query,code=_URLParsed$query.code,error=_URLParsed$query.error,error_description=_URLParsed$query.error_description;(0,_Utils.checkNotNull)(code,'code');if(error){msg=error_description?error_description:error;reject(msg);}formData=new FormData();formData.append('code',code);formData.append('client_id',_this.clientId);formData.append('client_secret',_this.clientSecret);formData.append('grant_type','authorization_code');formData.append('redirect_uri',_this.redirectUri);state=_Storage.sessionStorage.getState();if(state){formData.append('state',state);}codeVerifier=_Storage.sessionStorage.getCodeVerifier();if(codeVerifier){formData.append('code_verifier',codeVerifier);}fetch(_this.tokenEndpoint,{method:'POST',headers:{'Content-Type':'multipart/form-data'},body:formData}).then(function(response){return response.json();}).then(function(){var _ref2=(0,_asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(responseJson){return _regenerator["default"].wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:if(!responseJson.error){_context2.next=2;break;}return _context2.abrupt("return",reject(responseJson));case 2:_Storage.sessionStorage.setAccessToken(responseJson.access_token);resolve(responseJson);case 4:case"end":return _context2.stop();}}},_callee2);}));return function(_x3){return _ref2.apply(this,arguments);};}())["catch"](function(err){reject(err.response.data);});}catch(error){reject(error);}case 1:case"end":return _context3.stop();}}},_callee3);}));return function(_x,_x2){return _ref.apply(this,arguments);};}());}},{key:"register",value:function register(){var auth=new _AuthorizationCode["default"]();return auth.login(this,true,'registration');}},{key:"logout",value:function(){var _logout=(0,_asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4(){var URLParsed;return _regenerator["default"].wrap(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:this.cleanUp();URLParsed=(0,_urlParse["default"])(this.logoutEndpoint,true);URLParsed.query['redirect']=this.logoutRedirectUri;_reactNative.Linking.openURL(URLParsed.toString());case 4:case"end":return _context4.stop();}}},_callee4,this);}));function logout(){return _logout.apply(this,arguments);}return logout;}()},{key:"cleanUp",value:function cleanUp(){return _Storage.sessionStorage.clear();}},{key:"authorizationEndpoint",get:function get(){return this.issuer+"/oauth2/auth";}},{key:"tokenEndpoint",get:function get(){return this.issuer+"/oauth2/token";}},{key:"logoutEndpoint",get:function get(){return this.issuer+"/logout";}}]);return KindeSDK;}();var _default=KindeSDK;exports["default"]=_default;