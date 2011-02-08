var APIBridge = {
	Internal: {
		_waitForApiBridgeWatchDogCntr: 0,
		SESSIONIDNAME: "apibridgesessionid",
		SERVER_URL: "http://127.0.0.1:",
		TOKEN_KEY: "si.inovait.apibridge.token",


		_readFile: function(fileName, onSuccess, onError) {
			var tokenReq = new XMLHttpRequest();

		    tokenReq.onreadystatechange = function() {
			    if ( tokenReq.readyState == 4 ) {
					if ( tokenReq.status == 200 )
						onSuccess( tokenReq.responseText );
					else
						onError( tokenReq );

					tokenReq = null;
			    }
			}

			if (APIBridge.Internal._appendDummyParamHack()) {
				fileName += "?";
			}

			tokenReq.open( "GET", fileName, true );
			tokenReq.send( null );
		},

		_appendDummyParamHack: function() {
			if (APIBridge.Internal._appendDummyParam === undefined) {
				var ver = navigator.userAgent.match(/Series60\/([\d\.]+)/i);
				var ver = (ver && ver.length > 1) ? ver[1] : "0";
				ver = parseInt(ver);
				APIBridge.Internal._appendDummyParam = (isNaN(ver) || ver < 5);
				if (APIBridge.Internal._appendDummyParam) {
					// Check web kit version too.
					var webKitVer = navigator.userAgent.match(/AppleWebKit\/([\d\.]+)/i);
					var webKitVer = (webKitVer && webKitVer.length > 1) ? webKitVer[1] : "0";
					webKitVer = parseInt(webKitVer);
					if (!isNaN(webKitVer))
						APIBridge.Internal._appendDummyParam = webKitVer < 525;
				}
			}

			return APIBridge.Internal._appendDummyParam;
		},

		_readToken: function(onSuccess, onError) {
			APIBridge.Internal._readFile( "apibridge.token.txt", onSuccess, onError );
		},

		_readPortNumber: function(onSuccess, onError) {
			APIBridge.Internal._readFile( "c:\\si\\inovait\\apibridge\\port.txt", onSuccess, onError );
		},

		_sendDelayedRequest: function( path, parameters, onSuccess, onError, delay )  {
			setTimeout(
				function() {
					APIBridge.Internal._sendRequest( path, parameters, onSuccess, onError );
				},
				delay || 0
			);
		},
		
		_processLogin: function(loginToken, onSuccess, onError) {
			// Request failed. Auth.
			APIBridge.Internal._sendDelayedRequest(
				"/login?" + APIBridge.Internal.SESSIONIDNAME + "=" + encodeURIComponent(loginToken) + "&apibridgepath=" + encodeURIComponent(APIBridge.Internal._getWidgetPath()),
				null,
				function(req) {
					APIBridge.Internal._readToken(
						function(token){
							if (APIBridge.log.isDebugEnabled())
								APIBridge.log.debug("Got temp auth token: " + token);

							APIBridge.Internal._sendDelayedRequest(
								"/login?" + APIBridge.Internal.SESSIONIDNAME + "=" + encodeURIComponent(token),
								null,
								function(req){
									if (APIBridge.log.isDebugEnabled())
										APIBridge.log.debug("GOT session token: " + req.responseText);

									APIBridge.Internal._sessionId = APIBridge.Internal.SESSIONIDNAME + "=" + encodeURIComponent(req.responseText);
									widget.setPreferenceForKey(APIBridge.Internal._sessionId, APIBridge.Internal.TOKEN_KEY);

									onSuccess();
								},
								onError
							);
						},
						onError
					);
				},
				onError
			);
		},

		_sendRequest: function( path, parameters, onSuccess, onError )  {
			var httpReq = new XMLHttpRequest();
			httpReq.onreadystatechange = function(){
				if (httpReq.readyState === 4) {
					var responseStatus = httpReq.status;
					if (responseStatus === 0 || responseStatus == null) {
						// Response is empty because APIBridge server is probably
						// not running yet. Give some time to server and try request again. 
						// FIXME: start server again?
						++APIBridge.Internal._waitForApiBridgeWatchDogCntr;
						
						// Wait max 10 seconds (500ms * 20 = 10s).
						if (APIBridge.Internal._waitForApiBridgeWatchDogCntr < 20) {
							APIBridge.Internal._portNumber = null;	// Read port number before sending request.
							APIBridge.Internal._sendDelayedRequest(path, parameters, onSuccess, onError, 500);
						}
						else {
							// Don't try again. Fire error.
							onError(httpReq);
						}
					}
					else {
						APIBridge.Internal._waitForApiBridgeWatchDogCntr = 0;
	
						if (responseStatus === 200) {
							onSuccess(httpReq);
							return;
						}

						if (responseStatus === 403 && httpReq.responseXML) {
							var apibridge = httpReq.responseXML.getElementsByTagNameNS("http://www.inovait.si", "apibridge");
							if (apibridge && apibridge.length) {
								var response = apibridge[0].firstChild;
								if (response && response.nodeName.toLowerCase() === "response" && response.firstChild) {
									var responseCode = response.firstChild.nodeValue;
									if (responseCode === "401") {
										APIBridge.Internal._processLogin(
											response.getAttribute("token"),
											function() {
												APIBridge.Internal._sendDelayedRequest(path, parameters, onSuccess, onError);
											},
											onError
										);
									}
									else {
										APIBridge.log.error("Error: " + responseCode);
										onError(httpReq);
									}
									
									return;
								}
							}
						}
						
						// Handle error response (not 200 OK).
						onError(httpReq);
					}
				}
			}
			
			if (APIBridge.Internal._sessionId === undefined)
				APIBridge.Internal._sessionId = widget.preferenceForKey(APIBridge.Internal.TOKEN_KEY); 

			var fullPath = path;
			if (APIBridge.Internal._sessionId) {
				fullPath += (path.indexOf("?") == -1) ? "?" : "&";
				fullPath += APIBridge.Internal._sessionId;
			}

			APIBridge.Internal._getFullUrl(
				function(url) {
					url += fullPath;
					if (parameters) {
						httpReq.open("POST", url, true);
						httpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						httpReq.send(parameters);
					}
					else {
						httpReq.open("GET", url, true);
						httpReq.send(null);
					}
				},
				onError	
			);
		},
		
		_getWidgetPath: function() {
			var pos = window.location.href.lastIndexOf("/");
			return window.location.href.substring(0, pos);
		},

		_getFullUrl: function(onSuccess, onError) {
			if (!APIBridge.Internal._portNumber) {
				APIBridge.Internal._readPortNumber(
					function(port){
						APIBridge.Internal._portNumber = port;
						onSuccess(APIBridge.Internal.SERVER_URL + port);
					}, 
					function(req){
						onError(req);
					}
				);			
			}
			else
				onSuccess(APIBridge.Internal.SERVER_URL + APIBridge.Internal._portNumber);		
		}
	},

	fileUpload: function( varName, fileName, url, parameters, onSuccess, onError ) {
		var parArray = new Array();

		if(parameters) {
			for(name in parameters) {
				parArray.push(name + "=" + encodeURIComponent(parameters[name]));
			}
		}
		
		var u = "/fileupload?vn="+encodeURIComponent(varName)+"&fn="+encodeURIComponent(fileName)+"&url="+encodeURIComponent(url);		
		APIBridge.Internal._sendRequest( 
			u,
			parArray.join("&"), 
			function(req){
				onSuccess( req );										
			}, 
			function(status){
				onError(status);
			} 
		);		
	},
	
	takePhoto: function( onSuccess, onError ) {
		APIBridge.newFileService(APIBridge.NewFileType.Image, onSuccess, onError);
	},
	
	NewFileType: {
		Image: "Image",
		Audio: "Audio",
		Video: "Video"
	},
	
	newFileService: function( fileType, onSuccess, onError ) {
		var processSuccessResponse = function(res) {
			setTimeout(
				function() {
					var src = null;
					if (res.responseXML) {
						var rv = APIBridge._xml2Object(res.responseXML.firstChild);
						if (rv.camera && rv.camera.length && rv.camera[0].src && rv.camera[0].src.length) {
							src = rv.camera[0].src;
						}
					}
				
					onSuccess(src);
				},
				0
			);
		}

		var url = "/newfileservice";
		if (fileType)
			url += "?fileType=" + fileType;

		APIBridge.Internal._sendRequest( 
			url, 
			null,
			processSuccessResponse,
			onError
		);		
	},	

	readFile: function( fileName, onSuccess, onError) {
		APIBridge.Internal._sendRequest( 
			"/readfile?fn="+encodeURIComponent(fileName), 
			null,
			function(req){
				if (req.responseText)
					onSuccess(decode64(req.responseText), req.getResponseHeader("Content-Type"));
				else 
					onError(500);					
			},
			onError );		
	},
	
    resizeImg: function( fileName, width, height, maintainAspectRatio, onSuccess, onError ){
		APIBridge.Internal._getFullUrl(
			function(url) {
				maintainAspectRatio = maintainAspectRatio ? 1 : 0;				
				url += "/resize?fn="+encodeURIComponent(fileName)+"&w="+width+"&h="+height + "&mar=" + maintainAspectRatio;		
				onSuccess(url);
			},
			onError
		);
    },    

    getThumbnail: function( fileName, onSuccess, onError ) {
		APIBridge.Internal._getFullUrl(
			function(url) {
				url += "/thumbnail?fn="+encodeURIComponent(fileName);
				onSuccess(url);
			},
			onError
		);
    },

	/**
	 * The Logging Service API allows widgets to add, read, and delete logging events such as call logs, 
	 * messaging logs, and so forth. The API is integrated into WRT through the device object.
	 * 
	 * NOTE: only GetList is supported in current version (async version only).
	 */
	getLoggingService: function() {
		return { 
			GetList: APIBridge._wrapServiceAPIFunc(
				function(criteria) {
					// TODO: implement calllog criteria  - now they are just ignored...
					return "/calllog";
				},
				APIBridge._convertXml2Result
			)
		}
	},
	
	/**
	 * The Location Service API allows widgets to retrieve information about the physical 
	 * location of a device and to perform calculations based on location information. The API 
	 * is integrated into WRT through the device object.
	 * 
	 * NOTE: only GetLocation() is supported in current version (async version only).
	 */
	getLocationService: function() {
		return { 
			GetLocation: APIBridge._wrapServiceAPIFunc(
				function(criteria) {
					return "/location";
				},
				APIBridge._convertXml2Result
			)
		}	
	},
	
	/**
	 * The Media Management Service API allows widgets to retrieve information (metadata) about the media 
	 * files stored in the Media Gallery of a device. The API is integrated into WRT through the device object.
	 * 
	 * NOTE: only GetList is supported in current version (async version only).
	 */
	getMediaManagementService: function() {
		return { 
			GetList: APIBridge._wrapServiceAPIFunc(
				function(criteria) {
					var url = "/contentListing?filter.filetype=" + criteria.Filter.FileType;
					
					if (criteria.Sort) {
						if (criteria.Sort.Key)
							url += "&sort.key=" + criteria.Sort.Key;
							
						if (criteria.Sort.Order)
							url += "&sort.order=" + criteria.Sort.Order;					
					}
					
					if (criteria.Filter.Key)
						url += "&filter.key=" + criteria.Filter.Key;
	
					if (criteria.Filter.StartRange)
						url += "&filter.startrange=" + criteria.Filter.StartRange;
					
					if (criteria.Filter.EndRange)
						url += "&filter.endrange=" + criteria.Filter.EndRange;

					return url;
				},
				APIBridge._convertXml2Result
			)
		}
	},
	
	_filterObject: function(item) {
		var obj = {};
		
		for (var name in item) {
			var val = item[name];
			if (val.constructor === String) 
				obj[name] = val;
		}
		
		return obj;
	},
	
	_convertXml2Result: function(res) {
		if (res.responseXML == null)
			throw "XML document not present in response.";

		var rv = APIBridge._xml2Object(res.responseXML.firstChild);
		if (rv.item && rv.item.length)
			return APIBridge._filterObject(rv.item[0]);			
		
		var list = [];
		var xmlList = rv.list[0].item;
		if (xmlList) {
			for (var i = 0; i < xmlList.length; ++i) {
				list.push(APIBridge._filterObject(xmlList[i]));
			}
		}
		
		return new APIBridge.IterableList( list );
	},

	_wrapServiceAPIFunc: function(urlBuilderFunc, responseBuilderFunc) {							
		return function(criteria, callback){
			var url = urlBuilderFunc(criteria);

			var errorFunc = function(errorMessage) {
				var result = {
					ErrorCode: 1000,
					ErrorMessage: errorMessage
				}
				
				callback(88, 4, result);								
			}

			var errorResponse = function(req) {
				errorFunc(req.status + ";" + req.statusText);
			}

			APIBridge.Internal._sendRequest(
				url,
				null,
				function(res) {
					var returnValue;
					
					try {
						returnValue = responseBuilderFunc(res);
					}
					catch (err) {
						errorFunc(err);
						return;
					}

					var result = {
						ErrorCode: 0,
						ReturnValue: returnValue
					}
					
					callback(88, 2, result);						
				},
				errorResponse
			);

			return {
				TransactionID: 88,
				ErrorCode: 0
			}
		}
	},	

	_xml2Object: function( node ) {
		if ( node == null )
			return [];

		// There are some text nodes within xml, only containing
		// i.e. "\n" chars. Only recognize text nodes with no siblings or just 
		// text siblings and ignore others. They should be empty anyway.
		if ( node.nodeType == Node.TEXT_NODE ) {
			if ( node.nextSibling == null || node.nextSibling.nodeType == Node.TEXT_NODE ) {
				var text = "";
				while ( node != null ) {
					if (node.nodeType == Node.TEXT_NODE) {
						text += node.nodeValue;
					}
					
					node = node.nextSibling;
				}
				
				// Return concated text value.
				return { leaf: true, value: text };
			}
		}
		
		var items = {};
		while ( node != null ) {
			if (node.nodeType == Node.ELEMENT_NODE) {
				var propertyName = node.nodeName.replace( /:/g, "" );				
				var rv = APIBridge._xml2Object(node.firstChild);
				if (rv && rv.leaf) {
					items[propertyName] = rv.value;
				}
				else {
					// Add attributes.
					rv.__attributes__ = [];			
					for ( var i = 0; i < node.attributes.length; ++i ) {
						var attr = node.attributes.item( i );
						// Convert names to lowercase. In FF the name of the attribute preserves
						// the case but on the phone the name is all lowercase.								
						rv.__attributes__[attr.nodeName.toLowerCase()] = attr.nodeValue;
					}
					
					rv.getAttribute = function( name ) {
						return this.__attributes__[name];
					}
						
					if (items[propertyName] == null) 
						items[propertyName] = [rv];
					else
						items[propertyName].push( rv );
				}
			}
				
			node = node.nextSibling;			
		}		
		
		return items;
	}
}

