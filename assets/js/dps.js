import angular from 'angular';
import "angular-file-saver";

const dps = angular.module('app.dps', ['app.config','ngFileSaver']);

dps.run (function(config, $location){
  config.dps = config.dps || $location.protocol()+'://'+$location.host()+":"+$location.port();

  console.log("Data Processing Server URL", config.dps);
})

dps.service('$dps',

   	function($http, config, $location, FileSaver, Blob, user,appName,i18n){
   	    var dpsURL = config.dps || $location.protocol()+'://'+$location.host()+":"+$location.port();
		angular.extend(this,
			{
				get : function(url,config, timeout, dpsHost){
					// $http.jsonp(dpsURL+url+"?callback=JSON_CALLBACK",config)
					// .then(function(data,status){
					// 	console.log(dpsURL+url+"?callback=JSON_CALLBACK");
					// 	console.log(data)
					// 	console.log(status)
					// })
					// return $http.jsonp(dpsURL+url+"?callback=JSON_CALLBACK",config)
					dpsHost = dpsHost || dpsURL; 
					config = config || {};
					config.client = {user: user, app: appName};
					config.locale = config.locale || i18n.locale(); 
					return $http.get(dpsHost+url,config)
				},
				
				post : function (url, config, tiomeout, dpsHost){
					console.log("dpsHost1", dpsHost)
					dpsHost = dpsHost || dpsURL; 
					console.log("dpsHost2", dpsHost)
										
					config = config || {};
					config.client = {user: user, app: appName};
					config.locale = config.locale || i18n.locale();
					console.log(dpsHost+url, config)
					return $http.post(dpsHost+url, config)
				},

				downloadJSON: function(data,file){
				 var savedObject = new Blob([JSON.stringify(data)],{type:"application/json;charset=utf-8"})// { type: 'text/plain;charset=utf-8' });
    			 FileSaver.saveAs(savedObject,file);
				},
				saveAttachement: function(data,mime,file){
				 var savedObject = new Blob([data],{type:mime})// { type: 'text/plain;charset=utf-8' });
    			 FileSaver.saveAs(savedObject,file);
				},

				getUrl: function(){
					return dpsURL
				}
			}
		)
});
  
