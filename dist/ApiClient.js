var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:true});exports.VoidApiResponse=exports.TextApiResponse=exports.ResponseError=exports.RequiredError=exports.JSONApiResponse=exports.FetchError=exports.DefaultConfig=exports.Configuration=exports.COLLECTION_FORMATS=exports.BlobApiResponse=exports.BaseAPI=exports.BASE_PATH=void 0;exports.canConsumeForm=canConsumeForm;exports.exists=exists;exports.mapValues=mapValues;exports.querystring=querystring;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator"));var _assertThisInitialized2=_interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _wrapNativeSuper2=_interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));var _toConsumableArray2=_interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _Storage=_interopRequireDefault(require("./SDK/Storage"));function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=(0,_getPrototypeOf2["default"])(Derived),result;if(hasNativeReflectConstruct){var NewTarget=(0,_getPrototypeOf2["default"])(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else{result=Super.apply(this,arguments);}return(0,_possibleConstructorReturn2["default"])(this,result);};}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true;}catch(e){return false;}}function _createForOfIteratorHelper(o,allowArrayLike){var it=typeof Symbol!=="undefined"&&o[Symbol.iterator]||o["@@iterator"];if(!it){if(Array.isArray(o)||(it=_unsupportedIterableToArray(o))||allowArrayLike&&o&&typeof o.length==="number"){if(it)o=it;var i=0;var F=function F(){};return{s:F,n:function n(){if(i>=o.length)return{done:true};return{done:false,value:o[i++]};},e:function e(_e){throw _e;},f:F};}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion=true,didErr=false,err;return{s:function s(){it=it.call(o);},n:function n(){var step=it.next();normalCompletion=step.done;return step;},e:function e(_e2){didErr=true;err=_e2;},f:function f(){try{if(!normalCompletion&&it["return"]!=null)it["return"]();}finally{if(didErr)throw err;}}};}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}var BASE_PATH='https://app.kinde.com'.replace(/\/+$/,'');exports.BASE_PATH=BASE_PATH;var Configuration=function(){function Configuration(){var configuration=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};(0,_classCallCheck2["default"])(this,Configuration);this.configuration=configuration;}(0,_createClass2["default"])(Configuration,[{key:"config",set:function set(configuration){var _configuration$middle;this.configuration=configuration;this.configuration.middleware=(_configuration$middle=configuration.middleware)!==null&&_configuration$middle!==void 0?_configuration$middle:[];}},{key:"basePath",get:function get(){return this.configuration.basePath!=null?this.configuration.basePath:BASE_PATH;}},{key:"fetchApi",get:function get(){return this.configuration.fetchApi;}},{key:"middleware",get:function get(){return this.configuration.middleware||[];}},{key:"queryParamsStringify",get:function get(){return this.configuration.queryParamsStringify||querystring;}},{key:"username",get:function get(){return this.configuration.username;}},{key:"password",get:function get(){return this.configuration.password;}},{key:"apiKey",get:function get(){var apiKey=this.configuration.apiKey;if(apiKey){return typeof apiKey==='function'?apiKey:function(){return apiKey;};}return undefined;}},{key:"accessToken",get:function get(){var accessToken=this.configuration.accessToken;if(accessToken){return typeof accessToken==='function'?accessToken:(0,_asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(){return _regenerator["default"].wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:return _context.abrupt("return",accessToken);case 1:case"end":return _context.stop();}}},_callee);}));}return undefined;}},{key:"headers",get:function get(){return this.configuration.headers;}},{key:"credentials",get:function get(){return this.configuration.credentials;}}]);return Configuration;}();exports.Configuration=Configuration;var DefaultConfig=new Configuration();exports.DefaultConfig=DefaultConfig;var BaseAPI=function(){function BaseAPI(){var _this=this,_configuration$middle2;var configuration=arguments.length>0&&arguments[0]!==undefined?arguments[0]:DefaultConfig;(0,_classCallCheck2["default"])(this,BaseAPI);this.configuration=configuration;(0,_defineProperty2["default"])(this,"middleware",void 0);(0,_defineProperty2["default"])(this,"fetchApi",function(){var _ref2=(0,_asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2(url,init){var fetchParams,_iterator,_step,middleware,response,_iterator2,_step2,_middleware,_iterator3,_step3,_middleware2;return _regenerator["default"].wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:fetchParams={url:url,init:init};_iterator=_createForOfIteratorHelper(_this.middleware);_context2.prev=2;_iterator.s();case 4:if((_step=_iterator.n()).done){_context2.next=15;break;}middleware=_step.value;if(!middleware.pre){_context2.next=13;break;}_context2.next=9;return middleware.pre(Object.assign({fetch:_this.fetchApi},fetchParams));case 9:_context2.t0=_context2.sent;if(_context2.t0){_context2.next=12;break;}_context2.t0=fetchParams;case 12:fetchParams=_context2.t0;case 13:_context2.next=4;break;case 15:_context2.next=20;break;case 17:_context2.prev=17;_context2.t1=_context2["catch"](2);_iterator.e(_context2.t1);case 20:_context2.prev=20;_iterator.f();return _context2.finish(20);case 23:response=undefined;_context2.prev=24;_context2.next=27;return(_this.configuration.fetchApi||fetch)(fetchParams.url,fetchParams.init);case 27:response=_context2.sent;_context2.next=56;break;case 30:_context2.prev=30;_context2.t2=_context2["catch"](24);_iterator2=_createForOfIteratorHelper(_this.middleware);_context2.prev=33;_iterator2.s();case 35:if((_step2=_iterator2.n()).done){_context2.next=46;break;}_middleware=_step2.value;if(!_middleware.onError){_context2.next=44;break;}_context2.next=40;return _middleware.onError({fetch:_this.fetchApi,url:fetchParams.url,init:fetchParams.init,error:_context2.t2,response:response?response.clone():undefined});case 40:_context2.t3=_context2.sent;if(_context2.t3){_context2.next=43;break;}_context2.t3=response;case 43:response=_context2.t3;case 44:_context2.next=35;break;case 46:_context2.next=51;break;case 48:_context2.prev=48;_context2.t4=_context2["catch"](33);_iterator2.e(_context2.t4);case 51:_context2.prev=51;_iterator2.f();return _context2.finish(51);case 54:if(!(response===undefined)){_context2.next=56;break;}throw new FetchError(_context2.t2,'The request failed and the interceptors did not return an alternative response');case 56:_iterator3=_createForOfIteratorHelper(_this.middleware);_context2.prev=57;_iterator3.s();case 59:if((_step3=_iterator3.n()).done){_context2.next=70;break;}_middleware2=_step3.value;if(!_middleware2.post){_context2.next=68;break;}_context2.next=64;return _middleware2.post({fetch:_this.fetchApi,url:fetchParams.url,init:fetchParams.init,response:response.clone()});case 64:_context2.t5=_context2.sent;if(_context2.t5){_context2.next=67;break;}_context2.t5=response;case 67:response=_context2.t5;case 68:_context2.next=59;break;case 70:_context2.next=75;break;case 72:_context2.prev=72;_context2.t6=_context2["catch"](57);_iterator3.e(_context2.t6);case 75:_context2.prev=75;_iterator3.f();return _context2.finish(75);case 78:return _context2.abrupt("return",response);case 79:case"end":return _context2.stop();}}},_callee2,null,[[2,17,20,23],[24,30],[33,48,51,54],[57,72,75,78]]);}));return function(_x,_x2){return _ref2.apply(this,arguments);};}());this.middleware=(_configuration$middle2=configuration.middleware)!==null&&_configuration$middle2!==void 0?_configuration$middle2:[];}(0,_createClass2["default"])(BaseAPI,[{key:"withMiddleware",value:function withMiddleware(){var _next$middleware;var next=this.clone();next.middleware=(_next$middleware=next.middleware).concat.apply(_next$middleware,arguments);return next;}},{key:"withPreMiddleware",value:function withPreMiddleware(){for(var _len=arguments.length,preMiddlewares=new Array(_len),_key=0;_key<_len;_key++){preMiddlewares[_key]=arguments[_key];}var middlewares=preMiddlewares.map(function(pre){return{pre:pre};});return this.withMiddleware.apply(this,(0,_toConsumableArray2["default"])(middlewares));}},{key:"withPostMiddleware",value:function withPostMiddleware(){for(var _len2=arguments.length,postMiddlewares=new Array(_len2),_key2=0;_key2<_len2;_key2++){postMiddlewares[_key2]=arguments[_key2];}var middlewares=postMiddlewares.map(function(post){return{post:post};});return this.withMiddleware.apply(this,(0,_toConsumableArray2["default"])(middlewares));}},{key:"request",value:function(){var _request=(0,_asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3(context,initOverrides){var _yield$this$createFet,url,init,storage,accessToken,response;return _regenerator["default"].wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:_context3.next=2;return this.createFetchParams(context,initOverrides);case 2:_yield$this$createFet=_context3.sent;url=_yield$this$createFet.url;init=_yield$this$createFet.init;storage=new _Storage["default"]();_context3.next=8;return storage.getAccessToken();case 8:accessToken=_context3.sent;_context3.next=11;return this.fetchApi(url,Object.assign({},init,{headers:{Authorization:"Bearer "+accessToken}}));case 11:response=_context3.sent;if(!(response.status>=200&&response.status<300)){_context3.next=14;break;}return _context3.abrupt("return",response);case 14:throw new ResponseError(response,'Response returned an error code');case 15:case"end":return _context3.stop();}}},_callee3,this);}));function request(_x3,_x4){return _request.apply(this,arguments);}return request;}()},{key:"createFetchParams",value:function(){var _createFetchParams=(0,_asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee5(context,initOverrides){var url,headers,initOverrideFn,initParams,overridedInit,init;return _regenerator["default"].wrap(function _callee5$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:url=this.configuration.basePath+context.path;if(context.query!==undefined&&Object.keys(context.query).length!==0){url+='?'+this.configuration.queryParamsStringify(context.query);}headers=Object.assign({},this.configuration.headers,context.headers);Object.keys(headers).forEach(function(key){return headers[key]===undefined?delete headers[key]:{};});initOverrideFn=typeof initOverrides==='function'?initOverrides:(0,_asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee4(){return _regenerator["default"].wrap(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:return _context4.abrupt("return",initOverrides);case 1:case"end":return _context4.stop();}}},_callee4);}));initParams={method:context.method,headers:headers,body:context.body,credentials:this.configuration.credentials};_context5.t0=Object;_context5.t1={};_context5.t2=initParams;_context5.next=11;return initOverrideFn({init:initParams,context:context});case 11:_context5.t3=_context5.sent;overridedInit=_context5.t0.assign.call(_context5.t0,_context5.t1,_context5.t2,_context5.t3);init=Object.assign({},overridedInit,{body:isFormData(overridedInit.body)||overridedInit.body instanceof URLSearchParams||isBlob(overridedInit.body)?overridedInit.body:JSON.stringify(overridedInit.body)});return _context5.abrupt("return",{url:url,init:init});case 15:case"end":return _context5.stop();}}},_callee5,this);}));function createFetchParams(_x5,_x6){return _createFetchParams.apply(this,arguments);}return createFetchParams;}()},{key:"clone",value:function clone(){var constructor=this.constructor;var next=new constructor(this.configuration);next.middleware=Array.isArray(this.middleware)?this.middleware.slice():[];return next;}}]);return BaseAPI;}();exports.BaseAPI=BaseAPI;function isBlob(value){return typeof Blob!=='undefined'&&value instanceof Blob;}function isFormData(value){return typeof FormData!=='undefined'&&value instanceof FormData;}var ResponseError=function(_Error){(0,_inherits2["default"])(ResponseError,_Error);var _super=_createSuper(ResponseError);function ResponseError(response,msg){var _this2;(0,_classCallCheck2["default"])(this,ResponseError);_this2=_super.call(this,msg);_this2.response=response;(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this2),"name",'ResponseError');return _this2;}return(0,_createClass2["default"])(ResponseError);}((0,_wrapNativeSuper2["default"])(Error));exports.ResponseError=ResponseError;var FetchError=function(_Error2){(0,_inherits2["default"])(FetchError,_Error2);var _super2=_createSuper(FetchError);function FetchError(cause,msg){var _this3;(0,_classCallCheck2["default"])(this,FetchError);_this3=_super2.call(this,msg);_this3.cause=cause;(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this3),"name",'FetchError');return _this3;}return(0,_createClass2["default"])(FetchError);}((0,_wrapNativeSuper2["default"])(Error));exports.FetchError=FetchError;var RequiredError=function(_Error3){(0,_inherits2["default"])(RequiredError,_Error3);var _super3=_createSuper(RequiredError);function RequiredError(field,msg){var _this4;(0,_classCallCheck2["default"])(this,RequiredError);_this4=_super3.call(this,msg);_this4.field=field;(0,_defineProperty2["default"])((0,_assertThisInitialized2["default"])(_this4),"name",'RequiredError');return _this4;}return(0,_createClass2["default"])(RequiredError);}((0,_wrapNativeSuper2["default"])(Error));exports.RequiredError=RequiredError;var COLLECTION_FORMATS={csv:',',ssv:' ',tsv:'\t',pipes:'|'};exports.COLLECTION_FORMATS=COLLECTION_FORMATS;function exists(json,key){var value=json[key];return value!==null&&value!==undefined;}function querystring(params){var prefix=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'';return Object.keys(params).map(function(key){return querystringSingleKey(key,params[key],prefix);}).filter(function(part){return part.length>0;}).join('&');}function querystringSingleKey(key,value){var keyPrefix=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'';var fullKey=keyPrefix+(keyPrefix.length?"["+key+"]":key);if(value instanceof Array){var multiValue=value.map(function(singleValue){return encodeURIComponent(String(singleValue));}).join("&"+encodeURIComponent(fullKey)+"=");return encodeURIComponent(fullKey)+"="+multiValue;}if(value instanceof Set){var valueAsArray=Array.from(value);return querystringSingleKey(key,valueAsArray,keyPrefix);}if(value instanceof Date){return encodeURIComponent(fullKey)+"="+encodeURIComponent(value.toISOString());}if(value instanceof Object){return querystring(value,fullKey);}return encodeURIComponent(fullKey)+"="+encodeURIComponent(String(value));}function mapValues(data,fn){return Object.keys(data).reduce(function(acc,key){return Object.assign({},acc,(0,_defineProperty2["default"])({},key,fn(data[key])));},{});}function canConsumeForm(consumes){var _iterator4=_createForOfIteratorHelper(consumes),_step4;try{for(_iterator4.s();!(_step4=_iterator4.n()).done;){var consume=_step4.value;if('multipart/form-data'===consume.contentType){return true;}}}catch(err){_iterator4.e(err);}finally{_iterator4.f();}return false;}var JSONApiResponse=function(){function JSONApiResponse(raw){var transformer=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(jsonValue){return jsonValue;};(0,_classCallCheck2["default"])(this,JSONApiResponse);this.raw=raw;this.transformer=transformer;}(0,_createClass2["default"])(JSONApiResponse,[{key:"value",value:function(){var _value=(0,_asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee6(){return _regenerator["default"].wrap(function _callee6$(_context6){while(1){switch(_context6.prev=_context6.next){case 0:_context6.t0=this;_context6.next=3;return this.raw.json();case 3:_context6.t1=_context6.sent;return _context6.abrupt("return",_context6.t0.transformer.call(_context6.t0,_context6.t1));case 5:case"end":return _context6.stop();}}},_callee6,this);}));function value(){return _value.apply(this,arguments);}return value;}()}]);return JSONApiResponse;}();exports.JSONApiResponse=JSONApiResponse;var VoidApiResponse=function(){function VoidApiResponse(raw){(0,_classCallCheck2["default"])(this,VoidApiResponse);this.raw=raw;}(0,_createClass2["default"])(VoidApiResponse,[{key:"value",value:function(){var _value2=(0,_asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee7(){return _regenerator["default"].wrap(function _callee7$(_context7){while(1){switch(_context7.prev=_context7.next){case 0:return _context7.abrupt("return",undefined);case 1:case"end":return _context7.stop();}}},_callee7);}));function value(){return _value2.apply(this,arguments);}return value;}()}]);return VoidApiResponse;}();exports.VoidApiResponse=VoidApiResponse;var BlobApiResponse=function(){function BlobApiResponse(raw){(0,_classCallCheck2["default"])(this,BlobApiResponse);this.raw=raw;}(0,_createClass2["default"])(BlobApiResponse,[{key:"value",value:function(){var _value3=(0,_asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee8(){return _regenerator["default"].wrap(function _callee8$(_context8){while(1){switch(_context8.prev=_context8.next){case 0:_context8.next=2;return this.raw.blob();case 2:return _context8.abrupt("return",_context8.sent);case 3:case"end":return _context8.stop();}}},_callee8,this);}));function value(){return _value3.apply(this,arguments);}return value;}()}]);return BlobApiResponse;}();exports.BlobApiResponse=BlobApiResponse;var TextApiResponse=function(){function TextApiResponse(raw){(0,_classCallCheck2["default"])(this,TextApiResponse);this.raw=raw;}(0,_createClass2["default"])(TextApiResponse,[{key:"value",value:function(){var _value4=(0,_asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee9(){return _regenerator["default"].wrap(function _callee9$(_context9){while(1){switch(_context9.prev=_context9.next){case 0:_context9.next=2;return this.raw.text();case 2:return _context9.abrupt("return",_context9.sent);case 3:case"end":return _context9.stop();}}},_callee9,this);}));function value(){return _value4.apply(this,arguments);}return value;}()}]);return TextApiResponse;}();exports.TextApiResponse=TextApiResponse;