// FIXME - remove logger?
if (window.Logger === undefined) {
	Logger = {
		getLogger: function() {
			return {
				debug: function(msg) {
					alert(msg);
				},
				
				isDebugEnabled: function() {
					return false;
				},
				
				error: function(msg) {
					alert(msg);
				}
			}
		}
	};
}

APIBridge.log = Logger.getLogger("APIBridge");

function decode64(input) {
	var keyStr = "ABCDEFGHIJKLMNOP" +
             "QRSTUVWXYZabcdef" +
             "ghijklmnopqrstuv" +
             "wxyz0123456789+/" +
             "=";
	
     var output = "";
     var chr1, chr2, chr3 = "";
     var enc1, enc2, enc3, enc4 = "";
     var i = 0;
 
     // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
     var base64test = /[^A-Za-z0-9\+\/\=]/g;
     if (base64test.exec(input)) {
        alert("There were invalid base64 characters in the input text.\n" +
              "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
              "Expect errors in decoding.");
     }
     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
     do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
 
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
 
        output = output + String.fromCharCode(chr1);
 
        if (enc3 != 64) {
           output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
           output = output + String.fromCharCode(chr3);
        }
 
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
 
     } while (i < input.length);
 
     return unescape(output);
  }
  
  
  
APIBridge.IterableList = function(items) {
	this._items = items;
	this.reset();	
}

APIBridge.IterableList.prototype = {
	reset: function() {
		this._pos = 0;
	},
	
	getNext: function() {
		return this._items[this._pos++];
	}	
}
