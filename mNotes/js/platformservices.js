/*
Copyright © 2009 Nokia. All rights reserved.
Code licensed under the BSD License:
Software License Agreement (BSD License) Copyright © 2009 Nokia.
All rights reserved.
Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer. 
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution. 
Neither the name of Nokia Corporation. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission of Nokia Corporation. 
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

version: 1.0
*/

var __device_debug_on__=true;
var event_completed=2;
var event_cancelled=3;
var __Service_Interface_Ver=1;
var MapErrorCode={1016:100,1012:101,1010:102,1009:103,1005:104,1000:105,1011:106,1007:107,1003:1,1002:2,1004:3};
function __device_debug(_1){
};
function __device_handle_exception(e,_3){
__device_debug(_3);
throw (e);
};
function __device_typeof(_4){
if(_4==undefined){
return "undefined";
}
if(_4 instanceof Object){
if(_4 instanceof String){
return "String";
}else{
if(_4 instanceof Array){
return "Array";
}
}
}
if(typeof _4){
if(typeof _4=="object"){
if(typeof _4=="object"&&!_4){
return "null";
}
}else{
if(typeof _4=="string"){
return "string";
}
}
}
};
if((typeof nokia)=="undefined"){
nokia={};
nokia.device={};
}else{
if((typeof nokia.device)!="undefined"){
nokia.device={};
}else{
throw ("nokia.device already defined");
}
}
nokia.device={load:__device_service_load,listInterfaces:__device_service_interfaces,getSystemProperties:__device_getSystemProperties,getLibraryVersion:__device_getLibraryVersion,version:2};
function __device_getLibraryVersion(){
return 2;
};
function __device_getSystemProperties(){
return {uriPath:{max:255}};
};
var __device_services_inited=false;
var __device_services=[{"name":"device","version":2,"interfaces":[]}];
function __device_services_init(){
if(__device_services_inited){
return;
}
__device_services_inited=true;
try{
var _5=device.getServiceObject("Service.ServiceRegistry","IService");
var _6={ServiceName:"Service.Calendar",InterfaceName:"IDataSource"};
var _7=_5.IService.GetList(_6);
if(_7.ErrorCode==0){
var _8=_7.ReturnValue;
if(_8){
var _9=_8.getNext();
if(_9){
var _a=_9.VersionList;
var _b;
for(_b in _a){
if(_a[_b]>__Service_Interface_Ver){
__Service_Interface_Ver=_a[_b];
}
}
}
}
_8.close();
}
_5.close();
}
catch(e){
__Service_Interface_Ver=1;
}
try{
__device_services[0].interfaces.push(__device_geolocation_service_entry);
}
catch(e){
__device_debug("Missing library implementation: "+e);
}
try{
__device_services[0].interfaces.push(__device_camera_service_entry);
}
catch(e1){
__device_debug("Missing library implementation: "+e1);
}
try{
__device_services[0].interfaces.push(__device_media_service_entry);
}
catch(e2){
}
try{
__device_services[0].interfaces.push(__device_contacts_service_entry);
}
catch(e3){
}
try{
__device_services[0].interfaces.push(__device_messaging_service_entry);
}
catch(e4){
__device_debug("Missing library implementation: "+e4);
}
try{
__device_services[0].interfaces.push(__device_calendar_service_entry);
}
catch(e5){
__device_debug("Missing library implementation: "+e5);
}
try{
__device_services[0].interfaces.push(__device_landmarks_service_entry);
}
catch(e6){
__device_debug("Missing library implementation: "+e6);
}
try{
__device_services[0].interfaces.push(__device_commlog_service_entry);
}
catch(e7){
__device_debug("Missing library implementation: "+e7);
}
try{
__device_services[0].interfaces.push(__device_sysinfo_service_entry);
}
catch(e8){
__device_debug("Missing library implementation: "+e8);
}
try{
__device_services[0].interfaces.push(__device_sensors_service_entry);
}
catch(e9){
__device_debug("Missing library implementation: "+e9);
}
};
function __device_get_implementation(i){
return new i.proto(new (i.providers[0].instance));
};
function __device_get_descriptor(i){
return new i.descriptor(new (i.providers[0].descriptor));
};
function __device_get_interface(s,_f,_10){
var i=s.interfaces;
for(var d in i){
if(i[d].name==null){
__device_update_descriptor(i[d]);
}
if(i[d].name==undefined){
continue;
}
if(i[d].name==_f){
if(_10){
if(i[d].version>=_10){
return __device_get_implementation(i[d]);
}
}else{
return __device_get_implementation(i[d]);
}
}
}
return null;
};
function __device_service_load(_13,_14){
var _15=new DeviceException("dummy",0);
if(_13){
if(typeof _13!="string"){
throw new DeviceException(_15.INVALID_ARG_ERR,"nokia.device.load:Invalid type interfaceName");
}
}else{
throw new DeviceException(_15.MISSING_ARG_ERR,"nokia.device.load:interfaceName param expected");
}
if(_14){
if(typeof _14!="number"){
throw new DeviceException(_15.INVALID_ARG_ERR,"nokia.device.load:Invalid type version");
}
}
__device_services_init();
for(var s in __device_services){
var i=__device_get_interface(__device_services[s],_13,_14);
if(i!=null){
return i;
}
}
return null;
};
function __device_update_descriptor(i){
var d=__device_get_descriptor(i);
i.name=d.interfaceName;
i.version=d.version;
};
function __device_interface_list(s){
var _1b=new Array();
for(var i in s.interfaces){
if(s.interfaces[i].name==null){
__device_update_descriptor(s.interfaces[i]);
}
if(s.interfaces[i].name==undefined){
continue;
}
_1b[i]=new Object();
_1b[i].name=s.interfaces[i].name;
_1b[i].version=s.interfaces[i].version;
}
return _1b;
};
function __device_service_descriptor(s){
this.name=s.name;
this.version=s.version;
this.interfaces=__device_interface_list(s);
this.toString=__device_service_descriptor_to_string;
};
function __device_service_descriptor_to_string(){
var is="\nInterfaces(s): ";
for(i in this.interfaces){
is+="\n"+this.interfaces[i].name+" "+this.interfaces[0].version;
}
return ("Service: "+this.name+is);
};
function __device_service_interfaces(){
__device_services_init();
for(var s in __device_services){
var _20=__device_interface_list(__device_services[s]);
return new __FWIter(_20);
}
return null;
};
function __FWIter(arr){
this._arr=arr;
this._pos=0;
this._valid=true;
};
__FWIter.prototype.hasNext=function(){
return (this._valid&&this._pos<this._arr.length);
};
__FWIter.prototype.next=function(){
if(this._valid&&(this._pos<this._arr.length)){
return this._arr[this._pos++];
}else{
return null;
}
};
__FWIter.prototype.close=function(){
delete this._arr;
this._valid=false;
};
function modifyObjectBaseProp(obj){
for(pro in obj){
if(typeof obj[pro]=="function"){
obj[pro]=0;
}
}
};
var glob_obj=null;
var temp_scb=null;
var temp_ecb=null;
glob_obj=new Object();
glob_obj.glob_cb_arr=new Array();
glob_obj.addToGlobalArray=addToGlobalArray;
glob_obj.removeFromArray=removeFromArray;
glob_obj.getFromArray=getFromArray;
DeviceAPIError.prototype=new Error();
DeviceAPIError.prototype.constructor=DeviceAPIError;
function DeviceAPIError(_23,_24){
this.toString=concatenate;
this.code=_23;
this.name="DeviceError";
this.message=_24;
this.MISSING_ARG_ERR=1;
this.INVALID_ARG_ERR=2;
this.NOT_SUPPORTED_ERR=3;
this.TIMEOUT_ERR=100;
this.DATA_NOT_FOUND_ERR=101;
this.DATA_ALREADY_EXISTS_ERR=102;
this.SERVICE_BUSY_ERR=103;
this.SERVICE_IN_USE_ERR=104;
this.DATA_OUT_OF_RANGE_ERR=105;
this.NOT_ALLOWED_ERR=106;
this.SIZE_EXCEEDED_ERR=107;
this.INVALID_URI_ERR=108;
this.URI_NOT_FOUND_ERR=109;
this.URI_ALREADY_EXISTS_ERR=110;
this.NO_MEMORY_ERR=111;
};
DeviceException.prototype=new Error();
DeviceException.prototype.constructor=DeviceException;
function DeviceException(_25,_26){
this.toString=concatenate;
this.code=_25;
this.name="DeviceException";
this.message=_26;
this.MISSING_ARG_ERR=1;
this.INVALID_ARG_ERR=2;
this.NOT_SUPPORTED_ERR=3;
this.TIMEOUT_ERR=100;
this.DATA_NOT_FOUND_ERR=101;
this.DATA_ALREADY_EXISTS_ERR=102;
this.SERVICE_BUSY_ERR=103;
this.SERVICE_IN_USE_ERR=104;
this.DATA_OUT_OF_RANGE_ERR=105;
this.NOT_ALLOWED_ERR=106;
this.SIZE_EXCEEDED_ERR=107;
this.INVALID_URI_ERR=108;
this.URI_NOT_FOUND_ERR=109;
this.URI_ALREADY_EXISTS_ERR=110;
this.NO_MEMORY_ERR=111;
};
function concatenate(){
return (this.name+": errcode: "+this.code+"\nline: "+this.lineNumber+"\nfileName: "+this.fileName+"\nerrmsg: "+this.message);
};
function splitErrorMessage(_27){
if(_27.search(/:/)!=-1){
if((_27.split(":").length)==2){
return _27.split(":")[1];
}
if((_27.split(":").length)>2){
return _27.split(":")[2];
}
}
return _27;
};
var __s60_start_and_wait_cb;
function __s60_on_app_exit(){
widget.onshow=null;
if(__s60_start_and_wait_cb!==null){
__s60_start_and_wait_cb();
}
};
function __s60_on_app_start(){
widget.onhide=null;
widget.onshow=__s60_on_app_exit;
};
function __s60_start_and_wait(id,_29,_2a){
__s60_start_and_wait_cb=_2a;
widget.onhide=__s60_on_app_start;
widget.openApplication(id,_29);
};
function __s60_api_not_supported(){
throw (err_ServiceNotSupported);
};
function __s60_enumerate_object(_2b,_2c,_2d,_2e){
var key;
for(key in _2b){
var _30;
if(_2c){
_30=_2c+"."+key;
}else{
_30=key;
}
var _31=_2b[key];
if(typeof _31=="object"){
__s60_enumerate_object(_31,_30,_2d,_2e);
}else{
_2d(_30,_31,_2e);
}
}
};
function removeFromArray(_32){
for(i=0;i<(glob_obj.glob_cb_arr.length);i++){
if(glob_obj.glob_cb_arr[i].transactionId==_32){
glob_obj.glob_cb_arr.splice(i,1);
}
}
};
function addToGlobalArray(_33,sCb,_35){
var obj=new Object();
obj.success_cb=sCb;
obj.transactionId=_33;
obj.error_cb=_35;
glob_obj.glob_cb_arr.push(obj);
};
function getFromArray(tid){
var i;
for(i=0;i<(glob_obj.glob_cb_arr.length);i++){
if(glob_obj.glob_cb_arr[i].transactionId==tid){
return glob_obj.glob_cb_arr[i];
}
}
if(temp_scb){
var obj=new Object();
obj.success_cb=temp_scb;
obj.error_cb=temp_ecb;
temp_ecb=temp_scb=null;
return obj;
}
return null;
};
var __device_landmarks_service_entry={"name":null,"version":null,"proto":__device_landmarks,"descriptor":__device_landmarks_descriptor,"providers":[{"descriptor":__sp_landmarks_descriptor,"instance":__sp_landmarks_instance}]};
function __device_landmarks(_3a){
this.provider=_3a;
this.interfaceName=_3a.descriptor.interfaceName;
this.version=_3a.descriptor.version;
this.startEditor=__device_landmarks_startEditor;
this.getCategories=__device_landmarks_getCategories;
this.getLandmarks=__device_landmarks_getLandmarks;
this.addCategory=__device_landmarks_add_category;
this.updateCategory=__device_landmarks_update_category;
this.updateLandmark=__device_landmarks_update_landmark;
this.addLandmark=__device_landmarks_add_landmark;
this.deleteCategory=__device_landmarks_delete_category;
this.deleteLandmark=__device_landmarks_delete_landmark;
this.importLandmarks=__device_landmarks_import_landmarks;
this.exportLandmarks=__device_landmarks_export_landmarks;
this.organizeLandmarks=__device_landmarks_organize_landmarks;
this.cancel=__device_landmarks_cancel;
};
function __device_landmarks_descriptor(_3b){
this.interfaceName=_3b.interfaceName;
this.version=_3b.version;
};
function __device_landmarks_startEditor(_3c,_3d){
this.provider.startEditor(_3c,_3d);
};
function __device_landmarks_getCategories(_3e,_3f,_40){
return this.provider.getCategories(_3e,_3f,_40);
};
function __device_landmarks_getLandmarks(_41,_42,_43){
return this.provider.getLandmarks(_41,_42,_43);
};
function __device_landmarks_add_category(_44,_45,_46){
return this.provider.addCategory(_44,_45,_46);
};
function __device_landmarks_add_landmark(_47,_48,_49){
return this.provider.addLandmark(_47,_48,_49);
};
function __device_landmarks_delete_category(_4a,_4b,_4c){
return this.provider.deleteCategory(_4a,_4b,_4c);
};
function __device_landmarks_delete_landmark(_4d,_4e,_4f){
return this.provider.deleteLandmark(_4d,_4e,_4f);
};
function __device_landmarks_update_landmark(_50,_51,_52){
return this.provider.updateLandmark(_50,_51,_52);
};
function __device_landmarks_update_category(_53,_54,_55){
return this.provider.updateCategory(_53,_54,_55);
};
function __device_landmarks_import_landmarks(_56,_57,_58,_59){
return this.provider.importLandmarks(_56,_57,_58,_59);
};
function __device_landmarks_export_landmarks(_5a,_5b,_5c,_5d,_5e){
return this.provider.exportLandmarks(_5a,_5b,_5c,_5d,_5e);
};
function __device_landmarks_organize_landmarks(_5f,_60,_61,_62,_63){
return this.provider.organizeLandmarks(_5f,_60,_61,_62,_63);
};
function __device_landmarks_cancel(_64){
return this.provider.cancel(_64);
};
var err_missing_argument=1003;
var err_bad_argument=1002;
var err_ServiceNotSupported=1004;
var err_InvalidService_Argument=1000;
function convertFromPS2JS(_65){
var _66=new DeviceAPIError(0,"dummy");
var _67;
switch(_65){
case 1016:
_67=_66.TIMEOUT_ERR;
break;
case 1012:
_67=_66.DATA_NOT_FOUND_ERR;
break;
case 1010:
_67=_66.DATA_ALREADY_EXISTS_ERR;
break;
case 1009:
_67=_66.SERVICE_BUSY_ERR;
break;
case 1005:
_67=_66.SERVICE_IN_USE_ERR;
break;
default:
_67=1001;
}
return _67;
};
function __sp_landmarks_descriptor(){
this.interfaceName="landmarks";
if(window.__Service_Interface_Ver){
this.version=__Service_Interface_Ver;
}else{
this.version=1;
}
};
function __sp_landmarks_instance(){
this.descriptor=new __sp_landmarks_descriptor();
this.startEditor=__sp_landmarks_startEditor;
this.getCategories=__sp_landmarks_category_getList;
this.getCategoriesCb=__sp_landmarks_category_getList_cb;
this.addCategory=__sp_landmarks_category_add;
this.addCategoryCb=__sp_landmarks_category_add_cb;
this.updateCategory=__sp_landmarks_category_update;
this.updateCategoryCb=__sp_landmarks_category_update_cb;
this.deleteCategory=__sp_landmarks_category_delete;
this.deleteCategoryCb=__sp_landmarks_category_delete_cb;
this.getLandmarks=__sp_landmarks_getList;
this.getLandmarksCb=__sp_landmarks_getList_cb;
this.addLandmark=__sp_landmarks_add;
this.addLandmarkCb=__sp_landmarks_add_cb;
this.updateLandmark=__sp_landmarks_update;
this.updateLandmarkCb=__sp_landmarks_update_cb;
this.deleteLandmark=__sp_landmarks_delete;
this.deleteLandmarkCb=__sp_landmarks_delete_cb;
this.importLandmarks=__sp_landmarks_import;
this.importLandmarksCb=__sp_landmarks_import_cb;
this.exportLandmarks=__sp_landmarks_export;
this.exportLandmarksCb=__sp_landmarks_export_cb;
this.organizeLandmarks=__sp_landmarks_organize;
this.organizeLandmarksCb=__sp_landmarks_organize_cb;
this.temporarySCb=null;
this.temporaryECb=null;
this.cancel=__sp_landmarks_cancel;
try{
this.so=device.getServiceObject("Service.Landmarks","IDataSource");
}
catch(e){
__device_handle_exception(e,"Landmarks service not available");
}
};
var __SP_CATEGORY_MIN_LOCAL_ID=16;
var __sp_category_list=[{id:1,globalId:3000,name:"Accommodation"},{id:2,globalId:6000,name:"Businesses"},{id:3,globalId:9000,name:"Telecommunications"},{id:4,globalId:12000,name:"Education"},{id:5,globalId:15000,name:"Entertainment"},{id:6,globalId:18000,name:"Food and drink"},{id:7,globalId:21000,name:"Geographical locations"},{id:8,globalId:24000,name:"Outdoor activities"},{id:9,globalId:27000,name:"People"},{id:10,globalId:30000,name:"Public services"},{id:11,globalId:33000,name:"Places of worship"},{id:12,globalId:36000,name:"Shopping"},{id:13,globalId:39000,name:"Sightseeing"},{id:14,globalId:42000,name:"Sports"},{id:15,globalId:45000,name:"Transport"}];
function __sp_landmarks_category_iterator(_68){
this.iter=_68;
this.next=__sp_landmarks_category_iterator_get_next;
this.hasNext=__sp_landmarks_category_iterator_has_next;
this.hasElement=false;
this.catItem=null;
this.close=__sp_landmarks_category_close;
};
function __sp_landmarks_category_close(){
this.iter.close();
};
function __sp_landmarks_category_iterator_has_next(){
if(this.hasElement){
if(this.catItem!==null){
return true;
}else{
return false;
}
}else{
this.catItem=this.iter.getNext();
this.hasElement=true;
if(typeof this.catItem=="undefined"||this.catItem==null){
this.catItem=null;
return false;
}else{
return true;
}
}
};
function __sp_landmarks_category_iterator_get_next(){
if(this.hasElement){
var _69=new Object();
_69=this.catItem;
this.catItem=this.iter.getNext();
if(typeof (this.catItem)=="undefined"){
this.catItem=null;
}
if(_69){
return new __sp_device_category_obj(_69);
}else{
return null;
}
}else{
this.catItem=this.iter.getNext();
if(typeof this.catItem=="undefined"||this.catItem==null){
this.hasElement=true;
this.catItem=null;
return null;
}else{
this.hasElement=true;
var _6a=new Object();
_6a=this.lmItem;
this.catItem=this.iter.getNext();
if(typeof (this.catItem)=="undefined"){
this.catItem=null;
}
return new __sp_device_category_obj(_6a);
}
}
};
function __sp_landmarks_iterator(_6b){
this.iter=_6b;
this.next=__sp_landmarks_iterator_get_next;
this.hasNext=__sp_landmarks_iterator_has_next;
this.hasElement=false;
this.lmItem=null;
this.close=__sp_landmarks_landmarkitem_close;
};
function __sp_landmarks_landmarkitem_close(){
this.iter.close();
};
function __sp_device_landmark_location_obj(_6c){
this.longitude=(_6c.Longitude==undefined)?null:_6c.Longitude;
this.latitude=(_6c.Latitude==undefined)?null:_6c.Latitude;
if(_6c.Altitude){
this.altitude=_6c.Altitude;
}
if(_6c.HAccuracy){
this.hAccuracy=_6c.HAccuracy;
}
if(_6c.VAccuracy){
this.vAccuracy=_6c.VAccuracy;
}
};
function __sp_landmark_position_obj(_6d){
if((_6d.longitude!==undefined)&&(_6d.longitude!==null)&&(_6d.longitude!=="")){
this.Longitude=_6d.longitude;
}
if((_6d.latitude!==undefined)&&(_6d.latitude!==null)&&(_6d.latitude!=="")){
this.Latitude=_6d.latitude;
}
};
function __sp_landmark_position_obj_fromJS_2LIW(_6e){
var _6f=new DeviceAPIError(0,"dummy");
if(typeof (_6e)!="object"){
throw new DeviceAPIError(_6f.INVALID_ARG_ERR,"position must be of type object");
}
var _70=false;
var _71=false;
if((_6e.longitude!==undefined)&&(_6e.longitude!==null)&&(_6e.longitude!=="")){
this.Longitude=_6e.longitude;
_70=true;
}
if((_6e.latitude!==undefined)&&(_6e.latitude!==null)&&(_6e.latitude!=="")){
this.Latitude=_6e.latitude;
_71=true;
}
if(!(_70&&_71)){
throw new DeviceAPIError(_6f.MISSING_ARG_ERR,"missing position field");
}
if(_6e.altitude){
this.Altitude=_6e.altitude;
}
if(_6e.hAccuracy){
this.HAccuracy=_6e.hAccuracy;
}
if(_6e.vAccuracy){
this.VAccuracy=_6e.vAccuracy;
}
};
function __sp_landmark_bounded_area_obj(_72){
var _73=new DeviceAPIError(0,"dummy");
var _74=false;
var _75=false;
if((_72.coordinate1!==undefined)&&(_72.coordinate1!==null)&&(_72.coordinate1!=="")){
if(typeof (_72.coordinate1)!="object"){
throw new DeviceAPIError(_73.INVALID_ARG_ERR,"coordinate1 must be an object");
}else{
var _76=false;
var _77=false;
if((_72.coordinate1.latitude!==undefined)&&(_72.coordinate1.latitude!==null)&&(_72.coordinate1.latitude!=="")){
this.NorthLatitude=_72.coordinate1.latitude;
_76=true;
}
if((_72.coordinate1.longitude!==undefined)&&(_72.coordinate1.longitude!==null)&&(_72.coordinate1.longitude!=="")){
this.EastLongitude=_72.coordinate1.longitude;
_77=true;
}
if(!(_76&&_77)){
throw new DeviceAPIError(_73.MISSING_ARG_ERR,"missing position field");
}
_74=true;
}
}
if((_72.coordinate2!==undefined)&&(_72.coordinate2!==null)&&(_72.coordinate2!=="")){
if(typeof (_72.coordinate2)!="object"){
throw new DeviceAPIError(_73.INVALID_ARG_ERR,"coordinate2 must be an object");
}else{
var _76=false;
var _77=false;
if((_72.coordinate2.latitude!==undefined)&&(_72.coordinate2.latitude!==null)&&(_72.coordinate2.latitude!=="")){
this.SouthLatitude=_72.coordinate2.latitude;
_76=true;
}
if((_72.coordinate2.longitude!==undefined)&&(_72.coordinate2.longitude!==null)&&(_72.coordinate2.longitude!=="")){
this.WestLongitude=_72.coordinate2.longitude;
_77=true;
}
if(!(_76&&_77)){
throw new DeviceAPIError(_73.MISSING_ARG_ERR,"missing position field");
}
_75=true;
}
}
if(!(_74&&_75)){
throw new DeviceAPIError(_73.MISSING_ARG_ERR,"missing position field");
}
};
function __sp_device_landmark_address_obj(_78){
if(_78.Street){
this.street=_78.Street;
}
if(_78.City){
this.city=_78.City;
}
if(_78.state){
this.state=_78.state;
}
if(_78.AreaCode){
this.postalCode=_78.AreaCode;
}
if(_78.Country){
this.country=_78.Country;
}
if(_78.BuildingName){
this.building=_78.BuildingName;
}
if(_78.Telephone){
this.phone=_78.Telephone;
}
};
function __sp_landmark_address_obj(_79){
var _7a=new DeviceAPIError(0,"dummy");
if(typeof (_79)!="object"){
throw new DeviceAPIError(_7a.MISSING_ARG_ERR,"address must be of type object");
}
if(_79.street!==undefined){
if(_79.street===null){
this.Street="";
}else{
this.Street=_79.street;
}
}
if(_79.city!==undefined){
if(_79.city===null){
this.City="";
}else{
this.City=_79.city;
}
}
if(_79.state!==undefined){
if(_79.state===null){
this.state="";
}else{
this.state=_79.state;
}
}
if(_79.postalCode!==undefined){
if(_79.postalCode===null){
this.AreaCode="";
}else{
this.AreaCode=_79.postalCode;
}
}
if(_79.country!==undefined){
if(_79.country===null){
this.Country="";
}else{
this.Country=_79.country;
}
}
if(_79.building!==undefined){
if(_79.building===null){
this.BuildingName="";
}else{
this.BuildingName=_79.building;
}
}
if(_79.phone!==undefined){
if(_79.phone===null){
this.Telephone="";
}else{
this.Telephone=_79.phone;
}
}
};
function __sp_add_category_ids_for_names(_7b){
var _7c=new DeviceAPIError(0,"dummy");
var _7d=new Array();
for(var i in _7b){
if((_7b[i]!==undefined)&&(_7b[i]!=="")&&(_7b[i]!==null)){
if(typeof (_7b[i])!="string"){
throw new DeviceAPIError(_7c.INVALID_ARG_ERR,"category should be of type string");
}else{
_7d.push(_7b[i].toString());
}
}
}
return _7d;
};
function __sp_get_category_ids_for_names(_7f){
var _80=new DeviceAPIError(0,"dummy");
var _81=new Array();
var _82=0;
for(var i in _7f){
if(typeof (_7f[i])!="string"){
throw new DeviceAPIError(_80.INVALID_ARG_ERR,"category should be of type string");
}
for(var ii in __sp_category_list){
if(__sp_category_list[ii].name.toLowerCase()==_7f[i].toLowerCase()){
_81.push(__sp_category_list[ii].id.toString());
_82=1;
}
}
if(_82==0){
return null;
}
_82=0;
}
return _81;
};
function __sp_device_landmark_obj(_85){
this.landmarkId=_85.id;
if(_85.LandmarkName){
this.name=_85.LandmarkName;
}
if(_85.LandmarkDesc){
this.description=_85.LandmarkDesc;
}
if(_85.CoverageRadius){
this.coverageRadius=_85.CoverageRadius;
}
if(_85.LandmarkPosition){
this.position=new __sp_device_landmark_location_obj(_85.LandmarkPosition);
}
if(_85.CategoryInfo){
this.categoryIds=_85.CategoryInfo;
}
if(_85.LandmarkFields){
this.address=new __sp_device_landmark_address_obj(_85.LandmarkFields);
}
};
function __sp_landmarks_addLocality(add){
var _87=new DeviceAPIError(0,"dummy");
if(typeof (add)!="object"){
throw new DeviceAPIError(_87.INVALID_ARG_ERR,"address should be of type object");
}
if((add.street!==undefined)&&(add.street!==null)&&(add.street!=="")){
this.Street=add.street;
}
if((add.city!==undefined)&&(add.city!==null)&&(add.city!=="")){
this.City=add.city;
}
if((add.state!==undefined)&&(add.state!==null)&&(add.state!=="")){
this.state=add.state;
}
if((add.postalCode!==undefined)&&(add.postalCode!==null)&&(add.postalCode!=="")){
this.AreaCode=add.postalCode;
}
if((add.country!==undefined)&&(add.country!==null)&&(add.country!=="")){
this.Country=add.country;
}
if((add.building!==undefined)&&(add.building!==null)&&(add.building!=="")){
this.BuildingName=add.building;
}
if((add.phone!==undefined)&&(add.phone!==null)&&(add.phone!=="")){
this.Telephone=add.phone;
}
};
function __sp_landmarks_addPosition(pos){
var _89=new DeviceAPIError(0,"dummy");
if(typeof (pos)!="object"){
throw new DeviceAPIError(_89.INVALID_ARG_ERR,"position should be of type object");
}
if((pos.longitude!==undefined)&&(pos.longitude!==null)&&(pos.longitude!=="")){
this.Longitude=pos.longitude;
}
if((pos.latitude!==undefined)&&(pos.latitude!==null)&&(pos.latitude!=="")){
this.Latitude=pos.latitude;
}
if((pos.altitude!==undefined)&&(pos.altitude!==null)&&(pos.altitude!=="")){
this.Altitude=pos.altitude;
}
if((pos.hAccuracy!==undefined)&&(pos.hAccuracy!==null)&&(pos.hAccuracy!=="")){
this.HAccuracy=pos.hAccuracy;
}
if((pos.vAccuracy!==undefined)&&(pos.vAccuracy!==null)&&(pos.vAccuracy!=="")){
this.VAccuracy=pos.vAccuracy;
}
};
function __sp_landmarks_addLmObject(lm){
var _8b=false;
var _8c=new DeviceAPIError(0,"dummy");
if((lm.name!==undefined)&&(lm.name!==null)&&(lm.name!=="")){
this.LandmarkName=lm.name;
}
if((lm.description!==undefined)&&(lm.description!==null)&&(lm.description!=="")){
this.LandmarkDesc=lm.description;
}
if((lm.position!==undefined)&&(lm.position!==null)&&(lm.position!=="")){
this.LandmarkPosition=new __sp_landmarks_addPosition(lm.position);
_8b=true;
}
if((lm.coverageRadius!==undefined)&&(lm.coverageRadius!==null)&&(lm.coverageRadius!=="")){
if(_8b){
this.CoverageRadius=lm.coverageRadius;
}else{
throw new DeviceAPIError(_8c.MISSING_ARG_ERR,"missing position");
}
}
if((lm.categoryIds!==undefined)&&(lm.categoryIds!==null)&&(lm.categoryIds!=="")){
if(typeof (lm.categoryIds)!="object"){
throw new DeviceAPIError(_8c.INVALID_ARG_ERR,"categoryids should be of type object");
}
this.CategoryInfo=__sp_add_category_ids_for_names(lm.categoryIds);
if(!this.CategoryInfo){
throw new DeviceAPIError(_8c.MISSING_ARG_ERR,"invalid category");
}
}
if((lm.address!==undefined)&&(lm.address!==null)&&(lm.address!=="")){
this.LandmarkFields=new __sp_landmarks_addLocality(lm.address);
}
this.dummyField="dummyfield";
};
function __sp_landmark_obj(_8d,str){
var _8f=new DeviceAPIError(0,"dummy");
if(_8d.name!==undefined){
if(_8d.name===null){
this.LandmarkName="";
}else{
this.LandmarkName=_8d.name;
}
}
if((_8d.landmarkId===undefined)||(_8d.landmarkId===null)||(_8d.landmarkId==="")){
throw new DeviceAPIError(_8f.MISSING_ARG_ERR,"for updating; id must be supplied");
}else{
this.id=_8d.landmarkId;
}
if(_8d.description!==undefined){
if(_8d.description===null){
this.LandmarkDesc="";
}else{
this.LandmarkDesc=_8d.description;
}
}
if(_8d.position){
this.LandmarkPosition=new __sp_landmark_position_obj_fromJS_2LIW(_8d.position);
}
if(_8d.coverageRadius){
this.CoverageRadius=_8d.coverageRadius;
}
if(_8d.categories){
this.CategoryInfo=__sp_get_category_ids_for_names(_8d.categories);
if(!this.CategoryInfo){
throw new DeviceError("Landmarks: "+str+"Category is invalid",err_bad_argument);
}
}
if(_8d.address){
this.LandmarkFields=new __sp_landmark_address_obj(_8d.address);
}
this.temp="dummy";
};
function __sp_landmarks_iterator_has_next(){
if(this.hasElement){
if(this.lmItem!==null){
return true;
}else{
return false;
}
}else{
this.lmItem=this.iter.getNext();
this.hasElement=true;
if(typeof this.lmItem=="undefined"){
this.lmItem=null;
return false;
}else{
return true;
}
}
};
function __sp_landmarks_iterator_get_next(){
if(this.hasElement){
var _90=new Object();
_90=this.lmItem;
this.lmItem=this.iter.getNext();
if(typeof (this.lmItem)=="undefined"){
this.lmItem=null;
}
if(_90){
return new __sp_device_landmark_obj(_90);
}else{
return null;
}
}else{
this.lmItem=this.iter.getNext();
if(typeof this.lmItem=="undefined"||this.lmItem==null){
this.hasElement=true;
this.lmItem=null;
return null;
}else{
this.hasElement=true;
var _91=new Object();
_91=this.lmItem;
this.lmItem=this.iter.getNext();
if(typeof (this.lmItem)=="undefined"||this.lmItem==null){
this.lmItem=null;
}
return new __sp_device_landmark_obj(_91);
}
}
};
function __sp_category_obj(_92){
if(_92.name){
this.CategoryName=_92.name;
}
if(_92.categoryId){
this.id=_92.categoryId;
}
};
function __sp_device_category_obj(_93){
this.categoryId=_93.id;
this.name=_93.CategoryName;
};
var LANDMARKS_APP_ID=270501282;
function __sp_landmarks_startEditor(_94,_95,_96){
error=new DeviceAPIError(0,"dummy");
if((_94===undefined)||(_94===null)||(_94==="")){
throw new DeviceAPIError(error.MISSING_ARG_ERR,"StartEditor:Missing Success Callback");
}
if((typeof _94)!="function"){
throw new DeviceAPIError(error.INVALID_ARG_ERR,"StartEditor:Success Callback must be of type function");
}
if(_95!==undefined){
if((_95!==null)&&(_95!=="")){
throw new DeviceAPIError(error.NOT_SUPPORTED_ERR,"startEditor:landmark item is not supported");
}
}
if((_96!==undefined)&&(_96!==null)&&(_96!=="")){
if((typeof _96)!="function"){
throw new DeviceAPIError(error.INVALID_ARG_ERR,"StartEditor:error callback must be of type function");
}
}
var _97=270501282;
var _98;
function __s60_on_app_exit(){
window.xwidget.onshow=null;
if(_98){
_98();
}
};
var _99=function(_9a,_9b,_9c){
_94(_9a,_9b,_9c);
};
__s60_start_and_wait(_97,"",_99);
};
function __sp_landmarks_category_getList_cb(_9d,_9e,_9f){
var _a0;
var _a1;
var _a2;
if(this.temporarySCb){
_a1=this.temporarySCb;
_a2=this.temporaryECb;
this.temporarySCb=null;
this.temporaryECb=null;
}else{
_a0=glob_obj.getFromArray(_9d);
if(_a0){
_a1=_a0.success_cb;
_a2=_a0.error_cb;
}else{
alert("Landmarks: __sp_landmarks_category_getList_cb: Callback not found ");
return;
}
}
var _a3=null;
if(_9f.ErrorCode||(_9e==4)){
var _a4=convertFromPS2JS(_9f.ErrorCode);
var _a5=new DeviceAPIError(_a4,_9f.ErrorMessage);
if(_a2){
_a2(_a5);
}
}else{
if(_9f.ReturnValue){
_a3=new __sp_landmarks_category_iterator(_9f.ReturnValue);
_a1(_a3);
}
}
glob_obj.removeFromArray(_9d);
};
function __sp_landmarks_category_getList(_a6,_a7,_a8){
try{
var _a9=new DeviceAPIError(0,"dummy");
if((_a6===undefined)||(_a6==="")||(_a6===null)){
throw new DeviceAPIError(_a9.MISSING_ARG_ERR,"callback is missing");
}
if(typeof (_a6)!="function"){
throw new DeviceAPIError(_a9.INVALID_ARG_ERR,"invalid callback argument");
}
var _aa=false;
if((_a8!==undefined)&&(_a8!==null)&&(_a8!=="")){
if(typeof (_a8)!="function"){
throw new DeviceAPIError(_a9.INVALID_ARG_ERR,"invalid error callback argument");
}else{
_aa=true;
}
}
var _ab=new Object();
modifyObjectBaseProp(_ab);
_ab.Type="Category";
if((_a7!==undefined)&&(_a7!==null)&&(_a7!=="")){
if(typeof (_a7)!="string"){
throw new DeviceAPIError(_a9.INVALID_ARG_ERR,"name must be a string");
}
}
if(_a7){
_ab.Filter=new Object();
modifyObjectBaseProp(_ab.Filter);
_ab.Filter.CategoryName=_a7;
_ab.Filter.PreviousMatchesOnly=false;
}
this.temporarySCb=_a6;
this.temporaryECb=_a8;
var _ac=this.so.IDataSource.GetList(_ab,this.getCategoriesCb);
if(_ac.TransactionID){
glob_obj.addToGlobalArray(_ac.TransactionID,_a6,_a8);
}
if(_ac.ErrorCode!=0){
switch(_ac.ErrorCode){
case 1003:
throw new DeviceAPIError(_a9.MISSING_ARG_ERR,_ac.ErrorMessage);
break;
case 1002:
throw new DeviceAPIError(_a9.INVALID_ARG_ERR,_ac.ErrorMessage);
break;
case 1004:
throw new DeviceAPIError(_a9.NOT_SUPPORTED_ERR,_ac.ErrorMessage);
break;
case 1000:
throw new DeviceAPIError(_a9.INVALID_ARG_ERR,_ac.ErrorMessage);
break;
default:
throw new DeviceAPIError(-101,"unknown error message");
}
}
return _ac.TransactionID;
}
catch(e){
throw e;
}
};
function __sp_landmarks_category_add_cb(_ad,_ae,_af){
var _b0;
var _b1;
var _b2;
if(this.temporarySCb){
category_cb=this.temporarySCb;
_b2=this.temporaryECb;
this.temporarySCb=null;
this.temporaryECb=null;
}else{
_b0=glob_obj.getFromArray(_ad);
if(_b0){
_b1=_b0.success_cb;
_b2=_b0.error_cb;
}else{
alert("Landmarks: __sp_landmarks_category_add_cb: Callback not found ");
return;
}
}
var id=null;
if(_ae==4||_af.ErrorCode){
var _b4=convertFromPS2JS(_af.ErrorCode);
var _b5=new DeviceAPIError(_b4,_af.ErrorMessage);
if(_b2){
_b2(_b5);
}
}else{
if(_af.ReturnValue){
id=_af.ReturnValue;
}
_b1(id);
}
glob_obj.removeFromArray(_ad);
};
function __sp_landmarks_category_add(_b6,_b7,_b8){
try{
var _b9=new DeviceAPIError(0,"dummy");
var _ba=true;
if(_b6===undefined){
throw new DeviceAPIError(_b9.MISSING_ARG_ERR,"AddSucessCallback is missing");
}else{
if(((_b6===null)||(_b6===""))&&(typeof (_b6)!="number")){
throw new DeviceAPIError(_b9.MISSING_ARG_ERR,"AddSucessCallback is missing");
}else{
if(typeof (_b6)!="function"){
throw new DeviceAPIError(_b9.INVALID_ARG_ERR,"invalid AddSucessCallback argument");
}
}
}
if(_b7===undefined||_b7===null){
throw new DeviceAPIError(_b9.MISSING_ARG_ERR,"CategoryItem is missing");
}else{
if(typeof (_b7)!=="object"){
throw new DeviceAPIError(_b9.INVALID_ARG_ERR,"invalid CategoryItem argument");
}
}
if((_b8!=undefined)){
if((!_b8)&&(typeof (_b8)!="number")){
_ba=false;
}else{
if((typeof (_b8)!="function")){
throw new DeviceAPIError(_b9.INVALID_ARG_ERR,"invalid ErrorCallback callback");
}
}
}else{
_ba=false;
}
var _bb=new Object();
modifyObjectBaseProp(_bb);
_bb.Type="Category";
_bb.Data=new __sp_category_obj(_b7);
this.temporarySCb=_b6;
this.temporaryECb=_b8;
var _bc=this.so.IDataSource.Add(_bb,this.addCategoryCb);
if(_bc.TransactionID){
glob_obj.addToGlobalArray(_bc.TransactionID,_b6,_b8);
}
if(_bc.ErrorCode!=0){
switch(_bc.ErrorCode){
case err_missing_argument:
throw new DeviceAPIError(_b9.MISSING_ARG_ERR,_bc.ErrorMessage);
break;
case err_bad_argument:
throw new DeviceAPIError(_b9.INVALID_ARG_ERR,_bc.ErrorMessage);
break;
case err_ServiceNotSupported:
throw new DeviceAPIError(_b9.NOT_SUPPORTED_ERR,_bc.ErrorMessage);
break;
case err_InvalidService_Argument:
throw new DeviceAPIError(_b9.INVALID_ARG_ERR,_bc.ErrorMessage);
break;
default:
throw new DeviceAPIError(-101,"unknown error message");
}
}
return _bc.TransactionID;
}
catch(e){
throw e;
}
};
function __sp_landmarks_add_cb(_bd,_be,_bf){
var id=null;
var _c1;
var _c2;
var _c3;
if(this.temporarySCb){
category_cb=this.temporarySCb;
_c3=this.temporaryECb;
this.temporarySCb=null;
this.temporaryECb=null;
}else{
_c1=glob_obj.getFromArray(_bd);
if(_c1){
_c2=_c1.success_cb;
_c3=_c1.error_cb;
}else{
alert("Landmarks: __sp_landmarks_add_cb: Callback not found ");
return;
}
}
if(_be==4||_bf.ErrorCode){
var _c4=convertFromPS2JS(_bf.ErrorCode);
var _c5=new DeviceAPIError(_c4,_bf.ErrorMessage);
if(_c3){
_c3(_c5);
}
}else{
if(_bf.ReturnValue){
id=_bf.ReturnValue;
}
_c2(id);
}
glob_obj.removeFromArray(_bd);
};
function __sp_landmarks_add(_c6,_c7,_c8){
try{
var _c9=new DeviceAPIError(0,"dummy");
var _ca=true;
if(_c6===undefined){
throw new DeviceAPIError(_c9.MISSING_ARG_ERR,"AddSucessCallback is missing");
}else{
if(((_c6===null)||(_c6===""))&&(typeof (_c6)!="number")){
throw new DeviceAPIError(_c9.MISSING_ARG_ERR,"AddSucessCallback is missing");
}else{
if(typeof (_c6)!="function"){
throw new DeviceAPIError(_c9.INVALID_ARG_ERR,"invalid AddSucessCallback argument");
}
}
}
if((_c7===undefined)||(_c7===null)||(_c7==="")){
throw new DeviceAPIError(_c9.MISSING_ARG_ERR,"LandmarkItem is missing");
}else{
if(typeof (_c7)!=="object"){
throw new DeviceAPIError(_c9.INVALID_ARG_ERR,"invalid LandmarkItem argument");
}
}
if((_c8!=undefined)){
if((!_c8)&&(typeof (_c8)!="number")){
_ca=false;
}else{
if((typeof (_c8)!="function")){
throw new DeviceAPIError(_c9.INVALID_ARG_ERR,"invalid ErrorCallback callback");
}
}
}else{
_ca=false;
}
var str="addLandmark: ";
var _cc=new Object();
modifyObjectBaseProp(_cc);
_cc.Type="Landmark";
_cc.Data=new __sp_landmarks_addLmObject(_c7);
this.temporarySCb=_c6;
this.temporaryECb=_c8;
var _cd=this.so.IDataSource.Add(_cc,this.addLandmarkCb);
if(_cd.TransactionID){
glob_obj.addToGlobalArray(_cd.TransactionID,_c6,_c8);
}
if(_cd.ErrorCode!=0){
switch(_cd.ErrorCode){
case err_missing_argument:
throw new DeviceAPIError(_c9.MISSING_ARG_ERR,_cd.ErrorMessage);
break;
case err_bad_argument:
throw new DeviceAPIError(_c9.INVALID_ARG_ERR,_cd.ErrorMessage);
break;
case err_ServiceNotSupported:
throw new DeviceAPIError(_c9.NOT_SUPPORTED_ERR,_cd.ErrorMessage);
break;
case err_InvalidService_Argument:
throw new DeviceAPIError(_c9.INVALID_ARG_ERR,_cd.ErrorMessage);
break;
default:
throw new DeviceAPIError(-101,"unknown error message");
}
}
return _cd.TransactionID;
}
catch(e){
throw e;
}
};
function __sp_landmarks_delete_cb(_ce,_cf,_d0){
var _d1;
var _d2;
var _d3;
if(this.temporarySCb){
category_cb=this.temporarySCb;
_d2=this.temporaryECb;
this.temporarySCb=null;
this.temporaryECb=null;
}else{
_d3=glob_obj.getFromArray(_ce);
if(_d3){
_d1=_d3.success_cb;
_d2=_d3.error_cb;
}else{
alert("Landmarks: __sp_landmarks_delete_cb: Callback not found ");
return;
}
}
if(_cf==4||_d0.ErrorCode){
var _d4=convertFromPS2JS(_d0.ErrorCode);
var _d5=new DeviceAPIError(_d4,_d0.ErrorMessage);
if(_d2){
_d2(_d5);
}
}else{
_d1();
}
glob_obj.removeFromArray(_ce);
};
function __sp_landmarks_delete(_d6,_d7,_d8){
try{
var _d9=new DeviceAPIError(0,"dummy");
var _da=true;
if(_d6===undefined){
throw new DeviceAPIError(_d9.MISSING_ARG_ERR,"SucessCallback is missing");
}else{
if(((_d6===null)||(_d6===""))&&(typeof (_d6)!="number")){
throw new DeviceAPIError(_d9.MISSING_ARG_ERR,"SucessCallback is missing");
}else{
if(typeof (_d6)!="function"){
throw new DeviceAPIError(_d9.INVALID_ARG_ERR,"invalid SucessCallback argument");
}
}
}
if(_d7===undefined||_d7===null){
throw new DeviceAPIError(_d9.MISSING_ARG_ERR,"landmarkId is missing");
}else{
if(typeof (_d7)!=="string"){
throw new DeviceAPIError(_d9.INVALID_ARG_ERR,"invalid landmarkId argument");
}
}
if((_d8!=undefined)){
if((!_d8)&&(typeof (_d8)!="number")){
_da=false;
}else{
if((typeof (_d8)!="function")){
throw new DeviceAPIError(_d9.INVALID_ARG_ERR,"invalid ErrorCallback callback");
}
}
}else{
_da=false;
}
var _db=new Object();
modifyObjectBaseProp(_db);
_db.Type="Landmark";
_db.Data=new Object();
modifyObjectBaseProp(_db.Data);
_db.Data.id=_d7;
this.temporarySCb=_d6;
this.temporaryECb=_d8;
var _dc=this.so.IDataSource.Delete(_db,this.deleteLandmarkCb);
if(_dc.TransactionID){
glob_obj.addToGlobalArray(_dc.TransactionID,_d6,_d8);
}
if(_dc.ErrorCode!=0){
switch(_dc.ErrorCode){
case err_missing_argument:
throw new DeviceAPIError(_d9.MISSING_ARG_ERR,_dc.ErrorMessage);
break;
case err_bad_argument:
throw new DeviceAPIError(_d9.INVALID_ARG_ERR,_dc.ErrorMessage);
break;
case err_ServiceNotSupported:
throw new DeviceAPIError(_d9.NOT_SUPPORTED_ERR,_dc.ErrorMessage);
break;
case err_InvalidService_Argument:
throw new DeviceAPIError(_d9.INVALID_ARG_ERR,_dc.ErrorMessage);
break;
default:
throw new DeviceAPIError(-101,"unknown error message");
}
}
return _dc.TransactionID;
}
catch(e){
throw e;
}
};
function __sp_landmarks_update_cb(_dd,_de,_df){
var _e0;
var _e1;
var _e2;
if(this.temporarySCb){
category_cb=this.temporarySCb;
_e1=this.temporaryECb;
this.temporarySCb=null;
this.temporaryECb=null;
}else{
_e2=glob_obj.getFromArray(_dd);
if(_e2){
_e0=_e2.success_cb;
_e1=_e2.error_cb;
}else{
alert("Landmarks: __sp_landmarks_update_cb: Callback not found ");
return;
}
}
if(_de==4||_df.ErrorCode){
var _e3=convertFromPS2JS(_df.ErrorCode);
var _e4=new DeviceAPIError(_e3,_df.ErrorMessage);
if(_e1){
_e1(_e4);
}
}else{
_e0();
}
glob_obj.removeFromArray(_dd);
};
function __sp_landmarks_update(_e5,_e6,_e7){
try{
var _e8=new DeviceAPIError(0,"dummy");
var _e9=true;
if(_e5===undefined){
throw new DeviceAPIError(_e8.MISSING_ARG_ERR,"SuccessCallback is missing");
}else{
if(((_e5===null)||(_e5===""))&&(typeof (_e5)!="number")){
throw new DeviceAPIError(_e8.MISSING_ARG_ERR,"SuccessCallback is missing");
}else{
if(typeof (_e5)!="function"){
throw new DeviceAPIError(_e8.INVALID_ARG_ERR,"invalid SuccessCallback argument");
}
}
}
if(_e6===undefined||_e6===null||_e6===""){
throw new DeviceAPIError(_e8.MISSING_ARG_ERR,"LandmarkItem is missing");
}else{
if(typeof (_e6)!=="object"){
throw new DeviceAPIError(_e8.INVALID_ARG_ERR,"invalid LandmarkItem argument");
}
}
if((_e7!=undefined)){
if((!_e7)&&(typeof (_e7)!="number")){
_e9=false;
}else{
if((typeof (_e7)!="function")){
throw new DeviceAPIError(_e8.INVALID_ARG_ERR,"invalid ErrorCallback callback");
}
}
}else{
_e9=false;
}
var str="updateLandmark: ";
var _eb=new Object();
modifyObjectBaseProp(_eb);
_eb.Type="Landmark";
_eb.Data=new __sp_landmark_obj(_e6,str);
this.temporarySCb=_e5;
this.temporaryECb=_e7;
var _ec=this.so.IDataSource.Add(_eb,this.updateLandmarkCb);
if(_ec.TransactionID){
glob_obj.addToGlobalArray(_ec.TransactionID,_e5,_e7);
}
if(_ec.ErrorCode!=0){
switch(_ec.ErrorCode){
case err_missing_argument:
throw new DeviceAPIError(_e8.MISSING_ARG_ERR,_ec.ErrorMessage);
break;
case err_bad_argument:
throw new DeviceAPIError(_e8.INVALID_ARG_ERR,_ec.ErrorMessage);
break;
case err_ServiceNotSupported:
throw new DeviceAPIError(_e8.NOT_SUPPORTED_ERR,_ec.ErrorMessage);
break;
case err_InvalidService_Argument:
throw new DeviceAPIError(_e8.INVALID_ARG_ERR,_ec.ErrorMessage);
break;
default:
throw new DeviceAPIError(-101,"unknown error message");
}
}
return _ec.TransactionID;
}
catch(e){
throw e;
}
};
function __sp_landmarks_category_update_cb(_ed,_ee,_ef){
var _f0;
var _f1;
var _f2;
if(this.temporarySCb){
category_cb=this.temporarySCb;
_f1=this.temporaryECb;
this.temporarySCb=null;
this.temporaryECb=null;
}else{
_f2=glob_obj.getFromArray(_ed);
if(_f2){
_f0=_f2.success_cb;
_f1=_f2.error_cb;
}else{
alert("Landmarks: __sp_landmarks_category_update_cb: Callback not found ");
return;
}
}
if(_ee==4||_ef.ErrorCode){
var _f3=convertFromPS2JS(_ef.ErrorCode);
var _f4=new DeviceAPIError(_f3,_ef.ErrorMessage);
if(_f1){
_f1(_f4);
}
}else{
_f0();
}
glob_obj.removeFromArray(_ed);
};
function __sp_landmarks_category_update(_f5,_f6,_f7){
try{
var _f8=new DeviceAPIError(0,"dummy");
var _f9=true;
if(_f5===undefined){
throw new DeviceAPIError(_f8.MISSING_ARG_ERR,"SucessCallback is missing");
}else{
if(((_f5===null)||(_f5===""))&&(typeof (_f5)!="number")){
throw new DeviceAPIError(_f8.MISSING_ARG_ERR,"SucessCallback is missing");
}else{
if(typeof (_f5)!="function"){
throw new DeviceAPIError(_f8.INVALID_ARG_ERR,"invalid SucessCallback argument");
}
}
}
if(_f6===undefined||_f6===null||_f6===""){
throw new DeviceAPIError(_f8.MISSING_ARG_ERR,"CategoryItem is missing");
}else{
if(typeof (_f6)!=="object"){
throw new DeviceAPIError(_f8.INVALID_ARG_ERR,"invalid CategoryItem argument");
}
}
if((_f6.categoryId===undefined)||(_f6.categoryId===null)||(_f6.categoryId==="")){
throw new DeviceAPIError(_f8.MISSING_ARG_ERR,"categoryId is missing");
}
if(typeof (_f6.categoryId)!="string"){
throw new DeviceAPIError(_f8.INVALID_ARG_ERR,"category Id must be a string");
}
if((_f7!=undefined)){
if((!_f7)&&(typeof (_f7)!="number")){
_f9=false;
}else{
if((typeof (_f7)!="function")){
throw new DeviceAPIError(_f8.INVALID_ARG_ERR,"invalid ErrorCallback callback");
}
}
}else{
_f9=false;
}
var _fa=new Object();
modifyObjectBaseProp(_fa);
_fa.Type="Category";
_fa.Data=new __sp_category_obj(_f6);
this.temporarySCb=_f5;
this.temporaryECb=_f7;
var _fb=this.so.IDataSource.Add(_fa,this.updateCategoryCb);
if(_fb.TransactionID){
glob_obj.addToGlobalArray(_fb.TransactionID,_f5,_f7);
}
if(_fb.ErrorCode!=0){
switch(_fb.ErrorCode){
case err_missing_argument:
throw new DeviceAPIError(_f8.MISSING_ARG_ERR,_fb.ErrorMessage);
break;
case err_bad_argument:
throw new DeviceAPIError(_f8.INVALID_ARG_ERR,_fb.ErrorMessage);
break;
case err_ServiceNotSupported:
throw new DeviceAPIError(_f8.NOT_SUPPORTED_ERR,_fb.ErrorMessage);
break;
case err_InvalidService_Argument:
throw new DeviceAPIError(_f8.INVALID_ARG_ERR,_fb.ErrorMessage);
break;
default:
throw new DeviceAPIError(-101,"unknown error message");
}
}
return _fb.TransactionID;
}
catch(e){
throw e;
}
};
function __sp_landmarks_category_delete_cb(_fc,_fd,_fe){
var _ff;
var _100;
var _101;
if(this.temporarySCb){
category_cb=this.temporarySCb;
_100=this.temporaryECb;
this.temporarySCb=null;
this.temporaryECb=null;
}else{
_101=glob_obj.getFromArray(_fc);
if(_101){
_ff=_101.success_cb;
_100=_101.error_cb;
}else{
alert("Landmarks: __sp_landmarks_category_delete_cb: Callback not found ");
return;
}
}
if(_fd==4||_fe.ErrorCode){
var _102=convertFromPS2JS(_fe.ErrorCode);
var _103=new DeviceAPIError(_102,_fe.ErrorMessage);
if(_100){
_100(_103);
}
}else{
_ff();
}
glob_obj.removeFromArray(_fc);
};
function __sp_landmarks_category_delete(_104,_105,_106){
try{
var _107=new DeviceAPIError(0,"dummy");
var _108=true;
if(_104===undefined){
throw new DeviceAPIError(_107.MISSING_ARG_ERR,"SucessCallback is missing");
}else{
if(((_104===null)||(_104===""))&&(typeof (_104)!="number")){
throw new DeviceAPIError(_107.MISSING_ARG_ERR,"SucessCallback is missing");
}else{
if(typeof (_104)!="function"){
throw new DeviceAPIError(_107.INVALID_ARG_ERR,"invalid SucessCallback argument");
}
}
}
if(_105===undefined||_105===null){
throw new DeviceAPIError(_107.MISSING_ARG_ERR,"categoryId is missing");
}else{
if(typeof (_105)!=="string"){
throw new DeviceAPIError(_107.INVALID_ARG_ERR,"invalid categoryId argument");
}
}
if((_106!=undefined)){
if((!_106)&&(typeof (_106)!="number")){
_108=false;
}else{
if((typeof (_106)!="function")){
throw new DeviceAPIError(_107.INVALID_ARG_ERR,"invalid ErrorCallback callback");
}
}
}else{
_108=false;
}
var _109=new Object();
modifyObjectBaseProp(_109);
_109.Type="Category";
_109.Data=new Object();
modifyObjectBaseProp(_109.Data);
_109.Data.id=_105;
this.temporarySCb=_104;
this.temporaryECb=_106;
var rval=this.so.IDataSource.Delete(_109,this.deleteCategoryCb);
if(rval.TransactionID){
glob_obj.addToGlobalArray(rval.TransactionID,_104,_106);
}
if(rval.ErrorCode!=0){
switch(rval.ErrorCode){
case err_missing_argument:
throw new DeviceAPIError(_107.MISSING_ARG_ERR,rval.ErrorMessage);
break;
case err_bad_argument:
throw new DeviceAPIError(_107.INVALID_ARG_ERR,rval.ErrorMessage);
break;
case err_ServiceNotSupported:
throw new DeviceAPIError(_107.NOT_SUPPORTED_ERR,rval.ErrorMessage);
break;
case err_InvalidService_Argument:
throw new DeviceAPIError(_107.INVALID_ARG_ERR,rval.ErrorMessage);
break;
default:
throw new DeviceAPIError(-101,"unknown error message");
}
}
return rval.TransactionID;
}
catch(e){
throw e;
}
};
function __sp_landmarks_getList_cb(arg1,arg2,arg3){
var iter=null;
var _10f;
var _110;
var _111;
if(this.temporarySCb){
category_cb=this.temporarySCb;
_110=this.temporaryECb;
this.temporarySCb=null;
this.temporaryECb=null;
}else{
_111=glob_obj.getFromArray(arg1);
if(_111){
_10f=_111.success_cb;
_110=_111.error_cb;
}else{
alert("Landmarks: __sp_landmarks_getList_cb: Callback not found ");
return;
}
}
if(arg3.ErrorCode||(arg2==4)){
var _112=convertFromPS2JS(arg3.ErrorCode);
var _113=new DeviceAPIError(_112,arg3.ErrorMessage);
if(_110){
_110(_113);
}
}else{
if(arg3.ReturnValue){
iter=new __sp_landmarks_iterator(arg3.ReturnValue);
}
_10f(iter);
}
glob_obj.removeFromArray(arg1);
};
function __sp_landmarks_getList(_114,_115,_116){
try{
var _117=new DeviceAPIError(0,"dummy");
var _118=false;
var _119=false;
var _11a=false;
if((_114===undefined)||(_114===null)||(_114==="")){
throw new DeviceAPIError(_117.MISSING_ARG_ERR,"SucessCallback is missing");
}
if(typeof (_114)!="function"){
throw new DeviceAPIError(_117.INVALID_ARG_ERR,"invalid SucessCallback argument");
}
if((_116!==undefined)&&(_116!=="")&&(_116!==null)){
if((typeof (_116)!="function")){
throw new DeviceAPIError(_117.INVALID_ARG_ERR,"invalid error callback");
}else{
_118=true;
}
}
var _11b=new Object();
modifyObjectBaseProp(_11b);
_11b.Type="Landmark";
_11b.Filter=new Object();
if((_115===undefined)||(_115===null)||(_115==="")){
_11b.Filter.dummy="dummy";
}else{
if(typeof (_115)=="string"){
_11b.Filter.LandmarkName=_115;
}else{
if(typeof (_115)!="object"){
throw new DeviceAPIError(_117.INVALID_ARG_ERR,"invalid match criteria");
}else{
if((_115.name!==undefined)&&(_115.name!==null)&&(_115.name!=="")){
_11b.Filter.LandmarkName=_115.name;
}
if((_115.description!==undefined)&&(_115.description!==null)&&(_115.description!=="")){
_11b.Filter.LandmarkDesc=_115.description;
}
if((_115.categoryId!==undefined)&&(_115.categoryId!==null)&&(_115.categoryId!=="")){
_11b.Filter.categoryId=_115.categoryId;
}
if((_115.position!==undefined)&&(_115.position!==null)&&(_115.position!=="")){
if(typeof (_115.position)!="object"){
throw new DeviceAPIError(_117.INVALID_ARG_ERR,"position must be an object");
}else{
_11b.Filter.LandmarkPosition=new __sp_landmark_position_obj(_115.position);
}
}
if((_115.coverageRadiusUsed!==undefined)&&(_115.coverageRadiusUsed!==null)&&(_115.coverageRadiusUsed!=="")){
if(typeof (_115.coverageRadiusUsed)!="number"){
throw new DeviceAPIError(_117.INVALID_ARG_ERR,"coverageRadiusUsed should be number");
}else{
_11b.Filter.CoverageRadiusOption=_115.coverageRadiusUsed;
}
}
if((_115.searchRadius!==undefined)&&(_115.searchRadius!==null)&&(_115.searchRadius!=="")){
if(typeof (_115.searchRadius)!="number"){
throw new DeviceAPIError(_117.INVALID_ARG_ERR,"searchRadius should be number");
}else{
_11b.Filter.MaximumDistance=_115.searchRadius;
}
}
if((_115.area!==undefined)&&(_115.area!==null)&&(_115.area!=="")){
if(typeof (_115.area)!="object"){
throw new DeviceAPIError(_117.INVALID_ARG_ERR,"area must be an object");
}else{
_11b.Filter.BoundedArea=new __sp_landmark_bounded_area_obj(_115.area);
}
}
}
}
}
this.temporarySCb=_114;
this.temporaryECb=_116;
var rval=this.so.IDataSource.GetList(_11b,this.getLandmarksCb);
if(rval.TransactionID){
glob_obj.addToGlobalArray(rval.TransactionID,_114,_116);
}
if(rval.ErrorCode!=0){
switch(rval.ErrorCode){
case 1003:
throw new DeviceAPIError(_117.MISSING_ARG_ERR,rval.ErrorMessage);
break;
case 1002:
throw new DeviceAPIError(_117.INVALID_ARG_ERR,rval.ErrorMessage);
break;
case 1004:
throw new DeviceAPIError(_117.NOT_SUPPORTED_ERR,rval.ErrorMessage);
break;
case 1000:
throw new DeviceAPIError(_117.INVALID_ARG_ERR,rval.ErrorMessage);
break;
default:
throw new DeviceAPIError(-101,"unknown error message");
}
}
return rval.TransactionID;
}
catch(e){
throw e;
}
};
function __sp_landmarks_import_cb(arg1,arg2,arg3){
var iter=null;
var _121;
var _122;
var _123;
if(this.temporarySCb){
category_cb=this.temporarySCb;
_122=this.temporaryECb;
this.temporarySCb=null;
this.temporaryECb=null;
}else{
_123=glob_obj.getFromArray(arg1);
if(_123){
_121=_123.success_cb;
_122=_123.error_cb;
}else{
alert("Landmarks: __sp_landmarks_import_cb: Callback not found ");
return;
}
}
if(arg2==4||arg3.ErrorCode){
var _124=convertFromPS2JS(arg3.ErrorCode);
var _125=new DeviceAPIError(_124,arg3.ErrorMessage);
if(_122){
_122(_125);
}
}else{
if(arg3.ReturnValue){
iter=new __sp_landmarks_iterator(arg3.ReturnValue);
}
_121(iter);
}
glob_obj.removeFromArray(arg1);
};
function __sp_landmarks_import(_126,_127,_128,_129){
try{
var _12a=new DeviceAPIError(0,"dummy");
var _12b=true;
if(_126===undefined){
throw new DeviceAPIError(_12a.MISSING_ARG_ERR,"LandmarksItrCallback is missing");
}else{
if(((_126===null)||(_126===""))&&(typeof (_126)!="number")){
throw new DeviceAPIError(_12a.MISSING_ARG_ERR,"LandmarksItrCallback is missing");
}else{
if(typeof (_126)!="function"){
throw new DeviceAPIError(_12a.INVALID_ARG_ERR,"invalid LandmarksItrCallback argument");
}
}
}
if(_127===undefined||_127===null){
throw new DeviceAPIError(_12a.MISSING_ARG_ERR,"sourceFileUri is missing");
}else{
if(typeof (_127)!=="string"){
throw new DeviceAPIError(_12a.INVALID_ARG_ERR,"invalid sourceFileUri argument");
}
}
if(_128===undefined||_128===null){
throw new DeviceAPIError(_12a.MISSING_ARG_ERR,"mimetype is missing");
}else{
if(typeof (_128)!=="string"){
throw new DeviceAPIError(_12a.INVALID_ARG_ERR,"invalid mimetype argument");
}
}
if((_129!=undefined)){
if((!_129)&&(typeof (_129)!="number")){
_12b=false;
}else{
if((typeof (_129)!="function")){
throw new DeviceAPIError(_12a.INVALID_ARG_ERR,"invalid ErrorCallback callback");
}
}
}else{
_12b=false;
}
var _12c=new Object();
modifyObjectBaseProp(_12c);
_12c.Type="Landmark";
_12c.Data=new Object();
modifyObjectBaseProp(_12c.Data);
if(_127.slice(0,7)=="file://"){
_127=_127.slice(7);
}else{
if(_127.slice(0,8)=="file:///"){
_127=_127.slice(8);
}else{
throw new DeviceAPIError(_12a.INVALID_ARG_ERR,"sourceFileUri is not in URI format");
}
}
while(_127.search("/")!=-1){
_127=_127.replace("/","\\");
}
_12c.Data.SourceFile=_127;
_12c.Data.MimeType=_128;
this.temporarySCb=_126;
this.temporaryECb=_129;
var rval=this.so.IDataSource.Import(_12c,this.importLandmarksCb);
if(rval.TransactionID){
glob_obj.addToGlobalArray(rval.TransactionID,_126,_129);
}
if(rval.ErrorCode!=0){
switch(rval.ErrorCode){
case err_missing_argument:
throw new DeviceAPIError(_12a.MISSING_ARG_ERR,rval.ErrorMessage);
break;
case err_bad_argument:
throw new DeviceAPIError(_12a.INVALID_ARG_ERR,rval.ErrorMessage);
break;
case err_ServiceNotSupported:
throw new DeviceAPIError(_12a.NOT_SUPPORTED_ERR,rval.ErrorMessage);
break;
case err_InvalidService_Argument:
throw new DeviceAPIError(_12a.INVALID_ARG_ERR,rval.ErrorMessage);
break;
default:
throw new DeviceAPIError(-101,"unknown error message");
}
}
return rval.TransactionID;
}
catch(e){
throw e;
}
};
function __sp_landmarks_export_cb(arg1,arg2,arg3){
var _131;
var _132;
var _133;
if(this.temporarySCb){
category_cb=this.temporarySCb;
_132=this.temporaryECb;
this.temporarySCb=null;
this.temporaryECb=null;
}else{
_133=glob_obj.getFromArray(arg1);
if(_133){
_131=_133.success_cb;
_132=_133.error_cb;
}else{
alert("Landmarks: __sp_landmarks_export_cb: Callback not found ");
return;
}
}
if(arg2==4||arg3.ErrorCode){
var _134=convertFromPS2JS(arg3.ErrorCode);
var _135=new DeviceAPIError(_134,arg3.ErrorMessage);
if(_132){
_132(_135);
}
}else{
_131();
}
glob_obj.removeFromArray(arg1);
};
function __sp_landmarks_export(_136,_137,_138,_139,_13a){
try{
var _13b=new DeviceAPIError(0,"dummy");
var _13c=true;
if(_136===undefined){
throw new DeviceAPIError(_13b.MISSING_ARG_ERR,"SuccessCallback is missing");
}else{
if(((_136===null)||(_136===""))&&(typeof (_136)!="number")){
throw new DeviceAPIError(_13b.MISSING_ARG_ERR,"SuccessCallback is missing");
}else{
if(typeof (_136)!="function"){
throw new DeviceAPIError(_13b.INVALID_ARG_ERR,"invalid SuccessCallback argument");
}
}
}
if(_137===undefined||_137===null){
throw new DeviceAPIError(_13b.MISSING_ARG_ERR,"landmarkIdList is missing");
}else{
if(typeof (_137)!=="object"){
throw new DeviceAPIError(_13b.INVALID_ARG_ERR,"invalid landmarkIdList argument");
}
}
if(_138===undefined||_138===null){
throw new DeviceAPIError(_13b.MISSING_ARG_ERR,"destFileUri is missing");
}else{
if(typeof (_138)!=="string"){
throw new DeviceAPIError(_13b.INVALID_ARG_ERR,"invalid destFileUri argument");
}
}
if(_139===undefined||_139===null){
throw new DeviceAPIError(_13b.MISSING_ARG_ERR,"mimetype is missing");
}else{
if(typeof (_139)!=="string"){
throw new DeviceAPIError(_13b.INVALID_ARG_ERR,"invalid mimetype argument");
}
}
if((_13a!=undefined)){
if((!_13a)&&(typeof (_13a)!="number")){
_13c=false;
}else{
if((typeof (_13a)!="function")){
throw new DeviceAPIError(_13b.INVALID_ARG_ERR,"invalid ErrorCallback callback");
}
}
}else{
_13c=false;
}
var _13d=new Object();
modifyObjectBaseProp(_13d);
_13d.Type="Landmark";
_13d.Data=new Object();
modifyObjectBaseProp(_13d.Data);
if(_138.slice(0,7)=="file://"){
_138=_138.slice(7);
}else{
if(_138.slice(0,8)=="file:///"){
_138=_138.slice(8);
}else{
throw new DeviceAPIError(_13b.INVALID_ARG_ERR,"destFileUri is not in URI format");
}
}
while(_138.search("/")!=-1){
_138=_138.replace("/","\\");
}
_13d.Data.DestinationFile=_138;
_13d.Data.IdList=_137;
_13d.Data.MimeType=_139;
this.temporarySCb=_136;
this.temporaryECb=_13a;
var rval=this.so.IDataSource.Export(_13d,this.exportLandmarksCb);
if(rval.TransactionID){
glob_obj.addToGlobalArray(rval.TransactionID,_136,_13a);
}
if(rval.ErrorCode!=0){
switch(rval.ErrorCode){
case err_missing_argument:
throw new DeviceAPIError(_13b.MISSING_ARG_ERR,rval.ErrorMessage);
break;
case err_bad_argument:
throw new DeviceAPIError(_13b.INVALID_ARG_ERR,rval.ErrorMessage);
break;
case err_ServiceNotSupported:
throw new DeviceAPIError(_13b.NOT_SUPPORTED_ERR,rval.ErrorMessage);
break;
case err_InvalidService_Argument:
throw new DeviceAPIError(_13b.INVALID_ARG_ERR,rval.ErrorMessage);
break;
default:
throw new DeviceAPIError(-101,"unknown error message");
}
}
return rval.TransactionID;
}
catch(e){
throw e;
}
};
function __sp_landmarks_organize_cb(arg1,arg2,arg3){
var _142;
var _143;
if(this.temporarySCb){
category_cb=this.temporarySCb;
_143=this.temporaryECb;
this.temporarySCb=null;
this.temporaryECb=null;
}else{
CbObj=glob_obj.getFromArray(arg1);
if(CbObj){
_142=CbObj.success_cb;
_143=CbObj.error_cb;
}else{
alert("Landmarks: __sp_landmarks_organize_cb: Callback not found ");
return;
}
}
if(arg2==4||arg3.ErrorCode){
var _144=convertFromPS2JS(arg3.ErrorCode);
var _145=new DeviceAPIError(_144,arg3.ErrorMessage);
if(_143){
_143(_145);
}
}else{
_142();
}
glob_obj.removeFromArray(arg1);
};
function __sp_landmarks_organize(_146,_147,_148,_149,_14a){
try{
var _14b=new DeviceAPIError(0,"dummy");
var _14c=true;
if(_146===undefined){
throw new DeviceAPIError(_14b.MISSING_ARG_ERR,"SuccessCallback is missing");
}else{
if(((_146===null)||(_146===""))&&(typeof (_146)!="number")){
throw new DeviceAPIError(_14b.MISSING_ARG_ERR,"SuccessCallback is missing");
}else{
if(typeof (_146)!="function"){
throw new DeviceAPIError(_14b.INVALID_ARG_ERR,"invalid SuccessCallback argument");
}
}
}
if(_147===undefined||_147===null){
throw new DeviceAPIError(_14b.MISSING_ARG_ERR,"landmarkIdList is missing");
}else{
if(typeof (_147)!=="object"){
throw new DeviceAPIError(_14b.INVALID_ARG_ERR,"invalid LandmarkItem argument");
}
}
if(_148===undefined||_148===null){
throw new DeviceAPIError(_14b.MISSING_ARG_ERR,"categoryId is missing");
}else{
if(typeof (_148)!=="string"){
throw new DeviceAPIError(_14b.INVALID_ARG_ERR,"invalid categoryId argument");
}
}
if(_149===undefined||_149===null){
_149=true;
}else{
if(typeof (_149)!=="boolean"){
throw new DeviceAPIError(_14b.INVALID_ARG_ERR,"invalid associate argument");
}
}
if((_14a!=undefined)){
if((!_14a)&&(typeof (_14a)!="number")){
_14c=false;
}else{
if((typeof (_14a)!="function")){
throw new DeviceAPIError(_14b.INVALID_ARG_ERR,"invalid ErrorCallback callback");
}
}
}else{
_14c=false;
}
var _14d=new Object();
modifyObjectBaseProp(_14d);
_14d.Type="Landmark";
_14d.Data=new Object();
modifyObjectBaseProp(_14d.Data);
_14d.Data.id=_148;
_14d.Data.IdList=_147;
if(_149){
_14d.OperationType="Associate";
}else{
_14d.OperationType="Disassociate";
}
this.temporarySCb=_146;
this.temporaryECb=_14a;
var rval=this.so.IDataSource.Organise(_14d,this.organizeLandmarksCb);
if(rval.TransactionID){
glob_obj.addToGlobalArray(rval.TransactionID,_146,_14a);
}
if(rval.ErrorCode!=0){
switch(rval.ErrorCode){
case err_missing_argument:
throw new DeviceAPIError(_14b.MISSING_ARG_ERR,rval.ErrorMessage);
break;
case err_bad_argument:
throw new DeviceAPIError(_14b.INVALID_ARG_ERR,rval.ErrorMessage);
break;
case err_ServiceNotSupported:
throw new DeviceAPIError(_14b.NOT_SUPPORTED_ERR,rval.ErrorMessage);
break;
case err_InvalidService_Argument:
throw new DeviceAPIError(_14b.INVALID_ARG_ERR,rval.ErrorMessage);
break;
default:
throw new DeviceAPIError(-101,"unknown error message");
}
}
return rval.TransactionID;
}
catch(e){
throw e;
}
};
function __sp_landmarks_cancel(_14f){
try{
var _150=new DeviceAPIError(0,"dummy");
if((_14f===undefined)||(_14f===null)||(_14f==="")){
throw new DeviceAPIError(_150.MISSING_ARG_ERR,"transactionId is missing");
}
if(typeof (_14f)!="number"){
throw new DeviceAPIError(_150.INVALID_ARG_ERR,"invalid transactionId argument");
}
if(_14f<0){
throw new DeviceAPIError(_150.DATA_NOT_FOUND_ERR,"non-existent transactionId");
}
var _151=new Object();
modifyObjectBaseProp(_151);
_151.TransactionID=_14f;
var rval=this.so.IDataSource.Cancel(_151);
if(rval.ErrorCode!=0){
switch(rval.ErrorCode){
case err_missing_argument:
throw new DeviceAPIError(_150.MISSING_ARG_ERR,rval.ErrorMessage);
break;
case err_bad_argument:
throw new DeviceAPIError(_150.INVALID_ARG_ERR,rval.ErrorMessage);
break;
case err_ServiceNotSupported:
throw new DeviceAPIError(_150.NOT_SUPPORTED_ERR,rval.ErrorMessage);
break;
case err_InvalidService_Argument:
throw new DeviceAPIError(_150.INVALID_ARG_ERR,rval.ErrorMessage);
break;
default:
throw new DeviceAPIError(-101,"unknown error message");
}
}
}
catch(e){
throw e;
}
};
function __device_media_descriptor(_153){
this.interfaceName=_153.interfaceName;
this.version=_153.version;
};
function __device_media_getList(_154,_155,_156,_157){
return this.provider.getList(_154,_155,_156,_157);
};
function __device_media_getThumbnail(_158,_159,_15a){
return this.provider.getThumbnail(_158,_159,_15a);
};
function __device_media_addStreamUri(uri){
return this.provider.addStreamUri(uri);
};
function __device_media_deleteStreamUri(uri){
return this.provider.deleteStreamUri(uri);
};
function __device_media_cancel(_15d){
this.provider.cancel(_15d);
};
function __device_media_refreshMediaDb(uri){
this.provider.refreshMediaDb(uri);
};
function __device_media(_15f){
this.provider=_15f;
this.interfaceName=_15f.descriptor.interfaceName;
this.version=_15f.descriptor.version;
this.SORT_ASCENDING=0;
this.SORT_DESCENDING=1;
this.getList=__device_media_getList;
this.getThumbnail=__device_media_getThumbnail;
this.addStreamUri=__device_media_addStreamUri;
this.deleteStreamUri=__device_media_deleteStreamUri;
this.refreshMediaDb=__device_media_refreshMediaDb;
this.cancel=__device_media_cancel;
};
var __device_media_service_entry={"name":null,"version":null,"proto":__device_media,"descriptor":__device_media_descriptor,"providers":[{"descriptor":__sp_media_descriptor,"instance":__sp_media_instance}]};
function __device_media_descriptor(_160){
this.interfaceName=_160.interfaceName;
this.version=_160.version;
};
function __device_media_getList(_161,_162,_163,_164){
return this.provider.getList(_161,_162,_163,_164);
};
function __device_media_getThumbnail(_165,_166,_167){
return this.provider.getThumbnail(_165,_166,_167);
};
function __device_media_addStreamUri(uri){
return this.provider.addStreamUri(uri);
};
function __device_media_deleteStreamUri(uri){
return this.provider.deleteStreamUri(uri);
};
function __device_media_cancel(_16a){
this.provider.cancel(_16a);
};
function __device_media_refreshMediaDb(uri){
this.provider.refreshMediaDb(uri);
};
function __device_media(_16c){
this.provider=_16c;
this.interfaceName=_16c.descriptor.interfaceName;
this.version=_16c.descriptor.version;
this.SORT_ASCENDING=0;
this.SORT_DESCENDING=1;
this.getList=__device_media_getList;
this.getThumbnail=__device_media_getThumbnail;
this.addStreamUri=__device_media_addStreamUri;
this.deleteStreamUri=__device_media_deleteStreamUri;
this.refreshMediaDb=__device_media_refreshMediaDb;
this.cancel=__device_media_cancel;
};
var __device_media_service_entry={"name":null,"version":null,"proto":__device_media,"descriptor":__device_media_descriptor,"providers":[{"descriptor":__sp_media_descriptor,"instance":__sp_media_instance}]};
var FILESCHMLEN=7;
function __sp_media_descriptor(){
this.interfaceName="media";
if(window.__Service_Interface_Ver){
this.version=__Service_Interface_Ver;
}else{
this.version=1;
}
};
function __sp_device_media_item_build(_16d){
if(!_16d){
return null;
}
var _16e={};
modifyObjectBaseProp(_16e);
if(_16d.FileNameAndPath){
var _16f=_16d.FileNameAndPath.replace(/\\/g,"/");
var _170="file://";
_16e.uri=_170+_16f;
}
if(_16d.MediaType){
var _171=_16d.MediaType;
switch(_171){
case 1:
case 2:
_16e.type="audio";
break;
case 3:
_16e.type="image";
break;
case 4:
_16e.type="video";
break;
case 5:
_16e.type="stream";
break;
default:
break;
}
}
if(_16d.FileName){
if(_16d.MediaType==3){
_16e.title=_16d.FileName;
}
}
if(_16d.FileDate){
_16e.date=new Date(Date.parse(_16d.FileDate));
}
if(_16d.FileSize){
_16e.size=_16d.FileSize;
}
if(_16d.SongName){
_16e.title=_16d.SongName;
}
if(_16d.Artist){
_16e.artist=_16d.Artist;
}
if(_16d.Album){
_16e.album=_16d.Album;
}
if(_16d.Genre){
_16e.genre=_16d.Genre;
}
if(_16d.TrackNumber){
_16e.track=_16d.TrackNumber;
}
if(_16d.Composer){
_16e.composer=_16d.Composer;
}
return _16e;
};
function __sp_media_iterator_get_next(){
var item=this.iter.getNext();
if(typeof item=="undefined"){
return null;
}
var _173=__sp_device_media_item_build(item);
item.close();
return _173;
};
function __sp_media_iterator(_174){
this.iter=_174;
this.next=__sp_media_iterator_get_next;
this.close=function(){
this.iter.close();
};
};
function __sp_media_get_field_name(name,type){
this.error=new DeviceException(0,"Dummy");
if(typeof name!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getList:field is of invalid type");
}
switch(name.toLowerCase()){
case "title":
if(type=="Image"||type=="Video"){
return "FileName";
}else{
return "SongName";
}
case "artist":
return "Artist";
case "album":
return "Album";
case "genre":
return "Genre";
case "track":
return "TrackNumber";
case "composer":
return "Composer";
default:
return null;
}
};
function __sp_media_get_sortfield_name(name,type){
this.error=new DeviceException(0,"Dummy");
if(typeof name!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getList:sortBy is of invalid type");
}
var _179=name.toLowerCase();
if(_179=="date"){
return "FileDate";
}else{
return __sp_media_get_field_name(name,type);
}
};
function __sp_media_get_date_objct(date){
var _17b="";
_17b=date.getFullYear().toString();
if(date.getMonth()<10){
_17b=_17b+("0")+(date.getMonth().toString());
}else{
_17b=_17b+(date.getMonth().toString());
}
var day=date.getDate()-1;
if(day<10){
_17b=_17b+("0")+(day.toString());
}else{
_17b=_17b+(day.toString());
}
_17b=_17b+(":");
if(date.getHours()<10){
_17b=_17b+("0")+(date.getHours().toString());
}else{
_17b=_17b+(date.getHours().toString());
}
if(date.getMinutes()<10){
_17b=_17b+("0")+(date.getMinutes().toString());
}else{
_17b=_17b+(date.getMinutes().toString());
}
if(date.getSeconds()<10){
_17b=_17b+("0")+(date.getSeconds().toString());
}else{
_17b=_17b+(date.getSeconds().toString());
}
return _17b;
};
function __sp_media_getList_cb(arg1,arg2,arg3){
var _180;
var _181;
var _182;
_182=glob_obj.getFromArray(arg1);
if(_182){
_180=_182.success_cb;
_181=_182.error_cb;
}else{
alert("Media : __sp_media_getList_cb: Callback not found ");
return;
}
if(arg3.ErrorCode!=0&&arg3.ErrorCode!=1010){
_181(new DeviceException(arg3.ErrorCode,"Media: getList: Operation Failed"));
return;
}
if(arg2!=event_cancelled){
var iter=null;
if(arg3.ReturnValue){
iter=new __sp_media_iterator(arg3.ReturnValue);
}
_180(iter);
}
glob_obj.removeFromArray(arg1);
};
function __sp_media_getList(_184,_185,_186,_187){
if(!_184){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Media:getList:Callback is missing");
}else{
if(typeof _184!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getList:Callback is of invalid type");
}
}
if(_187){
if(typeof _187!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media: getList: error callback is invalid");
}
}
if((typeof _185)!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Invalid Argument:"+_185);
}
if(_185){
if(("sortBy" in _185)&&(_185.sortBy==undefined||_185.sortBy==null||_185.sortBy=="")){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media: getList: sortby is invalid");
}
}
var _188={};
modifyObjectBaseProp(_188);
_188.Type="FileInfo";
_188.Filter={};
modifyObjectBaseProp(_188.Filter);
_188.Sort={};
modifyObjectBaseProp(_188.Sort);
if(_185){
if(_185.type){
if(typeof _185.type!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getList:type is of invalid type");
}
switch(_185.type.toLowerCase()){
case "audio":
_188.Filter.FileType="audio";
break;
case "image":
_188.Filter.FileType="Image";
break;
case "video":
_188.Filter.FileType="Video";
break;
case "stream":
_188.Filter.FileType="StreamingURL";
break;
default:
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getList: type is invalid");
}
if(("field" in _185)&&(_185.field==undefined||_185.field==null)){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getList:field is invalid");
}
if(_185.field!=null){
_188.Filter.Key=__sp_media_get_field_name(_185.field.name,_188.Filter.FileType);
if(_188.Filter.Key==null){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getList:key is invalid");
}
if(_185.field.value){
_188.Filter.StartRange=_185.field.value;
if(_188.Filter.Key=="TrackNumber"){
_188.Filter.EndRange=_185.field.value;
}
}
}else{
if(_185.dateRange){
if(typeof _185.dateRange!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getList:dateRange is of invalid type");
}
_188.Filter.Key="FileDate";
if((typeof _185.dateRange.start!="undefined")&&(typeof _185.dateRange.end!="undefined")){
if((typeof _185.dateRange.start!="object")||(_185.dateRange.start=="")||(_185.dateRange.start==null)){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getList:dateRange:start is of invalid type");
}else{
_188.Filter.StartRange=__sp_media_get_date_objct(_185.dateRange.start);
}
if((typeof _185.dateRange.end!="object")||(_185.dateRange.end=="")||(_185.dateRange.end==null)){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getList:dateRange:end is of invalid type");
}else{
_188.Filter.EndRange=__sp_media_get_date_objct(_185.dateRange.end);
}
}else{
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getList:start or end of dateRange is missing");
}
}else{
if(("dateRange" in _185)&&(_185.dateRange==0||_185.dateRange==null||_185.dateRange=="")){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getList: dateRange is Invalid");
}
}
}
if(_185.sortBy){
_188.Sort.Key=__sp_media_get_sortfield_name(_185.sortBy,_188.Filter.FileType);
if(_188.Sort.Key==null){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getList:sortBy is invalid");
}
}else{
_188.Sort.Key="FileDate";
}
if(_186){
if(_186==this.SORT_ASCENDING){
_188.Sort.Order="Ascending";
}else{
if(_186==this.SORT_DESCENDING){
_188.Sort.Order="Descending";
}else{
if((_186!=this.SORT_ASCENDING)||(_186!=this.SORT_DESCENDING)){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getList:sortBy is invalid");
}
}
}
}else{
_188.Sort.Order="Ascending";
}
}else{
throw new DeviceException(this.error.MISSING_ARG_ERR,"Media:type is missing");
}
}else{
_188.Filter.FileType="all";
_188.Sort.Key="FileDate";
_188.Sort.Order="Ascending";
}
try{
temp_scb=_184;
temp_ecb=_187;
var rval=this.so.IDataSource.GetList(_188,this.getListMediaCb);
if(rval.TransactionID){
glob_obj.addToGlobalArray(rval.TransactionID,_184,_187);
}
if(_188.Sort){
delete _188.Sort;
}
if(_188.Filter.StartRange){
delete _188.Filter.StartRange;
}
if(_188.Filter.EndRange){
delete _188.Filter.EndRange;
}
if(_188.Filter){
delete _188.Filter;
}
if(rval.ErrorCode!=0){
switch(MapErrorCode[rval.ErrorCode]){
case this.error.MISSING_ARG_ERR:
case this.error.INVALID_ARG_ERR:
case this.error.NOT_SUPPORTED_ERR:
if(rval.ErrorMessage){
var _18a=splitErrorMessage(rval.ErrorMessage);
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Media:getList:"+_18a);
}else{
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Media:getList:Operation failed");
}
break;
default:
_187(new DeviceException(MapErrorCode[rval.ErrorCode],"Media: getList: Operation Failed"));
}
}
return rval.TransactionID;
}
catch(e){
__device_handle_exception(e,"__sp_media_getList: "+e);
}
};
function __sp_media_getThumbnail_cb(arg1,arg2,arg3){
var _18e;
var _18f;
var _190;
_190=glob_obj.getFromArray(arg1);
if(_190){
_18f=_190.success_cb;
_18e=_190.error_cb;
}else{
alert("Media : __sp_media_getThumbnail_cb: Callback not found ");
return;
}
if(arg3.ErrorCode!=0&&arg3.ErrorCode!=1010){
_18e(new DeviceException(arg3.ErrorCode,"Media: getThumbnail: Operation Failed"));
return;
}
if(arg2!=event_cancelled){
var _191=null;
if(arg3.ReturnValue){
_191=arg3.ReturnValue.replace(/\\/g,"/");
var _192="file://";
_191=_192+_191;
}
_18f(_191);
}
glob_obj.removeFromArray(arg1);
};
function __sp_media_getThumbnail(_193,_194,_195){
if(!_193){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Media:getThumbnail:Callback is missing");
}else{
if(typeof _193!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getList:Callback is invalid");
}
}
if(_195){
var _196=_195;
if(typeof _195!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media: getThumbnail: error callback is invalid");
}
}
var _197={};
modifyObjectBaseProp(_197);
if(_194){
if(typeof _194!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getThumbnail:thumbnailInfo is of invalid type object");
}
if(_194.uri){
if(typeof _194.uri!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getThumbnail:uri is not of type string");
}
if(_194.uri.search("file://")==0){
url=_194.uri.slice(FILESCHMLEN);
_197.Url=url.replace(/\//g,"\\");
}else{
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getThumbnail:uri is not in file protocol");
}
}else{
throw new DeviceException(this.error.MISSING_ARG_ERR,"Media:getThumbnail:uri is missing");
}
}else{
throw new DeviceException(this.error.MISSING_ARG_ERR,"Media:thumbnailInfo is missing");
}
if(_194.size==null||_194.size==""){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getThumbnail:size is not of type Object");
}
if(_194.size){
if(typeof _194.size!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Media:getThumbnail:size is not of type Object");
}
if((typeof _194.size.width=="undefined")&&(typeof _194.size.height=="undefined")){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Media:thumbnailInfo should have atleast width or height");
}else{
var _198={};
modifyObjectBaseProp(_198);
if(typeof _194.size.width!="undefined"){
_198.width=_194.size.width;
}
if(typeof _194.size.height!="undefined"){
_198.height=_194.size.height;
}
_197.ThumbnailSize=_198;
delete _198;
}
}
try{
temp_scb=_193;
temp_ecb=_195;
var rval=this.so.IDataSource.GetThumbnail(_197,this.getThumbnailCb);
if(rval.TransactionID){
glob_obj.addToGlobalArray(rval.TransactionID,_193,_195);
}
delete _197;
if(rval.ErrorCode!=0){
switch(MapErrorCode[rval.ErrorCode]){
case this.error.MISSING_ARG_ERR:
_195(new DeviceException(this.error.MISSING_ARG_ERR,"Media: getThumbnail: Operation Failed"));
break;
case this.error.NOT_SUPPORTED_ERR:
_195(new DeviceException(MapErrorCode[rval.ErrorCode],"Media:getThumbnail:Operation failed"));
break;
case this.error.INVALID_ARG_ERR:
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Media:getThumbnail:Operation failed");
break;
default:
if(_195){
_195(new DeviceException(MapErrorCode[rval.ErrorCode],"Media:getThumbnail:Operation failed"));
}else{
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Media:getThumbnail:Operation failed");
}
}
}
return rval.TransactionID;
}
catch(e){
__device_handle_exception(e,"__sp_media_getThumbnail: "+e);
}
};
function __sp_media_addStreamUri(uri){
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Media:addStreamUri:Not Supported");
};
function __sp_media_deleteStreamUri(uri){
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Media:deleteStreamUri:Not Supported");
};
function __sp_media_refreshMediaDb(uri){
};
function __sp_media_cancel(_19d){
try{
var rval=this.so.IDataSource.Cancel(_19d);
if(rval.ErrorCode!=0){
switch(rval.ErrorCode){
case this.error.MISSING_ARG_ERR:
case this.error.INVALID_ARG_ERR:
case this.error.NOT_SUPPORTED_ERR:
if(rval.ErrorMessage){
var _19f=splitErrorMessage(rval.ErrorMessage);
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Media:cancel:"+_19f);
}else{
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Media:cancel:Operation failed");
}
break;
default:
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Media:cancel:Operation failed");
}
}
}
catch(e){
__device_handle_exception(e,"__sp_media_refreshMediaDb: "+e);
}
};
function __sp_media_instance(){
this.descriptor=new __sp_media_descriptor();
this.SORT_ASCENDING=0;
this.SORT_DESCENDING=1;
this.getList=__sp_media_getList;
this.getListMediaCb=__sp_media_getList_cb;
this.getThumbnail=__sp_media_getThumbnail;
this.getThumbnailCb=__sp_media_getThumbnail_cb;
this.addStreamUri=__sp_media_addStreamUri;
this.deleteStreamUri=__sp_media_deleteStreamUri;
this.refreshMediaDb=__sp_media_refreshMediaDb;
this.cancel=__sp_media_cancel;
this.error=new DeviceException(0,"Dummy");
try{
this.so=device.getServiceObject("Service.MediaManagement","IDataSource");
}
catch(e){
this.so=null;
__device_handle_exception(e,"media service not available");
}
};
var __device_sensors_service_entry={"name":null,"version":null,"proto":__device_sensors,"descriptor":__device_sensors_descriptor,"providers":[{"descriptor":__sp_sensors_descriptor,"instance":__sp_sensors_instance}]};
function __device_sensors(_1a0){
this.provider=_1a0;
this.interfaceName=_1a0.descriptor.interfaceName;
this.version=_1a0.descriptor.version;
this.getChannels=__device_sensors_getChannels;
this.startChannel=__device_sensors_setNotifier;
this.stopChannel=__device_sensors_cancelNotifier;
this.getScaleFactor=__device_sensors_getScaleFactor;
};
function __device_sensors_descriptor(_1a1){
this.interfaceName=_1a1.interfaceName;
this.version=_1a1.version;
};
function __device_sensors_getChannels(){
return this.provider.getChannels();
};
function __device_sensors_setNotifier(_1a2,_1a3,_1a4){
return this.provider.startChannel(_1a2,_1a3,_1a4);
};
function __device_sensors_cancelNotifier(_1a5){
return this.provider.stopChannel(_1a5);
};
function __device_sensors_getScaleFactor(_1a6){
return this.provider.getScaleFactor(_1a6);
};
function __sp_sensors_descriptor(){
this.interfaceName="sensors";
if(window.__Service_Interface_Ver){
this.version=__Service_Interface_Ver;
}else{
this.version=1;
}
};
function __sp_sensors_instance(){
this.descriptor=new __sp_sensors_descriptor();
this.getChannels=__sp_sensors_getChannels;
this.startChannel=__sp_sensors_setNotifier;
this.stopChannel=__sp_sensors_cancelNotifier;
this.getScaleFactor=__sp_sensors_getScaleFactor;
try{
this.so=device.getServiceObject("Service.Sensor","ISensor");
}
catch(e){
this.so=null;
__device_handle_exception(e,"sensors service not available");
}
};
var __rotation_channel={ucb:null,tids:null};
var __XYZ_channel={ucb:null,tids:null};
var __orientation_channel={ucb:null,tids:null};
function __rotation_cb(arg1,arg2,arg3){
if(arg2!=event_cancelled){
var _1aa=null;
if(arg3.ReturnValue){
var time=arg3.ReturnValue.TimeStamp;
var xrot=arg3.ReturnValue.XRotation;
var yrot=arg3.ReturnValue.YRotation;
var zrot=arg3.ReturnValue.ZRotation;
arg3.ReturnValue.close();
_1aa={};
modifyObjectBaseProp(_1aa);
_1aa.timeStamp=time;
_1aa.rotationAboutXAxis=xrot;
_1aa.rotationAboutYAxis=yrot;
_1aa.rotationAboutZAxis=zrot;
}
__rotation_channel.ucb(_1aa);
}
};
function __XYZ_cb(arg1,arg2,arg3){
if(arg2!=event_cancelled){
var _1b2=null;
if(arg3.ReturnValue){
var time=arg3.ReturnValue.TimeStamp;
var _1b4=arg3.ReturnValue.XAxisData;
var _1b5=arg3.ReturnValue.YAxisData;
var _1b6=arg3.ReturnValue.ZAxisData;
arg3.ReturnValue.close();
_1b2={};
modifyObjectBaseProp(_1b2);
_1b2.timeStamp=time;
_1b2.axisX=_1b4;
_1b2.axisY=_1b5;
_1b2.axisZ=_1b6;
}
__XYZ_channel.ucb(_1b2);
}
};
function __orientation_cb(arg1,arg2,arg3){
if(arg2!=event_cancelled){
var _1ba=null;
if(arg3.ReturnValue){
var time=arg3.ReturnValue.TimeStamp;
var _1bc=arg3.ReturnValue.DeviceOrientation;
arg3.ReturnValue.close();
_1ba={};
modifyObjectBaseProp(_1ba);
_1ba.timeStamp=time;
_1ba.deviceOrientation=_1bc;
}
__orientation_channel.ucb(_1ba);
}
};
function __sp_sensors_getChannels(){
return ["Rotation","AccelerometerAxis","Orientation"];
};
function __sp_sensors_setNotifier(_1bd,_1be,_1bf){
var _1c0=new DeviceException(0,"dummy");
if(!_1bd){
throw new DeviceAPIError(_1c0.MISSING_ARG_ERR,"Callback is missing");
}
if((typeof _1bd)!="function"){
throw new DeviceAPIError(_1c0.INVALID_ARG_ERR,"Callback is of invalid type");
}
if(_1bf&&((typeof _1bf)!="function")){
throw new DeviceAPIError(_1c0.INVALID_ARG_ERR,"InValid error Callback");
}
if(!_1be){
throw new DeviceAPIError(_1c0.MISSING_ARG_ERR,"Channel is missing");
}
if((typeof _1be)!="string"){
throw new DeviceAPIError(_1c0.INVALID_ARG_ERR,"Channel is of invalid type");
}
var rval;
var cb;
var _1c3={};
modifyObjectBaseProp(_1c3);
switch(_1be){
case "Rotation":
_1c3.SearchCriterion="Rotation";
cb=__rotation_cb;
__rotation_channel.ucb=_1bd;
break;
case "AccelerometerAxis":
_1c3.SearchCriterion="AccelerometerAxis";
cb=__XYZ_cb;
__XYZ_channel.ucb=_1bd;
break;
case "Orientation":
_1c3.SearchCriterion="Orientation";
cb=__orientation_cb;
__orientation_channel.ucb=_1bd;
break;
default:
throw new DeviceAPIError(_1c0.NOT_SUPPORTED_ERR,"Unsupported input channel");
}
try{
rval=this.so.ISensor.FindSensorChannel(_1c3);
if(_1c3){
delete _1c3.SearchCriterion;
}
if(rval.ErrorCode!=0){
throw new DeviceAPIError(_1c0.NOT_SUPPORTED_ERR,"StartChannel:Operation Failed");
}
var cmap=[];
var _1c5=[];
var _1c6=rval["ReturnValue"];
var _1c7=_1c6.length;
cmap=_1c6[0];
var _1c8={};
modifyObjectBaseProp(_1c8);
_1c8.ListeningType="ChannelData";
_1c8.ChannelInfoMap=cmap;
var _1c9=this.so.ISensor.RegisterForNotification(_1c8,cb);
if(_1c8){
delete _1c8.ChannelInfoMap;
delete _1c8.ListeningType;
}
if(cmap){
delete cmap.index;
}
_1c5[0]=_1c9["TransactionID"];
if(_1c9.ErrorCode!=0){
if(_1c9.ErrorCode==1005){
_1bf(new DeviceAPIError(_1c0.SERVICE_IN_USE_ERR,"Not Allowed Operation"));
return;
}else{
throw new DeviceAPIError(_1c0.NOT_SUPPORTED_ERR,"StartChannel:Operation Failed");
}
}
}
catch(e2){
__device_handle_exception(e2,"__sp_sensors_setNotifier: RegisterForNotification: "+e2);
}
switch(_1be){
case "Rotation":
__rotation_channel.tid=_1c5;
break;
case "AccelerometerAxis":
__XYZ_channel.tid=_1c5;
break;
case "Orientation":
__orientation_channel.tid=_1c5;
break;
}
return _1c5;
};
function __sp_sensors_cancelNotifier(_1ca){
var _1cb=new DeviceException(0,"dummy");
if(!_1ca){
throw new DeviceAPIError(_1cb.MISSING_ARG_ERR,"Channel is missing");
}
if((typeof _1ca)!="string"){
throw new DeviceAPIError(_1cb.INVALID_ARG_ERR,"Channel is of invalid type");
}
var id;
switch(_1ca){
case "Rotation":
id=__rotation_channel.tid;
__rotation_channel.tid=null;
break;
case "AccelerometerAxis":
id=__XYZ_channel.tid;
__XYZ_channel.tid=null;
break;
case "Orientation":
id=__orientation_channel.tid;
__orientation_channel.tid=null;
break;
default:
throw new DeviceAPIError(_1cb.NOT_SUPPORTED_ERR,"Unsupported input channel");
}
if(!id){
throw new DeviceAPIError(_1cb.DATA_NOT_FOUND_ERR,"Stop Channel:Operation Failed");
}
var _1cd={};
modifyObjectBaseProp(_1cd);
for(var i in id){
_1cd.TransactionID=id[i];
try{
var _1cf=this.so.ISensor.Cancel(_1cd);
if(_1cd){
delete _1cd.TransactionID;
}
if(_1cf.ErrorCode!=0){
throw new DeviceAPIError(_1cb.DATA_NOT_FOUND_ERR,"Stop Channel:Operation Failed");
}
}
catch(e1){
__device_handle_exception(e1,"__sp_sensors_cancelNotifier: "+e1);
}
}
};
function __sp_sensors_getScaleFactor(_1d0){
var _1d1=new DeviceException(0,"dummy");
if(!_1d0){
throw new DeviceAPIError(_1d1.MISSING_ARG_ERR,"Channel is missing");
}
if((typeof _1d0)!="string"){
throw new DeviceAPIError(_1d1.INVALID_ARG_ERR,"Channel is of invalid type");
}
if(_1d0!="AccelerometerAxis"){
throw new DeviceAPIError(_1d1.NOT_SUPPORTED_ERR,"Unsupported input channel");
}
try{
var _1d2={};
_1d2.SearchCriterion="AccelerometerAxis";
var rval=this.so.ISensor.FindSensorChannel(_1d2);
if(_1d2){
delete _1d2.SearchCriterion;
}
if(rval.ErrorCode!=0){
throw new DeviceAPIError(_1d1.NOT_SUPPORTED_ERR,"getScaleFactor:Operation Failed");
}
var cmap=[];
var _1d5=rval["ReturnValue"];
cmap=_1d5[0];
var _1d6={};
modifyObjectBaseProp(_1d6);
_1d6.ListeningType="ChannelData";
_1d6.ChannelInfoMap=cmap;
var _1d7=this.so.ISensor.GetScaleFactor(_1d6);
if(_1d6){
delete _1d6.ChannelInfoMap;
delete _1d6.ListeningType;
}
if(cmap){
delete cmap.index;
}
if(_1d7.ErrorCode!=0){
throw new DeviceAPIError(_1d1.NOT_SUPPORTED_ERR,"getScaleFactor:Operation Failed");
}
}
catch(e1){
__device_handle_exception(e1,"__sp_sensors_getScaleFactor: "+e1);
}
return _1d7["ReturnValue"];
};
var __device_sysinfo_service_entry={"name":null,"version":null,"proto":__device_sysinfo,"descriptor":__device_sysinfo_descriptor,"providers":[{"descriptor":__sp_sysinfo_descriptor,"instance":__sp_sysinfo_instance}]};
function __device_sysinfo(_1d8){
this.provider=_1d8;
this.interfaceName=_1d8.descriptor.interfaceName;
this.version=_1d8.descriptor.version;
this.getChannelList=__device_channels_get;
this.getChannel=__device_sysinfo_get;
this.startChannel=__device_sysinfo_setNotifier;
this.stopChannel=__device_sysinfo_cancelNotifier;
this.cancel=__device_sysinfo_cancel;
};
function __device_sysinfo_descriptor(_1d9){
this.interfaceName=_1d9.interfaceName;
this.version=_1d9.version;
};
function __device_channels_get(){
return this.provider.getChannelList();
};
function __device_sysinfo_get(_1da,_1db,_1dc){
return this.provider.getChannel(_1da,_1db,_1dc);
};
function __device_sysinfo_setNotifier(_1dd,_1de,_1df,_1e0){
return this.provider.startChannel(_1dd,_1de,_1df,_1e0);
};
function __device_sysinfo_cancelNotifier(_1e1){
return this.provider.stopChannel(_1e1);
};
function __device_sysinfo_cancel(id){
return this.provider.cancel(id);
};
function __sp_sysinfo_descriptor(){
this.interfaceName="sysinfo";
if(window.__Service_Interface_Ver){
this.version=__Service_Interface_Ver;
}else{
this.version=1;
}
};
function __sp_sysinfo_instance(){
this.descriptor=new __sp_sysinfo_descriptor();
this.getChannelList=__sp_channel_descriptors_get;
this.getChannel=__sp_sysinfo_get;
this.getChannelCb=__sp_sysinfo_get_cb;
this.startChannel=__sp_sysinfo_setNotifier;
this.stopChannel=__sp_sysinfo_cancelNotifier;
this.cancel=__sp_sysinfo_cancel;
this.error=new DeviceException(0,"Dummy");
try{
this.so=device.getServiceObject("Service.SysInfo","ISysInfo");
}
catch(e){
this.so=null;
__device_handle_exception(e,"Sysinfo service not available");
}
};
function __sp_channel_descriptors_get(){
var _1e3=[{name:"Charging",data:[{name:"chargingStatus",range:"true or false",description:"Charging(true) ,Not charging(false)",}],style:["Sync","Oneshot","Notification"]},{name:"BluetoothOn",data:[{name:"btOn",range:"true or false",description:"BluetoothOn(true) ,BluetoothOff(false)",}],style:["Sync","Oneshot","Notification"]},{name:"PhoneLanguage",data:[{name:"phoneLanguage",range:"",description:"",}],style:["Sync","Oneshot"]},{name:"ProductType",data:[{name:"productType",range:"",description:"",}],style:["Sync","Oneshot"]},{name:"FirmwareVersion",data:[{name:"firmwareVersion",range:"",description:"",}],style:["Sync","Oneshot"]},{name:"BatteryLevel",data:[{name:"batteryLevel ",range:"0-100",description:"Percent battery charge"}],style:["Async","Oneshot","Notification"]},{name:"SignalStrength",data:[{name:"signalStrength",range:"0-100",description:"Signal Strength in Percentage"}],style:["Async","Oneshot","Notification"]},{name:"Network",data:[{name:"networkName ",description:"Network name"},{name:"networkStatus",range:"Available,Current,Forbidden",description:""},{name:"networkMode",range:"ModeGsm,ModeCdma,ModeWcdma",description:""},{name:"mobileCountryCode",range:"",description:""},{name:"mobileNetworkCode",range:"",description:""},{name:"locationStatus",range:"True, False",description:""},{name:"areaCode",range:"",description:""},{name:"cellID",range:"",description:""}],style:["Async","Oneshot","Notification"]},{name:"IMEI",data:[{name:"imei",range:"",description:""}],style:["Sync","Oneshot"]},{name:"OutOfMemory",data:[{name:"oomDrive",range:"",description:""}],style:["NA","NA","Notification"]},{name:"DeviceOrientation",data:[{name:"deviceOrientation",range:"Landscape,Portrait",description:""}],style:["Sync","Oneshot"]},{name:"RoamingFlag",data:[{name:"roamingFlag",range:"",description:""}],style:["Sync","Oneshot"]},{name:"DeviceInputMethod",data:[{name:"deviceInputMethod",range:"Touch,NonTouch,Hybrid",description:""}],style:["Sync","Oneshot"]},{name:"HomeNetwork",data:[{name:"networkName ",description:"Network name"},{name:"networkStatus",range:"Available,Current,Forbidden",description:""},{name:"networkMode",range:"ModeGsm,ModeCdma,ModeWcdma",description:""},{name:"mobileCountryCode",range:"",description:""},{name:"mobileNetworkCode",range:"",description:""},{name:"locationStatus",range:"True, False",description:""},{name:"areaCode",range:"",description:""},{name:"cellID",range:"",description:""}],style:["Async","Oneshot","Notification"]}];
return _1e3;
};
var max=110;
var min=40;
var diff=max-min;
function __sp_device_sysinfo_toDecibel(_1e4){
var _1e5=_1e4/100;
var _1e6=max-(_1e5*diff);
_1e6=Math.round(_1e6);
return _1e6;
};
function __sp_device_sysinfo_toPercentage(_1e7){
if(_1e7==0){
return _1e7;
}else{
var _1e8=max-_1e7;
var _1e9=_1e8/diff;
_1e9*=100;
_1e9=Math.round(_1e9);
return _1e9;
}
};
function __sp_device_sysinfo_toBool(_1ea){
if(_1ea==0){
return false;
}else{
return true;
}
};
function mappingVerification_sysinfo(_1eb){
if(_1eb===1016||_1eb===1012||_1eb===1010||_1eb===1009||_1eb===1005||_1eb===1000||_1eb===1011||_1eb===1007||_1eb===1003||_1eb===1002||_1eb===1004){
return true;
}else{
return false;
}
};
function __sp_device_sysinfo_extract(_1ec){
var _1ed=_1ec.Key;
var _1ee={};
modifyObjectBaseProp(_1ee);
try{
switch(_1ed){
case "ChargingStatus":
_1ee.chargingStatus=__sp_device_sysinfo_toBool(_1ec.Status);
break;
case "BatteryStrength":
_1ee.batteryLevel=_1ec.Status;
break;
case "SignalStrength":
_1ee.signalStrength=__sp_device_sysinfo_toPercentage(_1ec.Status);
break;
case "CurrentNetwork":
var _1ef;
var mode;
switch(_1ec.NetworkStatus){
case 0:
_1ef="Available";
break;
case 1:
_1ef="Current";
break;
case 2:
_1ef="Forbidden";
break;
default:
_1ef="Unknown";
break;
}
switch(_1ec.NetworkMode){
case 1:
mode="ModeGsm";
break;
case 3:
case 4:
mode="ModeCdma";
break;
case 5:
mode="ModeWcdma";
break;
default:
mode="Unknown";
break;
}
_1ee.networkName=_1ec.NetworkName;
_1ee.networkStatus=_1ef;
_1ee.networkMode=mode;
_1ee.mobileCountryCode=_1ec.CountryCode;
_1ee.mobileNetworkCode=_1ec.NetworkCode;
_1ee.locationStatus=_1ec.LocationStatus;
_1ee.areaCode=_1ec.AreaCode;
_1ee.cellID=_1ec.CellId;
break;
case "DisplayLanguage":
_1ee.phoneLanguage=_1ec.StringData;
break;
case "BlueTooth":
_1ee.btOn=__sp_device_sysinfo_toBool(_1ec.Status);
break;
case "ProductType":
_1ee.productType=_1ec.StringData;
break;
case "FirmwareVersion":
_1ee.firmwareVersion=_1ec.StringData;
break;
case "DeviceInputMethod":
_1ee.deviceInputMethod=_1ec.StringData;
break;
default:
_1ee=_1ec;
break;
}
return _1ee;
}
catch(e){
__device_handle_exception(e,"__sp_device_sysinfo_extract: "+e);
}
};
function __sp_sysinfo_get_cb(arg1,arg2,arg3){
var _1f4;
var _1f5;
var _1f6;
_1f6=glob_obj.getFromArray(arg1);
if(_1f6){
_1f4=_1f6.success_cb;
_1f5=_1f6.error_cb;
}else{
alert("Sysinfo: __sp_sysinfo_get_cb: Callback not found ");
return;
}
var op=null;
if(arg3.ErrorCode!=0){
var _1f8=splitErrorMessage(arg3.ErrorMessage);
_1f5(new DeviceException(MapErrorCode[arg3.ErrorCode],"SysInfo:getChannel: "+_1f8));
}else{
if(arg3.ReturnValue){
op=__sp_device_sysinfo_extract(arg3.ReturnValue);
arg3.ReturnValue.close();
_1f4(op);
}
}
glob_obj.removeFromArray(arg1);
};
function __sp_sysinfo_get(_1f9,_1fa,_1fb){
var so;
var rval;
var _1fe=false;
var _1ff="Status";
var _200;
var _201={};
modifyObjectBaseProp(_201);
try{
switch(_1f9){
case "Charging":
_201.Entity="Battery";
_201.Key="ChargingStatus";
break;
case "BatteryLevel":
_201.Entity="Battery";
_201.Key="BatteryStrength";
_1fe=true;
break;
case "SignalStrength":
_201.Entity="Network";
_201.Key="SignalStrength";
_1fe=true;
break;
case "Network":
_201.Entity="Network";
_201.Key="CurrentNetwork";
_1fe=true;
break;
case "PhoneLanguage":
_201.Entity="General";
_201.Key="DisplayLanguage";
break;
case "BluetoothOn":
_201.Entity="Connectivity";
_201.Key="BlueTooth";
break;
case "ProductType":
_201.Entity="Device";
_201.Key="ProductType";
break;
case "FirmwareVersion":
_201.Entity="Device";
_201.Key="FirmwareVersion";
break;
case "DeviceInputMethod":
_201.Entity="Device";
_201.Key="DeviceInputMethod";
break;
default:
if(_1f9==null){
throw new DeviceException(this.error.MISSING_ARG_ERR,"SysInfo:getChannel:channel is missing");
}else{
if(typeof _1f9!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"SysInfo:getChannel:channel is of invalid type");
}else{
throw new DeviceException(this.error.INVALID_ARG_ERR,"SysInfo:getChannel:channel is invalid");
}
}
}
if(_1fe){
if(_1fa==null){
throw new DeviceException(this.error.MISSING_ARG_ERR,"SysInfo:getChannel:callback is missing");
}
if(typeof _1fa!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"SysInfo:getChannel:callback is invalid");
}
if(_1fb){
if(typeof (_1fb)!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"SysInfo:getChannel: ErrorCallback is invalid");
}
}
temp_scb=_1fa;
temp_ecb=_1fb;
rval=this.so.ISysInfo.GetInfo(_201,this.getChannelCb);
if(rval.TransactionID){
glob_obj.addToGlobalArray(rval.TransactionID,_1fa,_1fb);
}
if(rval.ErrorCode!=0){
var _202=mappingVerification_sysinfo(rval.ErrorCode);
if(_202){
switch(MapErrorCode[rval.ErrorCode]){
case this.error.MISSING_ARG_ERR:
case this.error.INVALID_ARG_ERR:
if(rval.ErrorMessage){
var _203=splitErrorMessage(rval.ErrorMessage);
throw new DeviceException(MapErrorCode[rval.ErrorCode],"SysInfo: getChannel: "+_203);
}else{
throw new DeviceException(MapErrorCode[rval.ErrorCode],"SysInfo:getChannel:Operation Failed");
}
break;
default:
_1fa(0);
}
}else{
_1fa(0);
}
}
return rval.TransactionID;
}else{
rval=this.so.ISysInfo.GetInfo(_201);
if(rval.ErrorCode!=0){
if(rval.ErrorMessage){
var _204=splitErrorMessage(rval.ErrorMessage);
throw new DeviceException(MapErrorCode[rval.ErrorCode],"SysInfo: getChannel: "+_204);
}else{
throw new DeviceException(MapErrorCode[rval.ErrorCode],"SysInfo:getChannel:Operation Failed");
}
}
_200=__sp_device_sysinfo_extract(rval.ReturnValue);
return _200;
}
delete _201;
}
catch(e){
__device_handle_exception(e,"__sp_sysinfo_get: getChannel: "+e);
}
};
var __cell_id_channel={scb:null,ecb:null,cancel_id:null};
function __cell_id_channel_cb(arg1,arg2,arg3){
var op=null;
if(arg3.ErrorCode){
__cell_id_channel.ecb(arg3.ErrorCode);
}else{
if(arg3.ReturnValue){
op=arg3.ReturnValue;
arg3.ReturnValue.close();
__cell_id_channel.scb(op);
}
}
};
var __charging_status_channel={scb:null,ecb:null,cancel_id:null};
function __charging_status_channel_cb(arg1,arg2,arg3){
var op=null;
if(arg3.ErrorCode){
__charging_status_channel.ecb(arg3.ErrorCode);
}else{
if(arg3.ReturnValue){
op=__sp_device_sysinfo_extract(arg3.ReturnValue);
arg3.ReturnValue.close();
__charging_status_channel.scb(op);
}
}
};
var __net_coverage_channel={scb:null,ecb:null,cancel_id:null};
function __net_coverage_channel_cb(arg1,arg2,arg3){
var op=null;
if(arg3.ErrorCode){
__net_coverage_channel.ecb(arg3.ErrorCode);
}else{
if(arg3.ReturnValue){
op=__sp_device_sysinfo_extract(arg3.ReturnValue);
arg3.ReturnValue.close();
__net_coverage_channel.scb(op);
}
}
};
var __battery_level_channel={scb:null,ecb:null,cancel_id:null};
function __battery_level_channel_cb(arg1,arg2,arg3){
var op=null;
if(arg3.ErrorCode){
__battery_level_channel.ecb(arg3.ErrorCode);
}else{
if(arg3.ReturnValue){
op=__sp_device_sysinfo_extract(arg3.ReturnValue);
arg3.ReturnValue.close();
__battery_level_channel.scb(op);
}
}
};
var __bluetooth_on_channel={scb:null,ecb:null,cancel_id:null};
function __bluetooth_on_channel_cb(arg1,arg2,arg3){
var op=null;
if(arg3.ErrorCode){
__bluetooth_on_channel.ecb(arg3.ErrorCode);
}else{
if(arg3.ReturnValue){
op=__sp_device_sysinfo_extract(arg3.ReturnValue);
arg3.ReturnValue.close();
__bluetooth_on_channel.scb(op);
}
}
};
var __signal_channel={scb:null,ecb:null,cancel_id:null};
function __signal_channel_cb(arg1,arg2,arg3){
var op=null;
if(arg3.ErrorCode){
__signal_channel.ecb(arg3.ErrorCode);
}else{
if(arg3.ReturnValue){
op=__sp_device_sysinfo_extract(arg3.ReturnValue);
arg3.ReturnValue.close();
__signal_channel.scb(op);
}
}
};
function __sp_sysinfo_setNotifier(_21d,_21e,_21f,_220){
var rval;
var _222=null;
var cb=null;
var _224={};
if(_21d==null){
throw new DeviceException(this.error.MISSING_ARG_ERR,"SysInfo:startChannel:callback is missing");
}
if(typeof _21d!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"SysInfo:startChannel:callback is invalid");
}
modifyObjectBaseProp(_224);
try{
switch(_21e){
case "Charging":
_224.Entity="Battery";
_224.Key="ChargingStatus";
_222=__charging_status_channel;
cb=__charging_status_channel_cb;
break;
case "Network":
_224.Entity="Network";
_224.Key="CurrentNetwork";
_222=__net_coverage_channel;
cb=__net_coverage_channel_cb;
break;
case "BatteryLevel":
_224.Entity="Battery";
_224.Key="BatteryStrength";
_224.SystemData={};
modifyObjectBaseProp(_224.SystemData);
if(_21f==null){
_21f=50;
}
if(!(_21f>=0&&_21f<=100)){
throw new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"SysInfo:startChannel:trigger is out of range");
}
if(typeof _21f!="number"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"SysInfo:startChannel:trigger is of  invalid type");
}
_224.SystemData.Status=_21f;
_222=__battery_level_channel;
cb=__battery_level_channel_cb;
break;
case "SignalStrength":
_224.Entity="Network";
_224.Key="SignalStrength";
_224.SystemData={};
modifyObjectBaseProp(_224.SystemData);
if(_21f!=null){
if(!(_21f>=0&&_21f<=100)){
throw new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"SysInfo:startChannel:trigger is out of range");
}
if(typeof _21f!="number"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"SysInfo:startChannel:trigger is of invalid type");
}
_224.SystemData.Status=__sp_device_sysinfo_toDecibel(_21f);
}
_222=__signal_channel;
cb=__signal_channel_cb;
break;
case "BluetoothOn":
_224.Entity="Connectivity";
_224.Key="BlueTooth";
_222=__bluetooth_on_channel;
cb=__bluetooth_on_channel_cb;
break;
default:
var _225;
if(_21e==null){
throw new DeviceException(this.error.MISSING_ARG_ERR,"SysInfo:startChannel:channel is missing");
}else{
if(typeof _21e!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"SysInfo:startChannel:channel is of invalid type");
}else{
throw new DeviceException(this.error.INVALID_ARG_ERR,"SysInfo:startChannel:channel is invalid");
}
}
if(_224.SystemData){
delete _224.SystemData;
}
}
_222.scb=_21d;
_222.ecb=_220;
if(_222.ecb){
if(typeof (_222.ecb)!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"SysInfo:startChannel: ErrorCallback is invalid");
}
}
if(_222.cancel_id){
var _226={};
modifyObjectBaseProp(_226);
_226.TransactionID=_222.cancel_id;
this.so.ISysInfo.Cancel(_226);
_222.cancel_id=null;
delete _226;
}
temp_scb=_21d;
temp_ecb=_220;
rval=this.so.ISysInfo.GetNotification(_224,cb);
delete _224;
if(rval.ErrorCode!=0){
switch(MapErrorCode[rval.ErrorCode]){
case this.error.MISSING_ARG_ERR:
case this.error.INVALID_ARG_ERR:
if(rval.ErrorMessage){
var _227=splitErrorMessage(rval.ErrorMessage);
throw new DeviceException(MapErrorCode[rval.ErrorCode],"SysInfo: startChannel: "+_227);
}else{
throw new DeviceException(MapErrorCode[rval.ErrorCode],"SysInfo:startChannel:Operation Failed");
}
break;
default:
_21d(0);
}
}
_222.cancel_id=rval.TransactionID;
return _222.cancel_id;
}
catch(e){
__device_handle_exception(e,"__sp_sysinfo_startChannel: "+e);
}
};
function __sp_sysinfo_cancelNotifier(_228){
try{
switch(_228){
case "CellId":
channel=__cell_id_channel;
break;
case "Charging":
channel=__charging_status_channel;
break;
case "Network":
channel=__net_coverage_channel;
break;
case "BatteryLevel":
channel=__battery_level_channel;
break;
case "SignalStrength":
channel=__signal_channel;
break;
case "BluetoothOn":
channel=__bluetooth_on_channel;
break;
default:
var _229;
if(_228==null){
throw new DeviceException(this.error.MISSING_ARG_ERR,"SysInfo:stopChannel:channel is missing");
}else{
if(typeof _228!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"SysInfo:stopChannel:channel is of invalid type");
}else{
throw new DeviceException(this.error.INVALID_ARG_ERR,"SysInfo:stopChannel:channel is invalid");
}
}
}
if(channel.cancel_id){
var _22a={};
modifyObjectBaseProp(_22a);
_22a.TransactionID=channel.cancel_id;
var _22b=this.so.ISysInfo.Cancel(_22a);
delete _22a;
if(_22b.ErrorCode!=0){
if(_22b.ErrorMessage){
var _22c=splitErrorMessage(_22b.ErrorMessage);
throw new DeviceException(MapErrorCode[_22b.ErrorCode],"SysInfo: stopChannel: "+_22c);
}else{
throw new DeviceException(MapErrorCode[_22b.ErrorCode],"SysInfo:stopChannel:Operation Failed");
}
}
channel.cancel_id=null;
}else{
throw new DeviceException(this.error.DATA_NOT_FOUND_ERR,"SysInfo:stopChannel:channel not started");
}
}
catch(e){
__device_handle_exception(e,"__sp_sysinfo_stopChannel: "+e);
}
};
function __sp_sysinfo_cancel(_22d){
try{
var _22e=0;
if(_22d==null){
throw new DeviceException(this.error.MISSING_ARG_ERR,"SysInfo:cancel:Id is missing");
}
if(typeof _22d!="number"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"SysInfo:cancel:Id is of invalid type");
}
if(_22d==__charging_status_channel.cancel_id||_22d==__net_coverage_channel.cancel_id||_22d==__battery_level_channel.cancel_id||_22d==__bluetooth_on_channel.cancel_id||_22d==__signal_channel.cancel_id){
_22e=1;
}
if(_22e!=1){
var _22f={TransactionID:_22d};
var _230=this.so.ISysInfo.Cancel(_22f);
if(_230.ErrorCode!=0){
if(_230.ErrorMessage){
var _231=splitErrorMessage(_230.ErrorMessage);
throw new DeviceException(this.error.INVALID_ARG_ERR,"SysInfo:cancel: "+_231);
}else{
throw new DeviceException(MapErrorCode[_230.ErrorCode],"SysInfo:cancel:Operation Failed");
}
}
}else{
_22e=0;
throw new DeviceException(this.error.NOT_ALLOWED_ERR,"SysInfo:cancel:Cannot Cancel a channel started using startChannel ");
}
}
catch(e){
__device_handle_exception(e,"__sp_sysinfo_cancel: "+e);
}
};
function __device_camera_descriptor(_232){
this.interfaceName=_232.interfaceName;
this.version=_232.version;
};
function __device_camera_startCamera(_233,_234){
return this.provider.startCamera(_233,_234);
};
function __device_camera_stopViewfinder(){
this.provider.stopViewfinder();
};
function __device_camera_takePicture(_235){
this.provider.takePicture(_235);
};
function __device_camera(_236){
this.provider=_236;
this.interfaceName=_236.descriptor.interfaceName;
this.version=_236.descriptor.version;
this.supportedMediaTypes=_236.supportedMediaTypes;
this.supportedSizes=_236.supportedSizes;
this.startCamera=__device_camera_startCamera;
this.stopViewfinder=__device_camera_stopViewfinder;
this.takePicture=__device_camera_takePicture;
};
var __device_camera_service_entry={"name":null,"version":null,"proto":__device_camera,"descriptor":__device_camera_descriptor,"providers":[{"descriptor":__sp_camera_descriptor,"instance":__sp_camera_instance}]};
function __sp_camera_descriptor(){
this.interfaceName="camera";
if(window.__Service_Interface_Ver){
this.version=__Service_Interface_Ver;
}else{
this.version=1;
}
};
var __sp_camera_start_date;
var CAMERA_APP_ID=270501242;
function __sp_startCamera(_237,_238){
if(_237==null){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Camera:startCamera:callback is missing");
}
if(_237==undefined){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Camera:startCamera:callback is a non-function");
}
if(typeof (_237)!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Camera:startCamera:callback is a non-function");
}
if(_238){
if(typeof _238!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Camera:startCamera:callback is invalid");
}
}
var _239=function(){
var _23a=function(arg1,arg2,arg3){
var it=arg3.ReturnValue;
var item;
var _240=[];
if(arg3.ErrorCode!=0){
_238(new DeviceException(arg3.ErrorCode,"Camera:startCamera: Operation Failed"));
return;
}
if((item=it.getNext())!=undefined){
var d=new Date(Date.parse(item.FileDate));
if(d>__sp_camera_start_date){
var _242={};
modifyObjectBaseProp(_242);
var _243=item.FileNameAndPath.replace(/\\/g,"/");
var _244="file:///";
var _245="";
_245=_245.concat(_244,_243);
_242.uri=_245;
var _246={};
_246.height=item.XPixels;
_246.width=item.YPixels;
_246.type=item.MimeType;
_242.format=_246;
_240.unshift(_242);
if(_246){
}
}
}
var _247=0;
var _248=0;
_237(_240);
};
try{
var mso=device.getServiceObject("Service.MediaManagement","IDataSource");
}
catch(e){
__device_handle_exception(e,"media service not available : "+e);
}
var _24a={};
modifyObjectBaseProp(_24a);
_24a.Type="FileInfo";
_24a.Filter={};
modifyObjectBaseProp(_24a.Filter);
_24a.Filter.FileType="Image";
_24a.Sort={};
modifyObjectBaseProp(_24a.Sort);
_24a.Sort.Key="FileDate";
_24a.Sort.Order="Descending";
try{
var rval=mso.IDataSource.GetList(_24a,_23a);
}
catch(error){
__device_handle_exception(error,"media service GetList failed: "+error);
}
};
__sp_camera_start_date=new Date();
__s60_start_and_wait(CAMERA_APP_ID,"",_239);
var _24c=0;
return _24c;
};
function __sp_supportedSizes(){
try{
var _24d=device.getServiceObject("Service.SysInfo","ISysInfo");
}
catch(e){
__device_handle_exception(e,"SysInfo Service not available : "+e);
}
var _24e={};
modifyObjectBaseProp(_24e);
_24e.Entity="Camera";
_24e.Key="CameraProperties";
try{
var rval=_24d.ISysInfo.GetInfo(_24e);
if(_24e){
delete _24e.Entity;
delete _24e.Key;
}
}
catch(error){
__device_handle_exception(error,"Camera : Failed to fetch supported size Info: "+error);
}
var _250=rval.ReturnValue;
var _251=[];
var _252=[];
_251=_250.ResolutionList;
for(var i=0;i<_251.length;i++){
var _254="";
_254=_254.concat(_251[i].height,"X",_251[i].width);
_252.push(_254);
}
return _252;
};
function __sp_supportedMediaTypes(){
try{
var _255=device.getServiceObject("Service.SysInfo","ISysInfo");
}
catch(e){
__device_handle_exception(e,"SysInfo Service not available : "+e);
}
var _256={};
modifyObjectBaseProp(_256);
_256.Entity="Camera";
_256.Key="CameraProperties";
try{
var rval=_255.ISysInfo.GetInfo(_256);
if(_256){
delete _256.Entity;
delete _256.Key;
}
}
catch(error){
__device_handle_exception(error,"Camera :Failed to fetch supported media type Info: "+error);
}
var _258=rval.ReturnValue;
var _259=[];
_259=_258.MimeTypeList;
return _259;
};
function __sp_camera_instance(){
this.descriptor=new __sp_camera_descriptor();
this.supportedMediaTypes=__sp_supportedMediaTypes();
this.supportedSizes=__sp_supportedSizes();
this.startCamera=__sp_startCamera;
this.stopViewfinder=__s60_api_not_supported;
this.takePicture=__s60_api_not_supported;
this.error=new DeviceException(0,"Dummy");
};
var _infinity=Infinity;
function TransIdCbMap(){
this.TransactionID=null;
this.success_callback=null;
this.error_callback=null;
};
function __device_geolocation_descriptor(_25a){
this.interfaceName=_25a.interfaceName;
this.version=_25a.version;
};
function __device_geolocation_getCurrentPosition(_25b,_25c,_25d){
return this.provider.getLocation(_25b,_25c,_25d);
};
function __device_geolocation_watchPosition(_25e,_25f,_260){
return this.provider.traceLocation(_25e,_25f,_260);
};
function __device_geolocation_clearWatch(_261){
this.provider.clearTrace(_261);
};
function __device_geolocation(_262){
this.provider=_262;
this.interfaceName=_262.descriptor.interfaceName;
this.version=_262.descriptor.version;
this.getCurrentPosition=__device_geolocation_getCurrentPosition;
this.watchPosition=__device_geolocation_watchPosition;
this.clearWatch=__device_geolocation_clearWatch;
};
var __device_geolocation_service_entry={"name":null,"version":null,"proto":__device_geolocation,"descriptor":__device_geolocation_descriptor,"providers":[{"descriptor":__sp_location_descriptor,"instance":__sp_location_instance}]};
function Location_PositionError(){
this.UNKNOWN_ERROR=0;
this.PERMISSION_DENIED=1;
this.POSITION_UNAVAILABLE=2;
this.TIMEOUT=3;
this.code;
this.message;
};
function Location_Coordinates(){
this.latitude=null;
this.longitude=null;
this.altitude=null;
this.accuracy=null;
this.altitudeAccuracy=null;
this.heading=null;
this.speed=null;
};
function Location_Position(){
this.coords=null;
this.timestamp=null;
};
function Location_PositionOptions(){
this.enableHighAccuracy;
this.timeout;
this.maximumAge;
};
function getGeoLocationPosition(_263){
var _264=new Location_Coordinates();
_264.longitude=(_263.Longitude==undefined)?null:_263.Longitude;
_264.latitude=(_263.Latitude==undefined)?null:_263.Latitude;
_264.altitude=(_263.Altitude==undefined)?null:_263.Altitude;
_264.accuracy=(_263.HorizontalAccuracy==undefined)?null:_263.HorizontalAccuracy;
_264.altitudeAccuracy=(_263.VerticalAccuracy==undefined)?null:_263.VerticalAccuracy;
_264.heading=(_263.Heading==undefined)?null:_263.Heading;
_264.speed=(_263.HorizontalSpeed==undefined)?null:_263.HorizontalSpeed;
var _265=new Location_Position();
_265.coords={};
modifyObjectBaseProp(_265.coords);
_265.coords=_264;
_265.timestamp=(_263.timestamp==undefined)?null:_263.timestamp;
return _265;
};
var __sp_location_trace_transactionId=-1;
function __sp_location_handle_error(_266,_267,_268){
if((_266!=undefined)&&(typeof _266=="function")&&(_266!=null)){
var _269=new Location_PositionError();
if((-21)==_267){
_269.code=_269.PERMISSION_DENIED;
_269.message="permission denied";
}else{
if((-33)==_267){
_269.code=_269.TIMEOUT;
_269.message="request timed out";
}else{
_269.code=_269.UNKNOWN_ERROR;
_269.message="UnKnown Error";
}
}
_266(_269);
}else{
var _269=new Location_PositionError();
_269.code=_269.UNKNOWN_ERROR;
_269.message="UnKnown Error";
throw _269;
}
};
function __sp_location_descriptor(){
this.interfaceName="geolocation";
if(window.__Service_Interface_Ver){
this.version=__Service_Interface_Ver;
}else{
this.version=1;
}
};
var obj;
function __sp_getLocation_cb(arg1,arg2,arg3){
var _26d;
_26d=glob_obj.getFromArray(arg1);
if(_26d){
success_cb1=_26d.success_cb;
error_cb=_26d.error_cb;
}else{
return;
}
if(arg3.ErrorCode){
__sp_location_handle_error(error_cb,arg3.ErrorCode,arg3.ErrorMessage);
return;
}else{
var _26e=getGeoLocationPosition(arg3.ReturnValue);
success_cb1(_26e);
delete _26e;
}
glob_obj.removeFromArray(arg1);
};
function __sp_getLocation(_26f,_270,_271){
if((_26f==undefined)||(_26f==null)||(typeof (_26f)!="function")){
var _272="Wrong callback type";
__sp_location_handle_error(_270,0,_272);
}
if((_270!=undefined)){
if((_270!=null)&&(_270!="")&&(typeof (_270)!="function")){
var _273=new Location_PositionError();
_273.code=-1;
throw _273;
}
}
var _274;
var _275={};
modifyObjectBaseProp(_275);
_275.LocationInformationClass="GenericLocationInfo";
var _276={};
modifyObjectBaseProp(_276);
_276.UpdateInterval=0;
if(_271!=undefined&&_271!=null){
if((typeof (_271)!="object")){
var _277="Wrong posOptions type";
__sp_location_handle_error(_270,0,_277);
return;
}
}
if(_271!=undefined){
if(_271.maximumAge!=undefined){
if(_271.maximumAge){
if((_271.maximumAge==Infinity)){
if((_271.enableHighAccuracy==undefined)||(typeof (_271.enableHighAccuracy)=="boolean")){
var arg3=this.so.ILocation.GetLastPosition();
if(arg3.ErrorCode<0){
var _277="Invalid input type";
__sp_location_handle_error(_270,0,_277);
return;
}
var _279=getGeoLocationPosition(arg3.ReturnValue);
success_cb1(_279);
return;
}
}
if(!(isNaN(parseInt(_271.maximumAge)))){
if((_271.maximumAge==0)){
var _277="Invalid input type";
__sp_location_handle_error(_270,0,_277);
return;
}
_276.UpdateMaxAge=_271.maximumAge*1000;
}else{
var _277="Invalid input type";
__sp_location_handle_error(_270,0,_277);
return;
}
}else{
if((_271.maximumAge==null)||(_271.maximumAge=="")){
}
}
}
if((_271.enableHighAccuracy!==undefined)){
if(_271.enableHighAccuracy==true){
_275.EnableHighAccuracy=_271.enableHighAccuracy;
}else{
if(_271.enableHighAccuracy==false){
_275.EnableHighAccuracy=_271.enableHighAccuracy;
}else{
if((_271.enableHighAccuracy==null)||(_271.enableHighAccuracy=="")){
}else{
if((typeof (_271.enableHighAccuracy)!="boolean")){
var _27a="Wrong value for enableHighAccuracy param";
__sp_location_handle_error(_270,0,_27a);
return;
}
}
}
}
}
if(_271.timeout!==undefined){
if((_271.timeout!==null)||((_271.timeout!==""))){
if((_271.timeout==Infinity)){
var _277="Invalid input type";
__sp_location_handle_error(_270,0,_277);
return;
}else{
if(!(isNaN(parseInt(_271.timeout)))){
if((_271.timeout<=2147483647)){
if((_271.timeout==0)){
var _277="Data out of range";
__sp_location_handle_error(_270,0,_277);
return;
}
_276.UpdateTimeOut=_271.timeout*1000;
}else{
var _277="Invalid input type";
__sp_location_handle_error(_270,0,_277);
return;
}
}
}
}else{
if((_271.timeout===null)||((_271.timeout===""))){
}else{
var _277="Invalid input type";
__sp_location_handle_error(_270,0,_277);
return;
}
}
}
}
_276.PartialUpdates=false;
_275.Updateoptions=_276;
try{
temp_scb=_26f;
temp_ecb=_270;
var rval=this.so.ILocation.GetLocation(_275,this.getLocationCb);
if(rval.TransactionID){
glob_obj.addToGlobalArray(rval.TransactionID,_26f,_270);
}
delete _276;
delete _275;
if(rval.ErrorCode!=0){
__sp_location_handle_error(_270,rval.ErrorCode,rval.ErrorMessage);
return;
}
}
catch(e){
__device_handle_exception(e,"__sp_getLocation: "+e);
}
};
var __sp_location_trace_ucb=null;
var __sp_location_fail_cb=null;
function __sp_traceLocation_cb(arg1,arg2,arg3){
var _27f;
_27f=glob_obj.getFromArray(arg1);
if(_27f){
success_cb=_27f.success_cb;
error_cb=_27f.error_cb;
}else{
return;
}
if(arg3.ErrorCode){
__sp_location_handle_error(error_cb,arg3.ErrorCode,arg3.ErrorMessage);
}else{
var _280=getGeoLocationPosition(arg3.ReturnValue);
success_cb(_280);
return;
}
glob_obj.removeFromArray(arg1);
};
function __sp_traceLocation(_281,_282,_283){
if((_281==undefined)||(_281==null)||(typeof (_281)!="function")){
var _284="Wrong callback type";
__sp_location_handle_error(_282,0,_284);
return;
}
if((typeof _281!="function")){
var _284="Wrong callback type";
__sp_location_handle_error(_282,0,_284);
return;
}
if((_282)){
if((_282!=null)&&(_282!="")&&(typeof (_282)!="function")){
var _285=new Location_PositionError();
_285.code=-1;
throw _285;
}
}
var _286=this;
var _287={};
modifyObjectBaseProp(_287);
_287.UpdateInterval=0;
var _288={};
modifyObjectBaseProp(_288);
_288.LocationInformationClass="GenericLocationInfo";
if(_283!=undefined&&_283!=null){
if((typeof (_283)!="object")){
var _284="Wrong posOptions type";
__sp_location_handle_error(_282,0,_284);
return;
}
}
if(_283!=undefined){
if((_283.enableHighAccuracy!==undefined)){
if(_283.enableHighAccuracy==true){
_288.EnableHighAccuracy=_283.enableHighAccuracy;
}else{
if(_283.enableHighAccuracy==false){
_288.EnableHighAccuracy=_283.enableHighAccuracy;
}else{
if((_283.enableHighAccuracy==null)||(_283.enableHighAccuracy=="")){
}else{
if((typeof (_283.enableHighAccuracy)!="boolean")){
var _289="Wrong value for enableHighAccuracy param";
__sp_location_handle_error(_282,0,_289);
return;
}
}
}
}
}
if(_283.timeout!==undefined){
if((_283.timeout!==null)||((_283.timeout!==""))){
if((_283.timeout==Infinity)){
var _284="Invalid input type";
__sp_location_handle_error(_282,0,_284);
return;
}else{
if(!(isNaN(parseInt(_283.timeout)))){
if((_283.timeout==0)){
var _284="Invalid input type";
__sp_location_handle_error(_282,0,_284);
return;
}
_287.UpdateTimeOut=_283.timeout*1000;
}
}
}else{
if((_283.timeout===null)||((_283.timeout===""))){
}else{
var _284="Invalid input type";
__sp_location_handle_error(_282,0,_284);
return;
}
}
}
if(typeof _283.maximumAge!="undefined"){
if(_283.maximumAge==_infinity){
_287.UpdateTimeOut=0;
_287.UpdateMaxAge=2147483647;
}else{
if(!(isNaN(parseInt(_283.maximumAge)))){
_287.UpdateMaxAge=_283.maximumAge*1000;
}else{
if((_283.maximumAge===null)||((_283.maximumAge===""))){
}else{
var _284="Invalid input type";
__sp_location_handle_error(_282,0,_284);
return;
}
}
}
}
}
_287.PartialUpdates=false;
_288.Updateoptions=_287;
try{
temp_scb=_281;
temp_ecb=_282;
var rval=this.so.ILocation.Trace(_288,this.traceCb);
if(rval.TransactionID){
glob_obj.addToGlobalArray(rval.TransactionID,_281,_282);
}
delete _287;
delete _288;
if(rval.ErrorCode!=0){
__sp_location_handle_error(_282,rval.ErrorCode,rval.ErrorMessage);
return;
}
return rval.TransactionID;
}
catch(e){
__device_handle_exception(e,"__sp_traceLocation: "+e);
}
};
function __sp_clearTrace(_28b){
if(typeof _28b!="number"){
var _28c="Invalid input type";
__sp_location_handle_error(fail_cb,0,_28c);
}
var _28d={TransactionID:_28b};
try{
var _28e=this.so.ILocation.Cancel(_28d);
}
catch(e){
__device_handle_exception(e,"__sp_clearTrace: "+e);
}
};
function __sp_location_instance(){
this.descriptor=new __sp_location_descriptor();
this.getLocation=__sp_getLocation;
this.getLocationCb=__sp_getLocation_cb;
this.traceLocation=__sp_traceLocation;
this.traceCb=__sp_traceLocation_cb;
this.clearTrace=__sp_clearTrace;
try{
this.so=device.getServiceObject("Service.Location","ILocation");
}
catch(e){
this.so=null;
__device_handle_exception(e,"Location service not available");
}
};
function __device_commlog_descriptor(_28f){
this.interfaceName=_28f.interfaceName;
this.version=_28f.version;
};
function __device_commlog_getList(_290,_291,_292){
return this.provider.getList(_290,_291,_292);
};
function __device_commlog_setNotification(_293,_294){
return this.provider.setNotification(_293,_294);
};
function __device_commlog_cancelNotification(){
return this.provider.cancelNotification();
};
function __device_commlog_cancel(_295){
return this.provider.cancel(_295);
};
function __device_commlog_deleteLogEntry(_296){
return this.provider.deleteLogEntry(_296);
};
function __device_commlog(_297){
this.provider=_297;
this.interfaceName=_297.descriptor.interfaceName;
this.version=_297.descriptor.version;
this.getList=__device_commlog_getList;
this.setNotification=__device_commlog_setNotification;
this.cancelNotification=__device_commlog_cancelNotification;
this.cancel=__device_commlog_cancel;
this.deleteLogEntry=__device_commlog_deleteLogEntry;
};
var __device_commlog_service_entry={"name":null,"version":null,"proto":__device_commlog,"descriptor":__device_commlog_descriptor,"providers":[{"descriptor":__sp_commlog_descriptor,"instance":__sp_commlog_instance}]};
var invoker_notification;
function __sp_commlog_descriptor(){
this.interfaceName="commlog";
if(window.__Service_Interface_Ver){
this.version=__Service_Interface_Ver;
}else{
this.version=1;
}
};
var __sp_commlog_type_constants={"call":0,"sms":3};
var __sp_commlog_constants={"received":0,"missed":5,"outgoing":1};
var __sp_commlog_constants_output={"Received":0,"Missed":5,"Outgoing":1};
var __notifArr=new Array();
var __notifCount=0;
__Notification.prototype=new Object();
__Notification.prototype.constructor=__Notification;
function __Notification(_298,_299){
this.connectionId=_298;
this.callback=_299;
};
var __nofLogs;
function __get_const_string(def,val){
var i;
for(i in def){
if(def[i]==val){
return i;
}
}
return null;
};
function __get_const_val(def,str){
if(def[str]!=undefined){
return def[str];
}
return null;
};
function __device_commlog_item(_29f){
if(!_29f){
return null;
}
var evt={};
evt.type=__get_const_string(__sp_commlog_type_constants,_29f.EventType);
if(evt.type==null||evt.type==undefined){
return null;
}
evt.phoneNumber=_29f.PhoneNumber;
if(evt.phoneNumber==null||evt.phoneNumber==undefined||evt.phoneNumber.length==0){
evt.phoneNumber="private number";
}
evt.time=_29f.EventTime;
evt.flag=(_29f.Direction==undefined)?null:__get_const_string(__sp_commlog_constants_output,_29f.Direction);
evt.summary=_29f.Description;
evt.logId=Number(_29f.id);
evt.contactName=_29f.RemoteParty;
if(!evt.contactName){
evt.contactName=evt.phoneNumber;
}
return evt;
};
function __sp_commlog_iterator_get_next(){
if(typeof __nofLogs=="number"){
if(__nofLogs<=0){
return null;
}
__nofLogs=__nofLogs-1;
}
if((typeof this.buffer=="object")&&(this.buffer!=null)){
var b1=this.buffer;
this.buffer=null;
var _2a2=new __device_commlog_item(b1);
return _2a2;
}else{
var _2a3;
if(this.iter!=undefined&&this.iter!=null){
while(_2a3=this.iter.getNext()){
if(_2a3.EventType==0||_2a3.EventType==3){
break;
}
}
}
if(typeof _2a3=="undefined"){
return null;
}
var rval=new __device_commlog_item(_2a3);
_2a3.close();
return rval;
}
};
function __sp_commlog_iterator_has_next(){
if(__nofLogs<=0){
return false;
}
if(this.iter!=undefined&&this.iter!=null){
while(this.buffer=this.iter.getNext()){
if(this.buffer.EventType==0||this.buffer.EventType==3){
break;
}
}
}
if((typeof this.buffer=="object")&&(this.buffer!=null)){
return true;
}else{
return false;
}
};
function __sp_commlog_iterator_close(){
this.iter.close();
};
function __sp_commlog_iterator(_2a5){
this.iter=_2a5;
this.buffer=null;
this.next=__sp_commlog_iterator_get_next;
this.hasNext=__sp_commlog_iterator_has_next;
this.close=__sp_commlog_iterator_close;
this.nofLogs=__nofLogs;
};
function __sp_commlog_getList_cb(arg1,arg2,arg3){
var _2a9;
var _2aa;
var iter=null;
var _2ac=null;
var _2ad;
_2ad=glob_obj.getFromArray(arg1);
if(_2ad){
_2a9=_2ad.success_cb;
_2aa=_2ad.error_cb;
}else{
alert("Commlog: __sp_commlog_getList_cb : Callback not found ");
return;
}
if(arg3.ErrorCode!=0){
if(arg3.ErrorMessage){
_2ac=splitErrorMessage(arg3.ErrorMessage);
}else{
_2ac="operation failed";
}
if(_2aa){
setTimeout(function(){
_2aa(new DeviceException(MapErrorCode[arg3.ErrorCode],"Commlog: getList: "+_2ac));
},1000);
return;
}
}else{
if(arg3.ReturnValue){
iter=new __sp_commlog_iterator(arg3.ReturnValue);
}
}
if(arg2!=event_cancelled){
_2a9(iter);
}
glob_obj.removeFromArray(arg1);
};
function __sp_commlog_getList(_2ae,_2af,_2b0){
if(_2ae==null||_2ae==undefined){
throw new DeviceException(this.error.MISSING_ARG_ERR,"CommLog:getList:callback is Required");
}else{
if(typeof _2ae!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"CommLog:getList:Invalid Callback");
}
}
if(_2b0){
if(typeof (_2b0)!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"CommLog: getList: ErrorCallback is invalid");
}
}
if(_2af!=null&&_2af!=undefined){
if(typeof _2af!="object"||__device_typeof(_2af)=="Array"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"CommLog: getList: Match is not an object");
}
if(_2af.type!=null&&_2af.type!=undefined){
if(typeof _2af.type!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"CommLog: getList: Type is not a string");
}
}
if(_2af.flag!=null&&_2af.flag!=undefined){
if(typeof _2af.flag!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"CommLog: getList: Flag is not a string");
}
if(_2af.type){
if(_2af.type.toLowerCase()=="sms"&&_2af.flag.toLowerCase()=="missed"){
if(_2b0){
_2b0(new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"commlogs: getList: Missed is not supported for sms"));
return;
}else{
throw new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"commlogs: getList: Missed is not supported for sms");
}
}
}
}
if(_2af.nofLogs!=null&&_2af.nofLogs!=undefined){
if(typeof _2af.nofLogs!="number"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"CommLog: getList: nofLogs is invalid");
}
}
}
try{
var _2b1={};
modifyObjectBaseProp(_2b1);
_2b1.Type="Log";
_2b1.Filter={};
modifyObjectBaseProp(_2b1.Filter);
if(_2af){
if(_2af.type){
var _2b2;
_2b2=__get_const_val(__sp_commlog_type_constants,_2af.type.toLowerCase());
if(_2b2!=undefined){
_2b1.Filter.EventType=_2b2;
}else{
if(_2b0){
_2b0(new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"CommLog: getList: Type is out of range"));
return;
}else{
throw new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"CommLog: getList: Type is out of range");
}
}
}
if(_2af.nofLogs!=null&&_2af.nofLogs!=undefined){
if((_2af.nofLogs<0)||(_2af.nofLogs!=(_2af.nofLogs|0))){
if(_2b0){
_2b0(new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"CommLog: getList: nofLogs is out of range"));
return;
}else{
throw new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"CommLog: getList: nofLogs is out of range");
}
}
__nofLogs=_2af.nofLogs;
}
if(_2af.flag){
var _2b3;
_2b3=__get_const_val(__sp_commlog_constants,_2af.flag.toLowerCase());
if(_2b3!=undefined){
_2b1.Filter.Direction=_2b3;
}else{
if(_2b0){
_2b0(new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"CommLog: getList: Flag is out of range"));
}else{
throw new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"CommLog: getList: Flag is out of range");
}
}
}
if(_2af.phoneNumber!=null&&_2af.phoneNumber!=undefined){
if(_2af.phoneNumber!=""){
_2b1.Filter.PhoneNumber=_2af.phoneNumber;
}
}
if(_2af.contactName!=null&&_2af.contactName!=undefined){
if(_2af.contactName!=""){
_2b1.Filter.RemoteParty=_2af.contactName;
}
}
if(_2af.startTime!=null&&_2af.startTime!=undefined){
_2b1.Filter.StartTime=_2af.startTime;
}
if(_2af.endTime!=null&&_2af.endTime!=undefined){
_2b1.Filter.EndTime=_2af.endTime;
}
}
temp_scb=_2ae;
temp_ecb=_2b0;
var _2b4=this.so.IDataSource.GetList(_2b1,this.getListCb);
if(_2b4.TransactionID){
glob_obj.addToGlobalArray(_2b4.TransactionID,_2ae,_2b0);
}
if(_2b1.Filter){
delete _2b1.Filter.Direction;
delete _2b1.Filter.EventType;
delete _2b1.Filter.PhoneNumber;
}
if(_2b1){
delete _2b1.Filter;
delete _2b1.Type;
}
if(_2b4.ErrorCode!=0){
var _2b5="operation failed";
if(_2b4.ErrorMessage){
_2b5=splitErrorMessage(_2b4.ErrorMessage);
}
switch(MapErrorCode[_2b4.ErrorCode]){
case this.error.INVALID_ARG_ERR:
case this.error.MISSING_ARG_ERR:
case this.error.NOT_SUPPORTED_ERR:
throw new DeviceException(MapErrorCode[_2b4.ErrorCode],"CommLog:getList:"+_2b5);
break;
default:
if(_2b0){
_2b0(new DeviceException(MapErrorCode[_2b4.ErrorCode],"CommLog:getList:"+_2b5));
return;
}else{
throw new DeviceException(MapErrorCode[_2b4.ErrorCode],"CommLog:getList:"+_2b5);
}
}
}
return _2b4.TransactionID;
}
catch(e){
__device_handle_exception(e,"__sp_commlog_Input_validation: "+e);
}
};
function __sp_commlog_setNotification_cb(arg1,arg2,arg3){
var _2b9;
var _2ba;
var _2bb=null;
var _2bc;
_2bc=glob_obj.getFromArray(arg1);
if(_2bc){
_2b9=_2bc.success_cb;
_2ba=_2bc.error_cb;
}else{
alert("Commlog: __sp_commlog_setNotification_cb : Callback not found ");
return;
}
if(arg3.ErrorCode!=0){
if(arg3.ErrorMessage){
err_msg=splitErrorMessage(arg3.ErrorMessage);
}else{
err_msg="operation failed";
}
if(_2ba){
_2ba(new DeviceException(MapErrorCode[arg3.ErrorCode],"CommLog: getList: "+err_msg));
return;
}
}else{
if(arg3.ReturnValue){
_2bb=new __device_commlog_item(arg3.ReturnValue);
}
}
if(arg2!=event_cancelled){
for(i in __notifArr){
if(arg1==__notifArr[i].connectionId){
var _2bd=__notifArr[i];
break;
}
}
if(_2bd){
_2bd.callback(_2bb);
}
}
glob_obj.removeFromArray(arg1);
};
function __sp_commlog_setNotification(_2be,_2bf){
if(!_2be){
throw new DeviceException(this.error.MISSING_ARG_ERR,"CommLog:setNotification:callback is missing");
}
if(typeof _2be!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"CommLog:setNotification:callback is invalid");
}
if(_2bf){
if(typeof (_2bf)!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"CommLog: setNotification: ErrorCallback is invalid");
}
}
for(i in __notifArr){
var _2c0=__notifArr[i];
__notifArr.splice(i,1);
__notifCount=__notifArr.length;
this.so.IDataSource.Cancel({TransactionID:_2c0.connectionId});
break;
}
var _2c1={};
modifyObjectBaseProp(_2c1);
_2c1.Type="Log";
_2c1.Filter={DelayTime:0};
temp_scb=_2be;
temp_ecb=_2bf;
var _2c2=this.so.IDataSource.RequestNotification(_2c1,this.setNotificationCb);
if(_2c2.TransactionID){
glob_obj.addToGlobalArray(_2c2.TransactionID,_2be,_2bf);
}
__notifArr[__notifCount++]=new __Notification(_2c2.TransactionID,_2be);
if(_2c1){
delete _2c1.Type;
}
if(_2c2.ErrorCode!=0){
var _2c3="operation failed";
if(_2c2.ErrorMessage){
_2c3=splitErrorMessage(_2c2.ErrorMessage);
}
switch(MapErrorCode[_2c2.ErrorCode]){
case this.error.INVALID_ARG_ERR:
case this.error.MISSING_ARG_ERR:
case this.error.NOT_SUPPORTED_ERR:
throw new DeviceException(MapErrorCode[_2c2.ErrorCode],"CommLog:setNotification:"+_2c3);
break;
default:
if(_2bf){
setTimeout(function(){
_2bf(new DeviceException(MapErrorCode[_2c2.ErrorCode],"CommLog:setNotification:"+_2c3));
},1000);
}else{
throw new DeviceException(MapErrorCode[_2c2.ErrorCode],"CommLog:setNotification:"+_2c3);
}
}
}
};
function __sp_commlog_cancelNotification(){
for(i in __notifArr){
if(__notifArr[i].connectionId){
var _2c4=__notifArr[i];
__notifArr.splice(i,1);
__notifCount=__notifArr.length;
break;
}
}
if(_2c4){
var _2c5=this.so.IDataSource.Cancel({TransactionID:_2c4.connectionId});
if(_2c5.ErrorCode!=0){
var _2c6="operation failed";
if(_2c5.ErrorMessage){
_2c6=splitErrorMessage(_2c5.ErrorMessage);
}
}
}
};
function __sp_commlog_cancel(_2c7){
if(!_2c7){
throw new DeviceException(this.error.MISSING_ARG_ERR,"CommLog:cancel:transactionId is missing");
}
if(typeof _2c7!="number"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"CommLog:cancel:transactionId is invalid");
}
var _2c8=this.so.IDataSource.Cancel({TransactionID:_2c7});
if(_2c8.ErrorCode!=0){
var _2c9="operation failed";
if(_2c8.ErrorMessage){
_2c9=splitErrorMessage(_2c8.ErrorMessage);
}
throw new DeviceException(MapErrorCode[_2c8.ErrorCode],"CommLog:cancel:"+_2c9);
}
};
function __sp_commlog_deleteLogEntry(_2ca){
if(_2ca==null||_2ca==undefined){
throw new DeviceException(this.error.MISSING_ARG_ERR,"CommLog:deleteLogEntry:logId is missing");
}
if(typeof _2ca!="number"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"CommLog:deleteLogEntry:logId is invalid");
}
var _2cb={};
modifyObjectBaseProp(_2cb);
_2cb.Type="Log";
_2cb.Data={id:_2ca.toString()};
modifyObjectBaseProp(_2cb.Data);
var _2cc=this.so.IDataSource.Delete(_2cb);
if(_2cc.ErrorCode!=0){
var _2cd="operation failed";
if(_2cc.ErrorMessage){
_2cd=splitErrorMessage(_2cc.ErrorMessage);
}
throw new DeviceException(MapErrorCode[_2cc.ErrorCode],"CommLog:deleteLogEntry:"+_2cd);
}
};
function __sp_commlog_instance(){
this.descriptor=new __sp_commlog_descriptor();
this.getList=__sp_commlog_getList;
this.getListCb=__sp_commlog_getList_cb;
this.setNotification=__sp_commlog_setNotification;
this.setNotificationCb=__sp_commlog_setNotification_cb;
this.cancelNotification=__sp_commlog_cancelNotification;
this.cancel=__sp_commlog_cancel;
this.deleteLogEntry=__sp_commlog_deleteLogEntry;
this.error=new DeviceException(0,"Dummy");
try{
this.so=device.getServiceObject("Service.Logging","IDataSource");
}
catch(e){
this.so=null;
__device_handle_exception(e,"commlog service not available");
}
};
function __device_messaging_descriptor(_2ce){
this.interfaceName=_2ce.interfaceName;
this.version=_2ce.version;
};
function __device_messaging_startEditor(_2cf){
return this.provider.startEditor(_2cf);
};
function __device_messaging_getList(_2d0,_2d1,_2d2,_2d3,_2d4){
return this.provider.getList(_2d0,_2d1,_2d2,_2d3,_2d4);
};
function __device_messaging_send(_2d5,_2d6,id,_2d8){
return this.provider.send(_2d5,_2d6,id,_2d8);
};
function __device_messaging_setNotifier(_2d9,_2da){
return this.provider.setNotifier(_2d9,_2da);
};
function __device_messaging_cancelNotifier(){
return this.provider.cancelNotifier();
};
function __device_messaging_getMessage(id){
return this.provider.getMessage(id);
};
function __device_messaging_delete(id){
return this.provider.deleteMessage(id);
};
function __device_messaging_setStatus(id,_2de){
return this.provider.setStatus(id,_2de);
};
function __device_messaging_cancel(_2df){
return this.provider.cancel(_2df);
};
function __device_messaging(_2e0){
this.provider=_2e0;
this.interfaceName=_2e0.descriptor.interfaceName;
this.version=_2e0.descriptor.version;
this.SORT_ASCENDING=0;
this.SORT_DESCENDING=1;
this.SORT_BY_DATE=0;
this.SORT_BY_SENDER=1;
this.STATUS_READ=0;
this.STATUS_UNREAD=1;
this.startEditor=__device_messaging_startEditor;
this.getList=__device_messaging_getList;
this.send=__device_messaging_send;
this.setNotifier=__device_messaging_setNotifier;
this.cancelNotifier=__device_messaging_cancelNotifier;
this.getMessage=__device_messaging_getMessage;
this.deleteMessage=__device_messaging_delete;
this.setStatus=__device_messaging_setStatus;
this.cancel=__device_messaging_cancel;
};
var __device_messaging_service_entry={"name":null,"version":null,"proto":__device_messaging,"descriptor":__device_messaging_descriptor,"providers":[{"descriptor":__sp_messaging_descriptor,"instance":__sp_messaging_instance}]};
var FILE_SCHEME="file://";
function __sp_messaging_descriptor(){
this.interfaceName="messaging";
if(window.__Service_Interface_Ver){
this.version=__Service_Interface_Ver;
}else{
this.version=1;
}
};
function __sp_messaging_instance(){
this.descriptor=new __sp_messaging_descriptor();
this.startEditor=__sp_messaging_startEditor;
this.getList=__sp_messaging_getList;
this.getListcB=__sp_message_getListcB;
this.send=__sp_messaging_send;
this.sendcb=__sp_message_sendcb;
this.setNotifier=__sp_messaging_setNotifier;
this.setNotifierCb=__sp_messaging_setNotifier_cb;
this.cancelNotifier=__sp_messaging_cancelNotifier;
this.getMessage=__sp_messaging_getMessage;
this.deleteMessage=__sp_messaging_delete;
this.setStatus=__sp_messaging_setStatus;
this.cancel=__sp_messaging_cancel;
this.sendCommon=__sp_messaging_send_common;
this.SORT_ASCENDING=0;
this.SORT_DESCENDING=1;
this.SORT_BY_DATE=0;
this.SORT_BY_SENDER=1;
this.STATUS_READ=0;
this.STATUS_UNREAD=1;
this.error=new DeviceException(0,"Dummy");
try{
this.so=device.getServiceObject("Service.Messaging","IMessaging");
}
catch(e){
this.so=null;
__device_handle_exception(e,"Messaging service not available");
}
};
function __sp_attachment_build(_2e1){
if(!_2e1){
return null;
}
var _2e2={};
modifyObjectBaseProp(_2e2);
if(_2e1.uri){
if(typeof _2e1.uri!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"uri is invalid");
}
if(_2e1.uri.slice(0,7)==FILE_SCHEME){
if(_2e1.uri.charAt(7)=="/"){
if(_2e1.uri.charAt(9)!=":"){
throw new DeviceException(this.error.URI_NOT_FOUND_ERR,"specified uri not found");
}
_2e2.FileName=_2e1.uri.slice(8).replace(/\057/g,"\\");
if(_2e2.FileName.length>256){
throw new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"uri is out of range");
}
}else{
if(_2e1.uri.charAt(8)!=":"){
throw new DeviceException(this.error.URI_NOT_FOUND_ERR,"specified uri not found");
}
_2e2.FileName=_2e1.uri.slice(7).replace(/\057/g,"\\");
if(_2e2.FileName.length>256){
throw new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"uri is out of range");
}
}
}else{
throw new DeviceException(this.error.INVALID_URI_ERR,"uri is invalid");
}
}
return _2e2;
};
function __sp_message_build(_2e3,id){
if(!_2e3){
return null;
}
var _2e5={};
modifyObjectBaseProp(_2e5);
var _2e6=0;
_2e5.MessageParam={};
modifyObjectBaseProp(_2e5.MessageParam);
_2e5.MessageParam.LaunchEditor=false;
_2e5.MessageType=(_2e3.type==undefined||_2e3.type==null||_2e3.type=="")?"SMS":_2e3.type;
if(_2e3.to){
if(typeof (_2e3.to)=="string"){
_2e5.To=_2e3.to;
}else{
if(__device_typeof(_2e3.to)=="Array"&&_2e3.to.length>0){
if(_2e3.to[0]){
_2e5.To=_2e3.to[0];
}
if(_2e3.to.length>1){
if(_2e3.to.slice(1)){
_2e5.MessageParam.To=_2e3.to.slice(1);
}
}
}else{
_2e5.To=_2e3.to;
}
}
}
if(_2e3.cc){
_2e5.MessageParam.Cc=_2e3.cc;
}
if(id){
if((typeof (id)=="string")&&!(isNaN(id))){
id=Number(id);
}
_2e5.MessageParam.TemplateId=id;
}
if(_2e5.MessageType=="SMS"){
if(_2e3.body){
_2e5.BodyText=_2e3.body;
}
}
if(_2e5.MessageType=="MMS"){
if(_2e3.body){
_2e5.BodyText=_2e3.body;
}
if(_2e3.subject){
if(typeof _2e3.subject=="string"&&_2e3.subject.length>256){
throw new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"subject length is greater than 256 characters");
}
_2e5.Subject=_2e3.subject;
}
if(_2e3.attachments){
_2e5.MessageParam.AttachmentList=[];
for(var a in _2e3.attachments){
if(typeof _2e3.attachments[a]=="object"&&__device_typeof(_2e3.attachments[a])!="Array"){
_2e5.MessageParam.AttachmentList.push(__sp_attachment_build(_2e3.attachments[a]));
_2e6=1;
}
}
if(_2e6==0){
throw new DeviceException(this.error.INVALID_ARG_ERR,"uri is invalid");
}
}
}
return _2e5;
};
function __sp_device_attachment_build(_2e8){
if(!_2e8){
return null;
}
var _2e9={};
_2e9.uri=FILE_SCHEME+_2e8.FileName;
return _2e9;
};
function __sp_device_message_build(_2ea){
if(!_2ea){
return null;
}
var _2eb={};
_2eb.body=null;
_2eb.subject=null;
_2eb.attachments=null;
_2eb.to=null;
_2eb.cc=null;
_2eb.type=_2ea.MessageType;
if(_2ea.BodyText){
_2eb.body=_2ea.BodyText;
}
if(_2ea.to){
_2eb.to=_2ea.To;
}
if(_2ea.Subject){
_2eb.subject=_2ea.Subject;
}
_2eb.attachment=false;
if(_2eb.type=="MMS"){
if(_2ea.Cc){
_2eb.cc=_2ea.Cc;
}
if(_2ea.AttachmentList){
_2eb.attachment=true;
_2eb.attachments=[];
for(var a in _2ea.AttachmentList){
if(_2ea.AttachmentList.hasOwnProperty("a")){
_2eb.attachments.push(__sp_device_attachment_build(_2ea.AttachmentList[a]));
}
}
}
}
return _2eb;
};
function __sp_device_message_info_build_notifier(_2ed){
if(!_2ed){
return null;
}
var _2ee={};
_2ee.message={};
_2ee.message.type=_2ed.MessageType;
_2ee.sender=_2ed.Sender;
_2ee.message.subject=_2ed.Subject;
_2ee.time=_2ed.Time;
_2ee.attachments=(_2ed.Attachments==undefined||_2ed.Attachments==null)?(!(_2ed.AttachmentList==undefined||_2ed.AttachmentList==null)):_2ed.Attachments;
_2ee.unread=_2ed.Unread;
_2ee.id=(_2ed.MessageId).toString();
return _2ee;
};
function __sp_device_message_info_build(_2ef){
if(!_2ef){
return null;
}
var _2f0={};
_2f0.message=__sp_device_message_build(_2ef);
_2f0.sender=_2ef.Sender;
_2f0.time=_2ef.Time;
_2f0.unread=_2ef.Unread;
_2f0.id=(_2ef.MessageId).toString();
return _2f0;
};
function __sp_message_iterator_get_next(){
var _2f1=this.iter.getNext();
if(typeof _2f1=="undefined"){
return null;
}
var _2f2=__sp_device_message_info_build(_2f1);
_2f1.close();
return _2f2;
};
function __sp_message_iterator(_2f3){
this.iter=_2f3;
this.next=__sp_message_iterator_get_next;
this.close=function(){
this.iter.close();
};
};
function __sp_message_getListcB(arg1,arg2,arg3){
var _2f7;
var _2f8;
var _2f9;
_2f9=glob_obj.getFromArray(arg1);
if(_2f9){
_2f7=_2f9.success_cb;
_2f8=_2f9.error_cb;
}else{
alert("Messaging: __sp_message_getListcB: Callback not found ");
return;
}
var iter=null;
if(arg3.ErrorCode!=0){
if(arg3.ErrorMessage){
err_msg=splitErrorMessage(arg3.ErrorMessage);
}else{
err_msg="Operation Failed";
}
if(_2f8){
_2f8(new DeviceException(MapErrorCode[arg3.ErrorCode],"Messaging: getList: "+err_msg));
return;
}
}else{
if(arg3.ReturnValue){
iter=new __sp_message_iterator(arg3.ReturnValue);
}
}
if(arg2!=event_cancelled){
_2f7(iter);
}
glob_obj.removeFromArray(arg1);
};
function __sp_messaging_getList(_2fb,_2fc,_2fd,_2fe,_2ff){
if(!_2fb){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Messaging:getList:callback is missing");
}else{
if(typeof _2fb!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:getList:callback is not a function");
}
}
if(_2ff!=null&&typeof _2ff!="undefined"){
if(typeof (_2ff)!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging: startEditor: ErrorCallback is invalid");
}
}
if(_2fc!=null&&_2fc!=undefined&&typeof _2fc!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:getList:match is invalid");
}
if(_2fd!=null&&_2fd!=undefined&&typeof _2fd!="number"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:getList:sortkey is invalid");
}
if(_2fe!=null&&_2fe!=undefined&&typeof _2fe!="number"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:getList:sortorder is invalid");
}
if(_2fd!=null&&_2fd!=undefined&&typeof _2fd=="number"){
if((_2fd!=0)&&(_2fd!=1)){
_2ff(new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"Messaging:getList:sortkey is out of range"));
return;
}
}
if(_2fe!=null&&_2fe!=undefined&&typeof _2fe=="number"){
if((_2fe!=0)&&(_2fe!=1)){
_2ff(new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"Messaging:getList:sortorder is out of range"));
return;
}
}
var _300={};
modifyObjectBaseProp(_300);
_300.Type="Inbox";
_300.Filter={};
modifyObjectBaseProp(_300.Filter);
if(_2fc){
if(_2fc.type!=null&&_2fc.type!=undefined){
_300.Filter.MessageTypeList=_2fc.type;
}
if(_2fc.senders!=null&&_2fc.senders!=undefined){
_300.Filter.SenderList=_2fc.senders;
}
if(_2fc.subject!=null&&_2fc.subject!=undefined){
if(_2fc.subject.length>256){
if(_2ff){
_2ff(new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"Messaging:getList:subject is out of range"));
return;
}else{
throw new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"Messaging:getList:subject is out of range");
}
}else{
_300.Filter.Subject=_2fc.subject;
}
}
if(_2fc.start!=null&&_2fc.start!=undefined){
_300.Filter.StartDate=_2fc.start;
}
if(_2fc.end!=null&&_2fc.end!=undefined){
_300.Filter.EndDate=_2fc.end;
}
}
if(_2fd||_2fe){
_300.SortOrder={};
modifyObjectBaseProp(_300.SortOrder);
if(_2fd){
if((_2fd==this.SORT_BY_DATE)){
_300.SortOrder.Key="Date";
}else{
if((_2fd==this.SORT_BY_SENDER)){
_300.SortOrder.Key="Sender";
}
}
}else{
_300.SortOrder.Key="Date";
}
if(_2fe){
if((_2fe==this.SORT_ASCENDING)){
_300.SortOrder.Order="Ascending";
}else{
if((_2fe==this.SORT_DESCENDING)){
_300.SortOrder.Order="Descending";
}
}
}else{
_300.SortOrder.Order="Ascending";
}
}
try{
temp_scb=_2fb;
temp_ecb=_2ff;
var _301=this.so.IMessaging.GetList(_300,this.getListcB);
if(_301.TransactionID){
glob_obj.addToGlobalArray(_301.TransactionID,_2fb,_2ff);
}
if(_300){
delete _300.Filter;
delete _300.SortOrder;
delete _300.Type;
}
if(_301.ErrorCode!=0){
var _302="operation failed";
if(_301.ErrorMessage){
_302=splitErrorMessage(_301.ErrorMessage);
}
switch(MapErrorCode[_301.ErrorCode]){
case this.error.INVALID_ARG_ERR:
case this.error.MISSING_ARG_ERR:
case this.error.NOT_SUPPORTED_ERR:
throw new DeviceException(MapErrorCode[_301.ErrorCode],"Messaging:getList:"+_302);
break;
default:
if(_2ff){
setTimeout(function(){
_2ff(new DeviceException(MapErrorCode[_301.ErrorCode],"Messaging:getList:"+_302));
},500);
}else{
throw new DeviceException(MapErrorCode[_301.ErrorCode],"Messaging:getList:"+_302);
}
}
}
return _301.TransactionID;
}
catch(e){
__device_handle_exception(e,"__sp_messaging_getList: "+e);
}
};
function __sp_message_sendcb(arg1,arg2,arg3){
var _306;
var eCB;
var _308=glob_obj.getFromArray(arg1);
if(_308){
_306=_308.success_cb;
eCB=_308.error_cb;
}else{
alert("Messaging : __sp_message_sendcb : Callback not found");
return;
}
if(_306){
var _309="operation failed";
if(arg3.ErrorCode!=0){
if(arg3.ErrorMessage){
_309=splitErrorMessage(arg3.ErrorMessage);
}
if(eCB){
setTimeout(function(){
eCB(new DeviceException(MapErrorCode[arg3.ErrorCode],"Messaging: send: "+_309));
},500);
return;
}
}
if(arg2!=event_cancelled){
_306();
}
}
glob_obj.removeFromArray(arg1);
};
function __sp_messaging_send_common(_30a,_30b,_30c,id,eCB){
var _30f=__sp_message_build(_30a,id);
_30f.MessageParam.LaunchEditor=_30b;
var _310;
if(_30b==false){
temp_scb=_30c;
temp_ecb=eCB;
_310=this.so.IMessaging.Send(_30f,this.sendcb);
if(_310.TransactionID){
glob_obj.addToGlobalArray(_310.TransactionID,_30c,eCB);
}
if(_310.ErrorCode!=0){
var _311="operation failed";
if(_310.ErrorMessage){
_311=splitErrorMessage(_310.ErrorMessage);
}
switch(MapErrorCode[_310.ErrorCode]){
case this.error.INVALID_ARG_ERR:
case this.error.MISSING_ARG_ERR:
case this.error.NOT_SUPPORTED_ERR:
throw new DeviceException(MapErrorCode[_310.ErrorCode],_311);
break;
default:
if(eCB){
setTimeout(function(){
eCB(new DeviceException(MapErrorCode[_310.ErrorCode],_311));
},500);
return;
}else{
throw new DeviceException(MapErrorCode[_310.ErrorCode],_311);
}
}
}
var _312=_310.TransactionID;
return _312;
}else{
_310=this.so.IMessaging.Send(_30f);
if(_310.ErrorCode!=0){
if(_310.ErrorMessage){
var _313=splitErrorMessage(_310.ErrorMessage);
throw new DeviceException(MapErrorCode[_310.ErrorCode],"Messaging:startEditor"+_313);
}else{
throw new DeviceException(MapErrorCode[_310.ErrorCode],"Messaging:startEditor:operation failed");
}
}
}
if(_30f){
delete _30f.MessageParam;
}
};
function __sp_messaging_startEditor(_314){
if(!_314){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Messaging:startEditor:message is missing");
}else{
if(typeof _314!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:startEditor:message is invalid");
}
}
if((_314.subject)){
if((_314.subject).length>256){
throw new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"Messaging:startEditor:subject is too lengthy");
}
}
if(_314.attachments!=undefined&&_314.attachments!=null&&typeof _314.attachments!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:startEditor:attachment is invalid");
}
if(_314){
if(_314.body){
if(typeof (_314.body)!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:startEditor:body is invalid");
}
}
}
try{
this.sendCommon(_314,true,null);
}
catch(e){
var _315=null;
if(e.message){
_315=new DeviceException(e.code,"Messaging:startEditor:"+e.message);
}else{
_315=new DeviceException(e.code,"Messaging:startEditor:operation failed");
}
__device_handle_exception(_315,"__sp_messaging_startEditor: "+_315);
}
};
function __sp_messaging_send(_316,_317,id,_319){
if(!_317){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Messaging:send:message is missing");
}else{
if(typeof _317!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:send:message is invalid");
}
}
if(!_316){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Messaging:send:callback is missing");
}else{
if(typeof _316!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:send:callback is invalid");
}
}
if(_317.to==undefined||_317.to==null){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Messaging:send:to field is missing");
}
if(_317.attachments!=undefined&&_317.attachments!=null&&typeof _317.attachments!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:send:attachment is invalid");
}
if(!id){
id="";
}
if((typeof id)=="function"){
var _31a=id;
id="";
_319=_31a;
}
if((typeof _319)=="undefined"||_319==null){
_319=null;
}else{
if((typeof _319)!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:send:errorCallback is not a function");
}
}
var _31b=function(arg1,arg2,arg3){
var _31f=_316;
var _320=_319;
var iter=null;
if(arg3.ErrorCode!=0){
var _322;
if(arg3.ErrorMessage){
_322=splitErrorMessage(arg3.ErrorMessage);
}else{
_322="Operation Failed";
}
_320(new DeviceException(MapErrorCode[arg3.ErrorCode],"Messaging:startEditor: "+_322));
return;
}else{
if(arg3.ReturnValue){
iter=new __sp_message_iterator(arg3.ReturnValue);
_31f(iter);
}
}
if(arg2!=event_cancelled){
_31f(iter);
}
};
try{
var _323=this.sendCommon(_317,false,_316,id,_319);
return _323;
}
catch(e){
var _324=null;
switch(e.code){
case this.error.INVALID_ARG_ERR:
case this.error.MISSING_ARG_ERR:
case this.error.NOT_SUPPORTED_ERR:
throw new DeviceException(e.code,"Messaging:send:"+e.message);
break;
default:
if(_319){
setTimeout(function(){
_319(new DeviceException(e.code,"Messaging:send:"+e.message));
},1000);
}else{
throw new DeviceException(e.code,"Messaging:send:"+e.message);
}
}
}
};
function __sp_messaging_setNotifier_cb(arg1,arg2,arg3){
var _328;
var _329;
var _32a=null;
var _32b=null;
var _32c;
_32c=glob_obj.getFromArray(arg1);
if(_32c){
_328=_32c.success_cb;
_329=_32c.error_cb;
}else{
alert("Messaging: __sp_messaging_setNotifier_cb : Callback not found ");
return;
}
if(arg3.ErrorCode!=0){
if(arg3.ErrorMessage){
_32b=splitErrorMessage(arg3.ErrorMessage);
}else{
_32b="operation failed";
}
if(_329){
_329(new DeviceException(MapErrorCode[arg3.ErrorCode],"Messaging:setNotifier: "+_32b));
return;
}
}else{
if(arg3.ReturnValue){
_32a=new __sp_device_message_info_build_notifier(arg3.ReturnValue);
arg3.ReturnValue.close();
}
}
if(arg2!=event_cancelled){
_328(_32a.id);
}
glob_obj.removeFromArray(arg1);
};
function __sp_messaging_setNotifier(_32d,_32e){
if(!_32d){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Messaging:setNotifier:callback is missing");
}else{
if(typeof _32d!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:setNotifier:callback is invalid");
}
}
if(_32e){
if(typeof (_32e)!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:setNotifier: ErrorCallback is invalid");
}
}
var _32f={};
modifyObjectBaseProp(_32f);
_32f.Type="NewMessage";
try{
temp_scb=_32d;
temp_ecb=_32e;
var _330=this.so.IMessaging.RegisterNotification(_32f,this.setNotifierCb);
if(_330.TransactionID){
glob_obj.addToGlobalArray(_330.TransactionID,_32d,_32e);
}
if(_32f){
delete _32f.Type;
}
if(_330.ErrorCode!=0){
var _331="operation failed";
if(_330.ErrorMessage){
_331=splitErrorMessage(_330.ErrorMessage);
}
switch(MapErrorCode[_330.ErrorCode]){
case this.error.INVALID_ARG_ERR:
case this.error.MISSING_ARG_ERR:
case this.error.NOT_SUPPORTED_ERR:
throw new DeviceException(MapErrorCode[_330.ErrorCode],"Messaging:setNotifier:"+_331);
break;
default:
if(_32e){
setTimeout(function(){
_32e(new DeviceException(MapErrorCode[_330.ErrorCode],"Messaging:setNotifier:"+_331));
},1000);
}else{
throw new DeviceException(MapErrorCode[_330.ErrorCode],"Messaging:setNotifier:"+_331);
}
}
}
var _332=_330.TransactionID;
return _332;
}
catch(e){
__device_handle_exception(e,"__sp_messaging_setNotifier: "+e.toString());
}
};
function __sp_messaging_cancelNotifier(){
var _333={};
modifyObjectBaseProp(_333);
_333.Type="NewMessage";
try{
var _334=this.so.IMessaging.CancelNotification(_333);
if(_333){
delete _333.Type;
}
if(_334.ErrorCode!=0){
if(_334.ErrorMessage){
var _335=splitErrorMessage(_334.ErrorMessage);
throw new DeviceException(MapErrorCode[_334.ErrorCode],"Messaging:cancelNotifier"+_335);
}else{
throw new DeviceException(MapErrorCode[_334.ErrorCode],"Messaging:cancelNotifier:operation failed");
}
}
}
catch(e){
__device_handle_exception(e,"__sp_messaging_cancelNotifier: "+e);
}
};
function __sp_messaging_getMessage(id){
if(!id){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Messaging:getMessage:id is missing");
}else{
if((typeof id)!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:getMessage:MessageId should be a string");
}
}
if((typeof id=="string")&&!(isNaN(id))){
id=Number(id);
if(id==0){
throw new DeviceException(this.error.DATA_NOT_FOUND_ERR,"Messaging:getMessage:id not found");
}
if(id<0){
throw new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"Messaging:getMessage:id is out of range");
}
}
var _337={};
modifyObjectBaseProp(_337);
_337.Type="Inbox";
_337.Filter={};
modifyObjectBaseProp(_337.Filter);
_337.Filter.MessageId=id;
try{
var _338=this.so.IMessaging.GetList(_337);
if(_337){
delete _337.Filter;
delete _337.Type;
}
if(_338.ErrorCode!=0){
if(_338.ErrorMessage){
var _339=splitErrorMessage(_338.ErrorMessage);
throw new DeviceException(MapErrorCode[_338.ErrorCode],"Messaging:getMessage"+_339);
}else{
throw new DeviceException(MapErrorCode[_338.ErrorCode],"Messaging:getMessage:operation failed");
}
}
if(_338.ReturnValue){
var iter=new __sp_message_iterator(_338.ReturnValue);
var _33b=iter.next();
if(_33b){
return _33b;
}else{
throw new DeviceException(this.error.DATA_NOT_FOUND_ERR,"Messaging:getMessage:id not found");
}
}
}
catch(e){
__device_handle_exception(e,"__sp_messaging_getMessage: "+e);
}
};
function __sp_messaging_delete(id){
if(!id){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Messaging:delete:id is missing");
}else{
if((typeof id)!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:deleteMessage:MessageId should be a string");
}
}
if((typeof id=="string")&&!(isNaN(id))){
id=Number(id);
if(id==0){
throw new DeviceException(this.error.DATA_NOT_FOUND_ERR,"Messaging:delete:id not found");
}
if(id<0){
throw new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"Messaging:delete:id is out of range");
}
}
var _33d={};
modifyObjectBaseProp(_33d);
_33d.MessageId=id;
try{
var _33e=this.so.IMessaging.Delete(_33d);
if(_33d){
delete _33d.MessageId;
}
if(_33e.ErrorCode!=0){
if(_33e.ErrorMessage){
var _33f=splitErrorMessage(_33e.ErrorMessage);
throw new DeviceException(MapErrorCode[_33e.ErrorCode],"Messaging:delete"+_33f);
}else{
throw new DeviceException(MapErrorCode[_33e.ErrorCode],"Messaging:delete:operation failed");
}
}
}
catch(e){
__device_handle_exception(e,"__sp_messaging_delete: "+e);
}
};
function __sp_messaging_setStatus(id,_341){
if(id==null||id==undefined||(id.length)<=0){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Messaging:setStatus:id is missing");
}
if((typeof id)!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:setStatus:id should be string");
}
if(_341==null||_341==undefined){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Messaging:setStatus:status is missing");
}
if(typeof _341!="number"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:setStatus:status is invalid");
}
if(typeof _341=="number"&&_341!=0&&_341!=1){
throw new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"Messaging:setStatus:status is out of range");
}
if((typeof id=="string")&&!(isNaN(id))){
id=Number(id);
if(id==0){
throw new DeviceException(this.error.DATA_NOT_FOUND_ERR,"Messaging:setStatus:id not found");
}
if(id<0){
throw new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"Messaging:setStatus:id is out of range");
}
}
var _342={};
modifyObjectBaseProp(_342);
_342.MessageId=id;
if((_341==this.STATUS_UNREAD)){
_342.Status="Unread";
}else{
if((_341==this.STATUS_READ)){
_342.Status="Read";
}
}
try{
var _343=this.so.IMessaging.ChangeStatus(_342);
if(_342){
delete _342.MessageId;
delete _342.Status;
}
if(_343.ErrorCode!=0){
if(_343.ErrorMessage){
var _344=splitErrorMessage(_343.ErrorMessage);
throw new DeviceException(MapErrorCode[_343.ErrorCode],"Messaging:setStatus"+_344);
}else{
throw new DeviceException(MapErrorCode[_343.ErrorCode],"Messaging:setStatus:operation failed");
}
}
}
catch(e){
__device_handle_exception(e,"__sp_messaging_setStatus: "+e);
}
};
function __sp_messaging_cancel(_345){
if(_345==null||_345==undefined){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Messaging:setStatus:id is missing");
}
if(typeof _345!="number"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Messaging:cancel:id is invalid");
}
var _346={};
modifyObjectBaseProp(_346);
_346.TransactionID=_345;
try{
var _347=this.so.IMessaging.Cancel(_346);
if(_346){
delete _346.TransactionID;
}
if(_347.ErrorCode!=0){
var err;
if(_347.ErrorCode==1000){
err=this.error.DATA_NOT_FOUND_ERR;
}else{
err=MapErrorCode[_347.ErrorCode];
}
if(_347.ErrorMessage){
var _349=splitErrorMessage(_347.ErrorMessage);
throw new DeviceException(err,"Messaging:cancel"+_349);
}else{
throw new DeviceException(err,"Messaging:cancel:operation failed");
}
}
}
catch(e){
__device_handle_exception(e,"__sp_messaging_setStatus: "+e);
}
};
function __device_calendar_descriptor(_34a){
this.interfaceName=_34a.interfaceName;
this.version=_34a.version;
};
function __device_calendar_startEditor(_34b,_34c,_34d){
this.provider.startEditor(_34b,_34c,_34d);
};
function __device_calendar_getList(_34e,_34f,_350){
return this.provider.getList(_34e,_34f,_350);
};
function __device_calendar_add(_351){
return this.provider.addEntry(_351);
};
function __device_calendar_update(_352){
return this.provider.updateEntry(_352);
};
function __device_calendar_delete(data){
this.provider.deleteEntry(data);
};
function __device_calendar_cancel(_354){
this.provider.cancel(_354);
};
function __device_calendar(_355){
this.provider=_355;
this.interfaceName=_355.descriptor.interfaceName;
this.version=_355.descriptor.version;
this.startEditor=__device_calendar_startEditor;
this.getList=__device_calendar_getList;
this.addEntry=__device_calendar_add;
this.updateEntry=__device_calendar_update;
this.deleteEntry=__device_calendar_delete;
this.cancel=__device_calendar_cancel;
};
var __device_calendar_service_entry={"name":null,"version":null,"proto":__device_calendar,"descriptor":__device_calendar_descriptor,"providers":[{"descriptor":__sp_calendar_descriptor,"instance":__sp_calendar_instance}]};
var dataGetList=0;
var isUpdate=0;
function __sp_calendar_descriptor(){
this.interfaceName="calendar";
if(window.__Service_Interface_Ver){
this.version=__Service_Interface_Ver;
}else{
this.version=1;
}
};
function __sp_calendar_entry_time(_356,end,_358){
if(_356){
var st=new Date(_356);
this.begin=st;
}
if(end){
var en=new Date(end);
this.end=en;
}
if(_358){
var al=new Date(_358);
this.alarm=al;
}
};
function __sp_calendar_isInputValid(_35c){
if(_35c){
if(_35c.id){
if(typeof (_35c.id)!="string"){
return false;
}
}
if(_35c.type){
if((typeof (_35c.type)!="string")||!__sp_calendar_entry_types.match(_35c.type)){
return false;
}
}
if(_35c.text){
if(typeof (_35c.text)!="string"){
return false;
}
}
if(_35c.range){
if(typeof (_35c.range)!="object"){
return false;
}
if(_35c.range.begin){
if(typeof (_35c.range.begin)!="object"){
return false;
}
}
if(_35c.range.end){
if(typeof (_35c.range.end)!="object"){
return false;
}
}
}
if(_35c.summary){
if(typeof (_35c.summary)!="string"){
return false;
}
}
if(_35c.description){
if(typeof (_35c.description)!="string"){
return false;
}
}
if(_35c.status){
if(typeof (_35c.status)!="string"){
return false;
}
}
if(_35c.location){
if(typeof (_35c.location)!="string"){
return false;
}
}
if(_35c.priority){
if(typeof (_35c.priority)!="number"){
return false;
}
}
if(_35c.instanceStartTime){
if(typeof (_35c.instanceStartTime)!="object"){
return false;
}
}
if(_35c.exceptionDates){
if(typeof (_35c.exceptionDates)!="object"){
return false;
}
}
if(_35c.time){
if(typeof _35c.time!="object"){
return false;
}
if(_35c.time.begin){
if(typeof (_35c.time.begin)!="object"){
return false;
}
var _35d=new Date("January 1, 1970 00:01");
if(_35c.time.begin<_35d){
return false;
}
try{
(_35c.time.begin).getTime();
}
catch(e){
return false;
}
}
if(_35c.time.end){
if(typeof (_35c.time.end)!="object"){
return false;
}
if(_35c.time.end=="Invalid Date"){
return false;
}
try{
(_35c.time.end).getTime();
}
catch(e){
return false;
}
}
if(_35c.time.begin&&_35c.time.end){
if(_35c.time.begin>_35c.time.end){
return false;
}
}
if(_35c.time.alarm){
if(typeof (_35c.time.alarm)!="object"){
return false;
}
try{
(_35c.time.alarm).getTime();
}
catch(e){
return false;
}
}
}
if(_35c.repeatRule){
if(typeof _35c.repeatRule!="object"){
return false;
}
if(_35c.repeatRule.frequency){
if(typeof (_35c.repeatRule.frequency)!="string"){
return false;
}
}
if(_35c.repeatRule.startDate){
if(typeof (_35c.repeatRule.startDate)!="object"){
return false;
}
if((_35c.repeatRule.startDate)=="Invalid Date"){
return false;
}
try{
(_35c.repeatRule.startDate).getTime();
}
catch(e){
return false;
}
}
if(_35c.repeatRule.untilDate){
if(typeof (_35c.repeatRule.untilDate)!="object"){
return false;
}
if((_35c.repeatRule.untilDate)=="Invalid Date"){
return false;
}
try{
(_35c.repeatRule.untilDate).getTime();
}
catch(e){
return false;
}
}
if(_35c.repeatRule.startDate&&_35c.repeatRule.untilDate){
if(_35c.repeatRule.startDate>_35c.repeatRule.untilDate){
return false;
}
}
if(_35c.repeatRule.interval){
if(typeof (_35c.repeatRule.interval)!="number"){
return false;
}
}
if(_35c.repeatRule.month){
if(typeof (_35c.repeatRule.month)!="number"){
return false;
}
}
if(_35c.repeatRule.weekDays){
if(typeof (_35c.repeatRule.weekDays)!="object"){
return false;
}
}
if(_35c.repeatRule.daysOfMonth){
if(typeof (_35c.repeatRule.daysOfMonth)!="object"){
return false;
}
}
if(_35c.repeatRule.monthDates){
if(typeof (_35c.repeatRule.monthDates)!="object"){
return false;
}
}
}
}
return true;
};
function __sp_calendar_getList_repeatRule(_35e){
var _35f;
switch(_35e.Type){
case 1:
_35f="daily";
this.frequency=_35f.toString();
break;
case 2:
_35f="weekly";
this.frequency=_35f.toString();
break;
case 3:
_35f="monthly";
this.frequency=_35f.toString();
break;
case 4:
_35f="yearly";
this.frequency=_35f.toString();
break;
default:
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: Repeat Rule Type is Invalid");
}
if(_35e.StartDate){
this.startDate=new Date(_35e.StartDate);
}
if(_35e.UntilDate){
this.untilDate=new Date(_35e.UntilDate);
}
if(_35e.Interval){
this.interval=_35e.Interval;
}
if(_35e.DaysInWeek){
this.weekDays=[];
for(var a in _35e.DaysInWeek){
if(_35e.DaysInWeek[a]==6){
_35e.DaysInWeek[a]=0;
}else{
_35e.DaysInWeek[a]=_35e.DaysInWeek[a]+1;
}
this.weekDays.push(_35e.DaysInWeek[a]);
}
}
if(_35e.Month){
this.month=_35e.Month;
}
if(_35e.DaysOfMonth){
if(_35e.DaysOfMonth.Day){
if(_35e.DaysOfMonth.Day==6){
_35e.DaysOfMonth.Day=0;
}else{
_35e.DaysOfMonth.Day=_35e.DaysOfMonth.Day+1;
}
this.daysOfMonth.day=_35e.DaysOfMonth.Day;
}
if(_35e.DaysOfMonth.WeekNum){
this.daysOfMonth.weekInMonth=_35e.DaysOfMonth.WeekNum;
}
}
if(_35e.MonthDays){
this.monthDates=[];
for(var i=0;i<_35e.MonthDays.length;i++){
this.monthDates.push(_35e.MonthDays[i]-1);
}
}
};
function __sp_device_calendar_entry(_362){
if(_362.id){
this.id=_362.id;
}
if(_362.Type){
this.type=_362.Type;
}
if(_362.Summary){
this.summary=_362.Summary;
}
if(_362.Description){
this.description=_362.Description;
}
if(_362.Location){
this.location=_362.Location;
}
if(_362.InstanceStartTime){
this.instanceStartTime=_362.InstanceStartTime;
}
if(_362.Priority>=0||_362.Priority<=255){
this.priority=_362.Priority;
}
if(_362.Status){
this.status=_362.Status;
}
if(_362.Status=="TodoCompleted"){
this.status="Completed";
}else{
if(_362.Status=="TodoNeedsAction"){
this.status="NeedsAction";
}
}
if(_362.ExDates){
this.exceptionDates=_362.ExDates;
}
if(_362.RepeatRule){
this.repeatRule=new __sp_calendar_getList_repeatRule(_362.RepeatRule);
}
if(dataGetList==0){
this.time=new __sp_calendar_entry_time(_362.InstanceStartTime,_362.InstanceEndTime,_362.AlarmTime);
}else{
this.time=new __sp_calendar_entry_time(_362.StartTime,_362.EndTime,_362.AlarmTime);
}
};
function __sp_daysOfMonth_build(_363){
if(_363.day){
if(_363.day==0){
_363.day=6;
}else{
_363.day=_363.day-1;
}
this.Day=_363.day;
}
if(_363.weekInMonth){
this.WeekNum=_363.weekInMonth;
}
};
function __sp_calendar_addEntry_repeatRule(_364,str){
try{
if(!(_364.frequency)){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Calendar: addEntry: frequency is missing");
}else{
var _366=_364.frequency;
switch(_366){
case "daily":
this.Type=1;
break;
case "weekly":
this.Type=2;
break;
case "monthly":
this.Type=3;
break;
case "yearly":
this.Type=4;
break;
default:
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: "+str+" Repeat Rule Type is Invalid");
}
if(_364.startDate){
this.StartDate=_364.startDate;
}
if(_364.untilDate){
this.UntilDate=_364.untilDate;
}
if(_364.interval){
this.Interval=_364.interval;
}
if(_364.weekDays){
this.DaysInWeek=[];
for(var a in _364.weekDays){
if(_364.weekDays[a]==0){
_364.weekDays[a]=6;
}else{
_364.weekDays[a]=_364.weekDays[a]-1;
}
this.DaysInWeek.push(_364.weekDays[a]);
}
}
if(_364.month){
this.Month=_364.month;
}
if(_364.monthDates){
this.MonthDays=[];
for(var i=0;i<_364.monthDates.length;i++){
this.MonthDays.push(_364.monthDates[i]-1);
}
}
if(_364.daysOfMonth){
this.DaysOfMonth=new Array();
for(var a in _364.daysOfMonth){
var _369=new __sp_daysOfMonth_build(_364.daysOfMonth[a]);
(this.DaysOfMonth).push(_369);
}
}
}
}
catch(e){
__device_handle_exception(e,"__sp_calendar_addEntry_repeatRule: "+e);
}
};
function __sp_calendar_entry(_36a,str){
try{
if(_36a.type){
this.Type=_36a.type;
}
if(_36a.id){
this.id=_36a.id;
if(isUpdate){
if(_36a.time){
if(_36a.time.begin){
this.StartTime=_36a.time.begin;
}
if(_36a.time.end){
this.EndTime=_36a.time.end;
}
}
}
}
if(_36a.instanceStartTime){
this.InstanceStartTime=_36a.instanceStartTime;
}
if(_36a.description){
this.Description=_36a.description;
}else{
if(isUpdate&&(_36a.description==null)){
this.Description=" ";
}
}
if(_36a.summary){
this.Summary=_36a.summary;
}else{
if(isUpdate&&(_36a.summary==null)){
this.Summary=" ";
}
}
if(_36a.location){
this.Location=_36a.location;
}else{
if(isUpdate&&(_36a.location==null)){
this.Location=" ";
}
}
if(_36a.priority){
if((_36a.priority<0)||(_36a.priority>255)){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: "+str+" Priority is Invalid");
}else{
this.Priority=_36a.priority;
}
}else{
if(isUpdate&&(_36a.priority==null)){
this.Priority=0;
}
}
if(_36a.status){
this.Status=_36a.status;
if(_36a.status=="NeedsAction"||_36a.status=="Completed"){
this.Status="Todo"+_36a.status;
}
}
if(_36a.exceptionDates){
this.ExDates=_36a.exceptionDates;
}
if(_36a.repeatRule){
this.RepeatRule=new __sp_calendar_addEntry_repeatRule(_36a.repeatRule,str);
}
if(_36a.type!=undefined&&_36a.type!=null){
if(typeof this.Type!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: "+str+" Type is not a string");
}
switch(this.Type){
case "Meeting":
if(_36a.time){
if(_36a.time.begin){
this.StartTime=_36a.time.begin;
}
if(_36a.time.end){
this.EndTime=_36a.time.end;
}
}
break;
case "Reminder":
case "Anniversary":
if(_36a.time){
if(_36a.time.begin){
this.StartTime=_36a.time.begin;
}
}
break;
case "ToDo":
if(_36a.time){
if(_36a.time.end){
this.EndTime=_36a.time.end;
}
}
break;
case "DayEvent":
if(_36a.time){
if(_36a.time.begin){
this.StartTime=_36a.time.begin;
}
}
break;
default:
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: "+str+" Type is Invalid");
}
}
if(_36a.time){
if(_36a.time.alarm){
this.AlarmTime=_36a.time.alarm;
}
}
}
catch(e){
__device_handle_exception(e,"__sp_calendar_entry: "+e);
}
};
function __sp_calendar_iterator_get_next(){
var _36c=this.iter.getNext();
if(typeof _36c=="undefined"){
return null;
}
var _36d=new __sp_device_calendar_entry(_36c);
_36c.close();
return _36d;
};
function __sp_calendar_iterator(_36e){
this.iter=_36e;
this.next=__sp_calendar_iterator_get_next;
this.close=function(){
this.iter.close();
};
};
var CALENDAR_APP_ID=268458241;
function __sp_calendar_startEditor(_36f,_370,_371){
try{
if(!_36f){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Calendar: startEditor: callback is missing");
}else{
if(typeof _36f!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: startEditor: callback is invalid");
}
}
if(_371){
if(typeof _371!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: startEditor: error callback is invalid");
}
}
if(_370!=null){
throw new DeviceException(this.error.NOT_SUPPORTED_ERR,"Calendar: startEditor: Entry should be null");
}
var _372=function(arg1,arg2,arg3){
var iter=null;
_36f(iter);
if(arg2!=event_cancelled){
var iter=null;
if(arg3.ReturnValue){
iter=new __sp_calendar_iterator(arg3.ReturnValue);
}
_36f(iter);
}
if(arg3.ErrorCode!=0){
switch(arg3.ErrorCode){
case this.error.MISSING_ARG_ERR:
case this.error.INVALID_ARG_ERR:
case this.error.NOT_SUPPORTED_ERR:
if(arg3.ErrorMessage){
var _377=splitErrorMessage(arg3.ErrorMessage);
throw new DeviceException(MapErrorCode[arg3.ErrorCode],"Calendar: startEditor: "+_377);
}else{
throw new DeviceException(MapErrorCode[arg3.ErrorCode],"Calendar: startEditor: Operation Failed");
}
break;
default:
_371(new DeviceException(MapErrorCode[arg3.ErrorCode],"Calendar: startEditor: Operation Failed"));
}
}
};
__s60_start_and_wait(CALENDAR_APP_ID,"",_372);
return 0;
}
catch(e){
__device_handle_exception(e,"__sp_calendar_startEditor: "+e);
}
};
var __sp_calendar_entry_types="MeetingReminderToDoAnniversaryDayEvent";
function __sp_calendar_getList_cb(arg1,arg2,arg3){
var _37b;
var _37c;
var _37d;
_37b=glob_obj.getFromArray(arg1);
if(_37b){
_37c=_37b.success_cb;
_37d=_37b.error_cb;
}else{
alert("Calendar: __sp_calendar_getList_cb: Callback not found ");
return;
}
if(arg3.ErrorCode!=0){
_37d(new DeviceException(arg3.ErrorCode,"Calendar: getList: Operation Failed"));
return;
}
if(arg2!=event_cancelled){
var iter=null;
if(arg3.ReturnValue){
iter=new __sp_calendar_iterator(arg3.ReturnValue);
}
_37c(iter);
}
glob_obj.removeFromArray(arg1);
};
function __sp_calendar_getList(_37f,_380,_381){
try{
if(_380){
if(typeof _380!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: getList: match is invalid");
}
if(_380.id){
dataGetList=1;
if(typeof _380.id!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: getList: match is invalid");
}
}else{
dataGetList=0;
}
}
if(!_37f){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Calendar: getList: callback is missing");
}else{
if(typeof _37f!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: getList: callback is invalid");
}
}
if(_381){
if(typeof _381!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: getList: error callback is invalid");
}
if(_381==undefined||_381==null){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Calendar: getList: error callback is missing");
}
}
var _382={};
modifyObjectBaseProp(_382);
_382.Type="IncludeAll";
if(_380){
if(_380.id){
_382.id=_380.id;
}
if((_380.type)&&__sp_calendar_entry_types.match(_380.type)){
_382.Type=_380.type;
}else{
if((_380.type)&&typeof _380.type!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: getList: match is invalid");
}
}
if(_380.range){
if(_380.range.begin){
if(typeof (_380.range.begin)!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: getList: match is invalid");
}else{
if((_380.range.begin)=="Invalid Date"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: getList: match is invalid");
}else{
_382.StartRange=_380.range.begin;
}
}
}
if(_380.range.end){
if(typeof (_380.range.end)!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: getList: match is invalid");
}else{
if((_380.range.end)=="Invalid Date"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: getList: match is invalid");
}else{
_382.EndRange=_380.range.end;
}
}
}
if((_380.range.begin)&&(_380.range.end)){
if((_380.range.begin)>(_380.range.end)){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: getList: match is invalid");
}
}
}
if(_380.text){
if(typeof (_380.text)!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: getList: match is invalid");
}else{
_382.SearchText=_380.text;
}
}
}
var _383={};
modifyObjectBaseProp(_383);
_383.Type="CalendarEntry";
_383.Filter=_382;
temp_scb=_37f;
temp_ecb=_381;
var rval=this.so.IDataSource.GetList(_383,this.getListCb);
if(rval.TransactionID){
glob_obj.addToGlobalArray(rval.TransactionID,_37f,_381);
}
if(_383){
delete _383.Type;
delete _383.Filter;
}
if(rval.ErrorCode!=0){
switch(rval.ErrorCode){
case this.error.MISSING_ARG_ERR:
case this.error.INVALID_ARG_ERR:
case this.error.NOT_SUPPORTED_ERR:
if(rval.ErrorMessage){
var _385=splitErrorMessage(rval.ErrorMessage);
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Calendar: getList: "+_385);
}else{
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Calendar: getList: Operation Failed");
}
break;
default:
_381(new DeviceException(MapErrorCode[rval.ErrorCode],"Calendar: getList: Operation Failed"));
}
}
return rval.TransactionID;
}
catch(e){
__device_handle_exception(e,"sp_calendar_getList: "+e);
}
};
function __sp_calendar_add(_386){
if(_386){
if(typeof _386!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: addEntry: calendarEntry param is invalid");
}
if(_386.id){
_386.id=undefined;
}
if(!_386.type||!_386.time){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Calendar: addEntry: mandatory param missing");
}else{
if(typeof _386.type!="string"||typeof _386.time!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: addEntry: mandatory param missing");
}
}
if((_386.type!="ToDo")&&!_386.time.begin){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Calendar: addEntry: mandatory param StartTime missing");
}
if(!_386.time.end&&(_386.type=="ToDo"||_386.type=="Meeting")){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Calendar: addEntry: mandatory param EndTime missing");
}
if(_386.time.end&&_386.time.alarm){
if(_386.time.end<_386.time.alarm){
throw new DeviceException(this.error.NOT_SUPPORTED_ERR,"Calendar: addEntry: alarm time greater than end time:Not supported");
}
}
if(_386.type=="ToDo"){
if(_386.status==0){
if(typeof (_386.status)!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: addEntry: mandatory param missing");
}
}
}
if(_386.repeatRule){
if(typeof _386.repeatRule!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: addEntry: repeatRule param type is invalid");
}
if(!_386.repeatRule.frequency||_386.repeatRule.frequency==null){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Calendar: addEntry: mandatory param Frequency missing");
}
}
var _387=__sp_calendar_isInputValid(_386);
if(!_387){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: addEntry: calendarEntry param is invalid");
}
}else{
throw new DeviceException(this.error.MISSING_ARG_ERR,"Calendar: addEntry: mandatory param missing");
}
try{
var str="addEntry:";
var _389={};
modifyObjectBaseProp(_389);
_389.Type="CalendarEntry";
_389.Item=new __sp_calendar_entry(_386,str);
var _38a=this.so.IDataSource.Add(_389);
if(_389){
delete _389.Type;
delete _389.Item;
}
var _38b="Operation Failed";
if(_38a.ErrorMessage){
_38b=splitErrorMessage(_38a.ErrorMessage);
}
if(_38a.ErrorCode!=0){
throw new DeviceException(MapErrorCode[_38a.ErrorCode],"Calendar: addEntry: Operation Failed");
return;
}else{
var _38c=_38a.ReturnValue;
return _38c;
}
}
catch(e){
__device_handle_exception(e,"__sp_calendar_add: "+e);
}
};
function __sp_calendar_update(_38d){
isUpdate=1;
if(_38d){
if(typeof _38d!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: updateEntry: calendarEntry param is invalid");
}
if(!_38d.id){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Calendar: updateEntry: mandatory param - Id missing");
}
if(_38d.repeatRule){
if(typeof _38d.repeatRule!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: updateEntry: repeatRule param type is invalid");
}
if((_38d.repeatRule.frequency==null||_38d.repeatRule.frequency==undefined)){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: updateEntry: repeatRule param type is invalid");
}
if(_38d.repeatRule.startDate&&(_38d.repeatRule.startDate==null||_38d.repeatRule.startDate==undefined)){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: updateEntry: repeatRule param type is invalid");
}
if(_38d.repeatRule.untilDate&&(_38d.repeatRule.untilDate==null||_38d.repeatRule.untilDate==undefined)){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: updateEntry: repeatRule param type is invalid");
}
}
if(_38d.time){
if(_38d.time.end&&_38d.time.alarm){
if(_38d.time.alarm>_38d.time.end){
throw new DeviceException(this.error.NOT_SUPPORTED_ERR,"Calendar: updateEntry: alarm time greater than end time is not supported");
}
}
}
var _38e=__sp_calendar_isInputValid(_38d);
if(!_38e){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: updateEntry: calendarEntry param is invalid");
}
}else{
throw new DeviceException(this.error.MISSING_ARG_ERR,"Calendar: updateEntry: mandatory param missing");
}
try{
var str="updateEntry:";
var _390={};
modifyObjectBaseProp(_390);
_390.Type="CalendarEntry";
_390.Item=new __sp_calendar_entry(_38d,str);
isUpdate=0;
var _391=this.so.IDataSource.Add(_390);
if(_390){
delete _390.Type;
delete _390.Item;
}
var _392="Operation Failed";
if(_391.ErrorMessage){
_392=splitErrorMessage(_391.ErrorMessage);
}
if(_391.ErrorCode!=0){
throw new DeviceException(MapErrorCode[_391.ErrorCode],"Calendar: addEntry: Operation Failed");
return;
}else{
var _393=_391.ReturnValue;
return _393;
}
}
catch(e){
__device_handle_exception(e,"__sp_calendar_add: "+e);
}
};
function __sp_calendar_delete(data){
try{
if(data){
if(typeof data!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: deleteEntry: data is invalid");
}
if(!data.id){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Calendar: deleteEntry: id is missing");
}
var _395=__sp_calendar_isInputValid(data);
if(!_395){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: deleteEntry: delete data is invalid");
}
}else{
throw new DeviceException(this.error.MISSING_ARG_ERR,"Calendar: deleteEntry: data is missing");
}
var _396={};
modifyObjectBaseProp(_396);
_396.Type="CalendarEntry";
_396.Data={};
modifyObjectBaseProp(_396.Data);
_396.Data.IdList=[];
var list=[data.id];
_396.Data.IdList=list;
if(data.range){
if(data.range.begin){
_396.Data.StartRange=data.range.begin;
}
if(data.range.end){
_396.Data.EndRange=data.range.end;
}
}
var rval=this.so.IDataSource.Delete(_396);
if(_396){
delete _396.Type;
delete _396.Data.IdList;
delete _396.Data.StartRange;
delete _396.Data.EndRange;
}
if(list){
delete list.id;
}
if(rval.ErrorCode!=0){
if(rval.ErrorMessage){
var _399=splitErrorMessage(rval.ErrorMessage);
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Calendar: deleteEntry: "+_399);
}else{
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Calendar: deleteEntry: Operation Failed");
}
}
}
catch(e){
__device_handle_exception(e,"__sp_calendar_delete: "+e);
}
};
function __sp_calendar_cancel(_39a){
try{
if(!_39a||_39a==null||_39a==undefined){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Calendar: cancel: id is missing");
}
if(_39a){
if(typeof _39a!="number"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Calendar: cancel: id is missing");
}
}
var _39b={};
modifyObjectBaseProp(_39b);
_39b.TransactionID=_39a;
var _39c=this.so.IDataSource.Cancel(_39b);
if(_39b){
delete _39b.TransactionID;
}
if(_39c.ErrorCode!=0){
if(_39c.ErrorMessage){
var _39d=splitErrorMessage(_39c.ErrorMessage);
throw new DeviceException(MapErrorCode[_39c.ErrorCode],"Calendar: cancel: "+_39d);
}else{
throw new DeviceException(MapErrorCode[_39c.ErrorCode],"Calendar: cancel: Operation Failed");
}
}
}
catch(e){
__device_handle_exception(e,"__sp_calendar_cancel: "+e);
}
};
function __sp_calendar_instance(){
this.descriptor=new __sp_calendar_descriptor();
this.startEditor=__sp_calendar_startEditor;
this.getList=__sp_calendar_getList;
this.getListCb=__sp_calendar_getList_cb;
this.addEntry=__sp_calendar_add;
this.updateEntry=__sp_calendar_update;
this.deleteEntry=__sp_calendar_delete;
this.cancel=__sp_calendar_cancel;
this.error=new DeviceException(0,"Dummy");
this.so=null;
try{
this.so=device.getServiceObject("Service.Calendar","IDataSource");
}
catch(e){
__device_handle_exception(e,"Calendar service not available");
}
};
function __device_contacts_descriptor(_39e){
this.interfaceName=_39e.interfaceName;
this.version=_39e.version;
};
function __device_contacts_startEditor(_39f,_3a0,_3a1){
return this.provider.startEditor(_39f,_3a0,_3a1);
};
function __device_contacts_getContacts(_3a2,_3a3,_3a4,_3a5){
return this.provider.getContacts(_3a2,_3a3,_3a4,_3a5);
};
function __device_contacts_add(_3a6){
return this.provider.addContact(_3a6);
};
function __device_contacts_update(_3a7){
this.provider.updateContact(_3a7);
};
function __device_contacts_delete(id){
this.provider.deleteContacts(id);
};
function __device_contacts_getContactInfo(id){
return this.provider.getContactInfo(id);
};
function __device_contacts_addGroup(_3aa){
return this.provider.addGroup(_3aa);
};
function __device_contacts_getGroups(_3ab,_3ac){
return this.provider.getGroups(_3ab,_3ac);
};
function __device_contacts_deleteGroups(id){
this.provider.deleteGroups(id);
};
function __device_contacts_addContactsToGroup(_3ae,id){
this.provider.addContactsToGroup(_3ae,id);
};
function __device_contacts_getContactIds(_3b0,_3b1,_3b2,_3b3){
return this.provider.getContactIds(_3b0,_3b1,_3b2,_3b3);
};
function __device_contacts_getGroupIds(_3b4,_3b5){
return this.provider.getGroupIds(_3b4,_3b5);
};
function __device_contacts_removeContactsFromGroup(_3b6,id){
this.provider.removeContactsFromGroup(_3b6,id);
};
function __device_contacts_cancel(_3b8){
this.provider.cancel(_3b8);
};
function __device_contacts_updateGroup(_3b9){
this.provider.updateGroup(_3b9);
};
function __device_contacts_getGroupInfo(_3ba){
return this.provider.getGroupInfo(_3ba);
};
function __device_contacts(_3bb){
this.provider=_3bb;
this.interfaceName=_3bb.descriptor.interfaceName;
this.version=_3bb.descriptor.version;
this.SORT_ASCENDING=0;
this.SORT_DESCENDING=1;
this.startEditor=__device_contacts_startEditor;
this.getContacts=__device_contacts_getContacts;
this.addContact=__device_contacts_add;
this.updateContact=__device_contacts_update;
this.deleteContacts=__device_contacts_delete;
this.getContactInfo=__device_contacts_getContactInfo;
this.addGroup=__device_contacts_addGroup;
this.getGroups=__device_contacts_getGroups;
this.deleteGroups=__device_contacts_deleteGroups;
this.addContactsToGroup=__device_contacts_addContactsToGroup;
this.getContactIds=__device_contacts_getContactIds;
this.getGroupIds=__device_contacts_getGroupIds;
this.removeContactsFromGroup=__device_contacts_removeContactsFromGroup;
this.cancel=__device_contacts_cancel;
this.updateGroup=__device_contacts_updateGroup;
this.getGroupInfo=__device_contacts_getGroupInfo;
};
var __device_contacts_service_entry={"name":null,"version":null,"proto":__device_contacts,"descriptor":__device_contacts_descriptor,"providers":[{"descriptor":__sp_contacts_descriptor,"instance":__sp_contacts_instance}]};
function __sp_contacts_descriptor(){
this.interfaceName="contacts";
if(window.__Service_Interface_Ver){
this.version=__Service_Interface_Ver;
}else{
this.version=1;
}
};
function __s60_enumerate_contact_object(_3bc,_3bd,func,_3bf){
try{
var key;
for(key in _3bc){
var _3c1;
if(_3bd){
_3c1=_3bd+"."+key;
}else{
_3c1=key;
}
var _3c2=_3bc[key];
if(_3c2 instanceof Array){
func(_3c1,_3c2,_3bf);
}else{
if(_3c2 instanceof Date){
func(_3c1,_3c2,_3bf);
}else{
if(typeof _3c2=="object"){
__s60_enumerate_contact_object(_3c2,_3c1,func,_3bf);
}else{
func(_3c1,_3c2,_3bf);
}
}
}
}
}
catch(e){
throw e;
}
};
function __sp_contact_extract(name,_3c4,_3c5){
switch(name){
case "name.last":
_3c5.LastName={};
modifyObjectBaseProp(_3c5.LastName);
_3c5.LastName.Label="Last name";
_3c5.LastName.Value=_3c4;
break;
case "name.first":
_3c5.FirstName={};
modifyObjectBaseProp(_3c5.FirstName);
_3c5.FirstName.Label="First name";
_3c5.FirstName.Value=_3c4;
break;
case "name.middle":
_3c5.MiddleName={};
modifyObjectBaseProp(_3c5.MiddleName);
_3c5.MiddleName.Label="Middle name";
_3c5.MiddleName.Value=_3c4;
break;
case "name.prefix":
_3c5.Prefix={};
modifyObjectBaseProp(_3c5.Prefix);
_3c5.Prefix.Label="Prefix";
_3c5.Prefix.Value=_3c4;
break;
case "name.suffix":
_3c5.Suffix={};
modifyObjectBaseProp(_3c5.Suffix);
_3c5.Suffix.Label="Suffix";
_3c5.Suffix.Value=_3c4;
break;
case "tel.land":
_3c5.LandPhoneGen={};
modifyObjectBaseProp(_3c5.LandPhoneGen);
_3c5.LandPhoneGen.Label="Landline";
_3c5.LandPhoneGen.Value=_3c4;
break;
case "tel.mobile":
_3c5.MobilePhoneGen={};
modifyObjectBaseProp(_3c5.MobilePhoneGen);
_3c5.MobilePhoneGen.Label="Mobile";
_3c5.MobilePhoneGen.Value=_3c4;
break;
case "tel.video":
_3c5.VideoNumberGen={};
modifyObjectBaseProp(_3c5.VideoNumberGen);
_3c5.VideoNumberGen.Label="Video";
_3c5.VideoNumberGen.Value=_3c4;
break;
case "tel.fax":
_3c5.FaxNumberGen={};
modifyObjectBaseProp(_3c5.FaxNumberGen);
_3c5.FaxNumberGen.Label="Fax";
_3c5.FaxNumberGen.Value=_3c4;
break;
case "tel.voip":
_3c5.VOIPGen={};
modifyObjectBaseProp(_3c5.VOIPGen);
_3c5.VOIPGen.Label="Voip";
_3c5.VOIPGen.Value=_3c4;
break;
case "tel.home.land":
_3c5.LandPhoneHome={};
modifyObjectBaseProp(_3c5.LandPhoneHome);
_3c5.LandPhoneHome.Label="Home Landline";
_3c5.LandPhoneHome.Value=_3c4;
break;
case "tel.home.mobile":
_3c5.MobilePhoneHome={};
modifyObjectBaseProp(_3c5.MobilePhoneHome);
_3c5.MobilePhoneHome.Label="Home Mobile";
_3c5.MobilePhoneHome.Value=_3c4;
break;
case "tel.home.video":
_3c5.VideoNumberHome={};
modifyObjectBaseProp(_3c5.VideoNumberHome);
_3c5.VideoNumberHome.Label="Home Video";
_3c5.VideoNumberHome.Value=_3c4;
break;
case "tel.home.fax":
_3c5.FaxNumberHome={};
modifyObjectBaseProp(_3c5.FaxNumberHome);
_3c5.FaxNumberHome.Label="Home Fax";
_3c5.FaxNumberHome.Value=_3c4;
break;
case "tel.home.voip":
_3c5.VoipHome={};
modifyObjectBaseProp(_3c5.VoipHome);
_3c5.VoipHome.Label="Home Voip";
_3c5.VoipHome.Value=_3c4;
break;
case "tel.work.land":
_3c5.LandPhoneWork={};
modifyObjectBaseProp(_3c5.LandPhoneWork);
_3c5.LandPhoneWork.Label="Work Landline";
_3c5.LandPhoneWork.Value=_3c4;
break;
case "tel.work.mobile":
_3c5.MobilePhoneWork={};
modifyObjectBaseProp(_3c5.MobilePhoneWork);
_3c5.MobilePhoneWork.Label="Work Mobile";
_3c5.MobilePhoneWork.Value=_3c4;
break;
case "tel.work.video":
_3c5.VideoNumberWork={};
modifyObjectBaseProp(_3c5.VideoNumberWork);
_3c5.VideoNumberWork.Label="Work Video";
_3c5.VideoNumberWork.Value=_3c4;
break;
case "tel.work.fax":
_3c5.FaxNumberWork={};
modifyObjectBaseProp(_3c5.FaxNumberWork);
_3c5.FaxNumberWork.Label="Work Fax";
_3c5.FaxNumberWork.Value=_3c4;
break;
case "tel.work.voip":
_3c5.VoipWork={};
modifyObjectBaseProp(_3c5.VoipWork);
_3c5.VoipWork.Label="Work Voip";
_3c5.VoipWork.Value=_3c4;
break;
case "address.street":
_3c5.AddrStreetGen={};
modifyObjectBaseProp(_3c5.AddrStreetGen);
_3c5.AddrStreetGen.Label="Street Address";
_3c5.AddrStreetGen.Value=_3c4;
break;
case "address.local":
_3c5.AddrLocalGen={};
modifyObjectBaseProp(_3c5.AddrLocalGen);
_3c5.AddrLocalGen.Label="City";
_3c5.AddrLocalGen.Value=_3c4;
break;
case "address.region":
_3c5.AddrRegionGen={};
modifyObjectBaseProp(_3c5.AddrRegionGen);
_3c5.AddrRegionGen.Label="State/Province";
_3c5.AddrRegionGen.Value=_3c4;
break;
case "address.code":
_3c5.AddrPostCodeGen={};
modifyObjectBaseProp(_3c5.AddrPostCodeGen);
_3c5.AddrPostCodeGen.Label="Postal code";
_3c5.AddrPostCodeGen.Value=_3c4;
break;
case "address.country":
_3c5.AddrCountryGen={};
modifyObjectBaseProp(_3c5.AddrCountryGen);
_3c5.AddrCountryGen.Label="Country";
_3c5.AddrCountryGen.Value=_3c4;
break;
case "address.email":
_3c5.EmailGen={};
modifyObjectBaseProp(_3c5.EmailGen);
_3c5.EmailGen.Label="EMail";
_3c5.EmailGen.Value=_3c4;
break;
case "address.uri":
_3c5.URLGen={};
modifyObjectBaseProp(_3c5.URLGen);
_3c5.URLGen.Label="Website";
_3c5.URLGen.Value=_3c4;
break;
case "address.home.street":
_3c5.AddrStreetHome={};
modifyObjectBaseProp(_3c5.AddrStreetHome);
_3c5.AddrStreetHome.Label="Home Address";
_3c5.AddrStreetHome.Value=_3c4;
break;
case "address.home.local":
_3c5.AddrLocalHome={};
modifyObjectBaseProp(_3c5.AddrLocalHome);
_3c5.AddrLocalHome.Label="City";
_3c5.AddrLocalHome.Value=_3c4;
break;
case "address.home.region":
_3c5.AddrRegionHome={};
modifyObjectBaseProp(_3c5.AddrRegionHome);
_3c5.AddrRegionHome.Label="State/Province";
_3c5.AddrRegionHome.Value=_3c4;
break;
case "address.home.code":
_3c5.AddrPostCodeHome={};
modifyObjectBaseProp(_3c5.AddrPostCodeHome);
_3c5.AddrPostCodeHome.Label="Postal code";
_3c5.AddrPostCodeHome.Value=_3c4;
break;
case "address.home.country":
_3c5.AddrCountryHome={};
modifyObjectBaseProp(_3c5.AddrCountryHome);
_3c5.AddrCountryHome.Label="Country";
_3c5.AddrCountryHome.Value=_3c4;
break;
case "address.home.email":
_3c5.EmailHome={};
modifyObjectBaseProp(_3c5.EmailHome);
_3c5.EmailHome.Label="Home EMail";
_3c5.EmailHome.Value=_3c4;
break;
case "address.home.uri":
_3c5.URLHome={};
modifyObjectBaseProp(_3c5.URLHome);
_3c5.URLHome.Label="Home Website";
_3c5.URLHome.Value=_3c4;
break;
case "address.work.street":
_3c5.AddrStreetWork={};
modifyObjectBaseProp(_3c5.AddrStreetWork);
_3c5.AddrStreetWork.Label="Work Address";
_3c5.AddrStreetWork.Value=_3c4;
break;
case "address.work.local":
_3c5.AddrLocalWork={};
modifyObjectBaseProp(_3c5.AddrLocalWork);
_3c5.AddrLocalWork.Label="City";
_3c5.AddrLocalWork.Value=_3c4;
break;
case "address.work.region":
_3c5.AddrRegionWork={};
modifyObjectBaseProp(_3c5.AddrRegionWork);
_3c5.AddrRegionWork.Label="State/Province";
_3c5.AddrRegionWork.Value=_3c4;
break;
case "address.work.code":
_3c5.AddrPostCodeWork={};
modifyObjectBaseProp(_3c5.AddrPostCodeWork);
_3c5.AddrPostCodeWork.Label="Postal code";
_3c5.AddrPostCodeWork.Value=_3c4;
break;
case "address.work.country":
_3c5.AddrCountryWork={};
modifyObjectBaseProp(_3c5.AddrCountryWork);
_3c5.AddrCountryWork.Label="Country";
_3c5.AddrCountryWork.Value=_3c4;
break;
case "address.work.email":
_3c5.EmailWork={};
modifyObjectBaseProp(_3c5.EmailWork);
_3c5.EmailWork.Label="Work EMail";
_3c5.EmailWork.Value=_3c4;
break;
case "address.work.uri":
_3c5.URLWork={};
modifyObjectBaseProp(_3c5.URLWork);
_3c5.URLWork.Label="Work Website";
_3c5.URLWork.Value=_3c4;
break;
case "company.name":
_3c5.CompanyName={};
modifyObjectBaseProp(_3c5.CompanyName);
_3c5.CompanyName.Label="Company";
_3c5.CompanyName.Value=_3c4;
break;
case "company.title":
_3c5.JobTitle={};
modifyObjectBaseProp(_3c5.JobTitle);
_3c5.JobTitle.Label="Title";
_3c5.JobTitle.Value=_3c4;
break;
case "id":
_3c5.id=_3c4;
break;
case "notes":
_3c5.Note={};
modifyObjectBaseProp(_3c5.Note);
_3c5.Note.Label="Note";
_3c5.Note.Value=_3c4;
break;
case "anniversary":
_3c5.Anniversary={};
modifyObjectBaseProp(_3c5.Anniversary);
_3c5.Anniversary.Label="Anniversary";
_3c5.Anniversary.Value=_3c4;
break;
case "birthday":
_3c5.Date={};
modifyObjectBaseProp(_3c5.Date);
_3c5.Date.Label="BirthDay";
_3c5.Date.Value=_3c4;
break;
case "nickName":
_3c5.SecondName={};
modifyObjectBaseProp(_3c5.SecondName);
_3c5.SecondName.Label="NickName";
_3c5.SecondName.Value=_3c4;
break;
case "photo":
_3c5.CallerObjImg={};
modifyObjectBaseProp(_3c5.CallerObjImg);
_3c5.CallerObjImg.Label="CallerObjImg";
_3c5.CallerObjImg.Value=_3c4;
break;
case "xspid":
_3c5.IMPP={};
modifyObjectBaseProp(_3c5.IMPP);
_3c5.IMPP.Label="IMPP";
_3c5.IMPP.Value=_3c4;
break;
}
};
function __s60_enumerate_build_contact_object(_3c6,_3c7,func,_3c9){
var key;
for(key in _3c6){
var _3cb;
if(_3c7){
_3cb=_3c7+"."+key;
}else{
_3cb=key;
}
var _3cc=_3c6[key];
if(_3cb=="IMPP"){
func(_3cb,_3cc,_3c9);
}
if(typeof _3cc=="object"){
__s60_enumerate_build_contact_object(_3cc,_3cb,func,_3c9);
}else{
func(_3cb,_3cc,_3c9);
}
}
};
function __sp_device_contact_extract(name,_3ce,_3cf){
if(name=="id"){
_3cf.id=_3ce;
return;
}
if(!name.match(".Value")){
return;
}
try{
if(name.match("IMPP.Value.0")){
_3cf.xspid=[];
}
if(name.match("Name")){
if(name.match("CompanyName")){
if(!_3cf.company){
_3cf.company={};
}
}else{
if(!_3cf.name){
_3cf.name={};
}
}
}else{
if(name.match("Phone")||name.match("Number")||name.match("VOIP")||name.match("Voip")){
if(!_3cf.tel){
_3cf.tel={};
}
if(name.match("Home")){
if(!_3cf.tel.home){
_3cf.tel.home={};
}
}else{
if(name.match("Work")){
if(!_3cf.tel.work){
_3cf.tel.work={};
}
}
}
}else{
if(name.match("Addr")||name.match("Email")||name.match("URL")){
if(!_3cf.address){
_3cf.address={};
}
if(name.match("Home")){
if(!_3cf.address.home){
_3cf.address.home={};
}
}else{
if(name.match("Work")){
if(!_3cf.address.work){
_3cf.address.work={};
}
}
}
}else{
if(name.match("JobTitle")){
if(!_3cf.company){
_3cf.company={};
}
}
}
}
}
}
catch(e){
__device_handle_exception(e,"__sp_device_contact_extract: "+e);
}
if(name.match("IMPP.Value")){
var _3d0=name.split(".");
var _3d1=_3d0[2];
if(_3d1!=undefined){
_3cf.xspid[_3d0[2]]=_3ce;
return;
}
}
switch(name){
case "LastName.Value":
_3cf.name.last=_3ce;
break;
case "FirstName.Value":
_3cf.name.first=_3ce;
break;
case "MiddleName.Value":
_3cf.name.middle=_3ce;
break;
case "Prefix.Value":
_3cf.name.prefix=_3ce;
break;
case "Suffix.Value":
_3cf.name.suffix=_3ce;
break;
case "LandPhoneGen.Value":
_3cf.tel.land=_3ce;
break;
case "MobilePhoneGen.Value":
_3cf.tel.mobile=_3ce;
break;
case "VideoNumberGen.Value":
_3cf.tel.video=_3ce;
break;
case "FaxNumberGen.Value":
_3cf.tel.fax=_3ce;
break;
case "VOIPGen.Value":
_3cf.tel.voip=_3ce;
break;
case "LandPhoneHome.Value":
_3cf.tel.home.land=_3ce;
break;
case "MobilePhoneHome.Value":
_3cf.tel.home.mobile=_3ce;
break;
case "VideoNumberHome.Value":
_3cf.tel.home.video=_3ce;
break;
case "FaxNumberHome.Value":
_3cf.tel.home.fax=_3ce;
break;
case "VoipHome.Value":
_3cf.tel.home.voip=_3ce;
break;
case "LandPhoneWork.Value":
_3cf.tel.work.land=_3ce;
break;
case "MobilePhoneWork.Value":
_3cf.tel.work.mobile=_3ce;
break;
case "VideoNumberWork.Value":
_3cf.tel.work.video=_3ce;
break;
case "FaxNumberWork.Value":
_3cf.tel.work.fax=_3ce;
break;
case "VoipWork.Value":
_3cf.tel.work.voip=_3ce;
break;
case "AddrStreetGen.Value":
_3cf.address.street=_3ce;
break;
case "AddrLocalGen.Value":
_3cf.address.local=_3ce;
break;
case "AddrRegionGen.Value":
_3cf.address.region=_3ce;
break;
case "AddrPostCodeGen.Value":
_3cf.address.code=_3ce;
break;
case "AddrCountryGen.Value":
_3cf.address.country=_3ce;
break;
case "EmailGen.Value":
_3cf.address.email=_3ce;
break;
case "URLGen.Value":
_3cf.address.uri=_3ce;
break;
case "AddrStreetHome.Value":
_3cf.address.home.street=_3ce;
break;
case "AddrLocalHome.Value":
_3cf.address.home.local=_3ce;
break;
case "AddrRegionHome.Value":
_3cf.address.home.region=_3ce;
break;
case "AddrPostCodeHome.Value":
_3cf.address.home.code=_3ce;
break;
case "AddrCountryHome.Value":
_3cf.address.home.country=_3ce;
break;
case "EmailHome.Value":
_3cf.address.home.email=_3ce;
break;
case "URLHome.Value":
_3cf.address.home.uri=_3ce;
break;
case "AddrStreetWork.Value":
_3cf.address.work.street=_3ce;
break;
case "AddrLocalWork.Value":
_3cf.address.work.local=_3ce;
break;
case "AddrRegionWork.Value":
_3cf.address.work.region=_3ce;
break;
case "AddrPostCodeWork.Value":
_3cf.address.work.code=_3ce;
break;
case "AddrCountryWork.Value":
_3cf.address.work.country=_3ce;
break;
case "EmailWork.Value":
_3cf.address.work.email=_3ce;
break;
case "URLWork.Value":
_3cf.address.work.uri=_3ce;
break;
case "CompanyName.Value":
_3cf.company.name=_3ce;
break;
case "JobTitle.Value":
_3cf.company.title=_3ce;
break;
case "Note.Value":
_3cf.notes=_3ce;
break;
case "Anniversary.Value":
_3cf.anniversary=_3ce;
break;
case "Date.Value":
_3cf.birthday=_3ce;
break;
case "SecondName.Value":
_3cf.nickName=_3ce;
break;
case "CallerObjImg.Value":
_3cf.photo=_3ce;
break;
default:
}
};
function __sp_device_contact_build(_3d2,_3d3){
__s60_enumerate_build_contact_object(_3d2,null,__sp_device_contact_extract,_3d3);
};
function __sp_contact_iterator_get_next(){
var _3d4=this.iter.getNext();
if(typeof _3d4=="undefined"){
return null;
}
var rval={};
__sp_device_contact_build(_3d4,rval);
_3d4.close();
return rval;
};
function __sp_contact_iterator(_3d6){
this.iter=_3d6;
this.next=__sp_contact_iterator_get_next;
this.close=function(){
this.iter.close();
};
};
function __s60_enumerate_group_object(_3d7,func,_3d9){
var key;
for(key in _3d7){
var _3db=key;
var _3dc=_3d7[key];
func(_3db,_3dc,_3d9);
}
};
function __sp_device_groupinfo_extract(name,_3de,_3df){
if(_3df.group==undefined){
_3df.group={};
}
if(name=="id"){
_3df.group.groupId=_3de;
}else{
if(name=="GroupLabel"){
_3df.group.groupName=_3de;
}else{
if(name=="Contents"){
_3df.contents=_3de;
}
}
}
return;
};
function __sp_device_groupinfo_build(_3e0,_3e1){
__s60_enumerate_group_object(_3e0,__sp_device_groupinfo_extract,_3e1);
};
function __sp_groupinfo_iterator_get_next(){
var _3e2=this.iter.getNext();
if(typeof _3e2=="undefined"){
return null;
}
var rval={};
__sp_device_groupinfo_build(_3e2,rval);
_3e2.close();
return rval;
};
function __sp_groupinfo_iterator(_3e4){
this.iter=_3e4;
this.next=__sp_groupinfo_iterator_get_next;
this.close=function(){
this.iter.close();
};
};
function __sp_device_group_extract(name,_3e6,_3e7){
if(name=="id"){
_3e7.groupId=_3e6;
return;
}
if(name=="GroupLabel"){
_3e7.groupName=_3e6;
return;
}
};
function __sp_device_group_build(_3e8,_3e9){
__s60_enumerate_object(_3e8,null,__sp_device_group_extract,_3e9);
};
function __sp_group_iterator_get_next(){
var _3ea=this.iter.getNext();
if(typeof _3ea=="undefined"){
return null;
}
var rval={};
__sp_device_group_build(_3ea,rval);
_3ea.close();
return rval;
};
function __sp_group_iterator(_3ec){
this.iter=_3ec;
this.next=__sp_group_iterator_get_next;
this.close=function(){
this.iter.close();
};
};
var CONTACTS_APP_ID=270486734;
function __sp_contacts_startEditor(_3ed,_3ee,_3ef){
if(!_3ed){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Contacts: StartEditor:Missing Success Callback");
}
if((typeof _3ed)!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: StartEditor:Invalid Success Callback");
}
if((_3ee)==null){
_3ee={};
}
if((typeof _3ee)=="undefined"){
_3ee={};
}
if((_3ee)==undefined){
_3ee={};
}
if((typeof _3ee)!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: StartEditor:Invalid Contact Data");
}
if(_3ef){
if((typeof _3ef)!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts :StartEditor:Invalid Error Callback");
}
}
var _3f0=function(arg1,arg2,arg3){
var iter=null;
_3ed(iter);
};
__s60_start_and_wait(CONTACTS_APP_ID,"",_3f0);
return 0;
};
function __sp_contacts_getContacts_cb(arg1,arg2,arg3){
var iter=null;
var _3f9;
var _3fa;
var _3fb;
_3fb=glob_obj.getFromArray(arg1);
if(_3fb){
_3f9=_3fb.success_cb;
_3fa=_3fb.error_cb;
}else{
alert("Contacts: __sp_contacts_getContacts_cb : Callback not found ");
return;
}
if(arg3.ReturnValue){
iter=new __sp_contact_iterator(arg3.ReturnValue);
}else{
if(arg3.ErrorCode!=0){
var _3fc;
if(arg3.ErrorMessage){
_3fc=splitErrorMessage(arg3.ErrorMessage);
}else{
_3fc="Operation Failed";
}
_3fa(new DeviceException(MapErrorCode[arg3.ErrorCode],"Contacts: getContacts: "+_3fc));
return;
}
}
_3f9(iter);
glob_obj.removeFromArray(arg1);
};
function __sp_contacts_getContacts(_3fd,_3fe,_3ff,_400){
var _401={};
modifyObjectBaseProp(_401);
_401.Type="Contact";
if(_3fe){
_401.Filter={};
modifyObjectBaseProp(_401.Filter);
_401.Filter.SearchVal=_3fe;
}
if(_3ff!=null&&_3ff!=undefined){
_401.Sort={};
modifyObjectBaseProp(_401.Sort);
if(typeof _3ff=="number"){
if(_3ff==this.SORT_ASCENDING){
_401.Sort.Order="Ascending";
}else{
if(_3ff==this.SORT_DESCENDING){
_401.Sort.Order="Descending";
}else{
_400(new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"Contacts: getContacts: invalid sortOrder input"));
return;
}
}
}else{
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: getContacts: invalid sortOrder input");
}
}
try{
if(!_3fd){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Contacts: getContacts: callback is missing");
}else{
if(typeof _3fd!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: getContacts: callback is invalid");
}
}
if(_400){
if(typeof (_400)!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: getContacts: ErrorCallback is invalid");
}
}
temp_scb=_3fd;
temp_ecb=_400;
var rval=this.so.IDataSource.GetList(_401,this.getContactsCb);
if(rval.TransactionID){
glob_obj.addToGlobalArray(rval.TransactionID,_3fd,_400);
}
if(_401.Sort){
delete _401.Sort.Order;
}
if(_401.Filter){
delete _401.Filter.SearchVal;
}
if(_401){
delete _401.Type;
delete _401.Filter;
delete _401.Sort;
}
if(rval.ErrorCode!=0){
var _403=mappingVerification(rval.ErrorCode);
var _404=null;
if(rval.ErrorMessage){
_404=splitErrorMessage(rval.ErrorMessage);
}
if(_403){
switch(MapErrorCode[rval.ErrorCode]){
case this.error.MISSING_ARG_ERR:
case this.error.INVALID_ARG_ERR:
case this.error.NOT_SUPPORTED_ERR:
if(_404){
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getContacts: "+_404);
}else{
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getContacts:Operation Failed");
}
break;
default:
if(_400!=undefined){
if(_404){
_400(new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getContacts: "+_404));
}else{
_400(new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getContacts:Operation Failed "));
}
}else{
if(_404){
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getContacts: "+_404);
}else{
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getContacts:Operation Failed");
}
}
}
}else{
if(_400!=undefined){
if(_404){
_400(new DeviceException(rval.ErrorCode,"Contacts: getContacts: "+_404));
}else{
_400(new DeviceException(rval.ErrorCode,"getContacts:Operation Failed "));
}
}else{
if(_404){
throw new DeviceException(rval.ErrorCode,"Contacts: getContacts: "+_404);
}else{
throw new DeviceException(rval.ErrorCode,"Contacts: getContacts:Operation Failed");
}
}
}
}
return rval.TransactionID;
}
catch(e){
__device_handle_exception(e,"__sp_contacts_getContacts: "+e);
}
};
function __sp_contacts_add(_405){
if((_405)==null){
throw new DeviceException(this.error.MISSING_ARG_ERR,"addContact:Contact Data Needed");
}
if((typeof _405)=="undefined"){
throw new DeviceException(this.error.MISSING_ARG_ERR,"addContact:Contact Data Needed");
}
if((_405)==undefined){
throw new DeviceException(this.error.MISSING_ARG_ERR,"addContact:Contact Data Needed");
}
if((typeof _405)!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"addContact:Invalid Contact Data");
}
var _406={};
modifyObjectBaseProp(_406);
__s60_enumerate_contact_object(_405,null,__sp_contact_extract,_406);
var _407={};
modifyObjectBaseProp(_407);
_407.Type="Contact";
_407.Data=_406;
try{
if(_406.id){
throw new DeviceException(this.error.NOT_SUPPORTED_ERR,"Contacts: addContact: Id Not Supported");
}
var _408=this.so.IDataSource.Add(_407);
if(_406){
delete _406.id;
}
if(_407){
delete _407.Type;
delete _407.Data;
}
var _409=_408["ReturnValue"];
if(_408.ErrorCode!=0){
var _40a=mappingVerification(_408.ErrorCode);
if(_408.ErrorMessage){
var _40b=splitErrorMessage(_408.ErrorMessage);
if(_40a){
throw new DeviceException(MapErrorCode[_408.ErrorCode],"Contacts: addContact: "+_40b);
}else{
throw new DeviceException(_408.ErrorCode,"Contacts: addContact: "+_40b);
}
}else{
if(_40a){
throw new DeviceException(MapErrorCode[_408.ErrorCode],"Contacts: addContact: Operation Failed");
}else{
throw new DeviceException(_408.ErrorCode,"Contacts: addContact: Operation Failed");
}
}
}
return _409;
}
catch(e){
__device_handle_exception(e,"__sp_contacts_addContact: "+e);
}
};
function __sp_contacts_update(_40c){
try{
if(!(_40c&&_40c.id)){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Contacts: updateContact: contact is missing");
}
var _40d={};
modifyObjectBaseProp(_40d);
__s60_enumerate_contact_object(_40c,null,__sp_contact_extract,_40d);
if(_40d.id==undefined){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: updateContact: Invalid id type");
}
if(typeof _40d.id!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: updateContact: Invalid id type");
}
var _40e={};
modifyObjectBaseProp(_40e);
_40e.Type="Contact";
_40e.Data=_40d;
var _40f=this.so.IDataSource.Add(_40e);
if(_40d){
delete _40d.id;
}
if(_40e){
delete _40e.Type;
delete _40e.Data;
}
if(_40f.ErrorCode!=0){
var _410=mappingVerification(_40f.ErrorCode);
if(_40f.ErrorMessage){
var _411=splitErrorMessage(_40f.ErrorMessage);
if(_410){
throw new DeviceException(MapErrorCode[_40f.ErrorCode],"Contacts: updateContact: "+_411);
}else{
throw new DeviceException(_40f.ErrorCode,"Contacts: updateContact: "+_411);
}
}else{
if(_410){
throw new DeviceException(MapErrorCode[_40f.ErrorCode],"Contacts: updateContact: Operation Failed");
}else{
throw new DeviceException(_40f.ErrorCode,"Contacts: updateContact: Operation Failed");
}
}
}
}
catch(e){
__device_handle_exception(e,"__sp_contacts_updateContact: "+e);
}
};
function __sp_contacts_delete(id){
__device_debug("sp_contacts_delete id: "+id);
var _413={};
modifyObjectBaseProp(_413);
if(id==undefined){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Contacts: deleteContacts: idlist is missing");
}
if(typeof id=="object"){
_413.IdList=id;
}else{
_413.IdList=[];
_413.IdList[0]=id;
}
var _414={};
modifyObjectBaseProp(_414);
_414.Type="Contact";
_414.Data=_413;
try{
var _415=this.so.IDataSource.Delete(_414);
if(_413){
delete _413.IdList;
}
if(_414){
delete _414.Type;
delete _414.Data;
}
if(_415.ErrorCode!=0){
var _416=mappingVerification(_415.ErrorCode);
if(_415.ErrorMessage){
var _417=splitErrorMessage(_415.ErrorMessage);
if(_416){
throw new DeviceException(MapErrorCode[_415.ErrorCode],"Contacts: deleteContacts: "+_417);
}else{
throw new DeviceException(_415.ErrorCode,"Contacts: deleteContacts: "+_417);
}
}else{
if(_416){
throw new DeviceException(MapErrorCode[_415.ErrorCode],"Contacts: deleteContacts: Operation Failed");
}else{
throw new DeviceException(_415.ErrorCode,"Contacts: deleteContacts: Operation Failed");
}
}
}
}
catch(e){
__device_handle_exception(e,"__sp_contacts_deleteContacts: "+e);
}
};
function __sp_contacts_get(id){
var _419={};
modifyObjectBaseProp(_419);
_419.Type="Contact";
if(id==null){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Contacts: getContactInfo: id should not be null");
}
if(typeof id!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: getContactInfo: id should be string");
}
_419.Filter={};
modifyObjectBaseProp(_419.Filter);
_419.Filter.id=id;
try{
var rval=this.so.IDataSource.GetList(_419);
if(_419.Filter){
delete _419.Filter.id;
}
if(_419){
delete _419.Type;
delete _419.Filter;
}
if(rval){
if(rval.ErrorCode!=0){
var _41b=mappingVerification(rval.ErrorCode);
if(rval.ErrorMessage){
var _41c=splitErrorMessage(rval.ErrorMessage);
if(_41b){
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getContactInfo: "+_41c);
}else{
throw new DeviceException(rval.ErrorCode,"Contacts: getContactInfo: "+_41c);
}
}else{
if(_41b){
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getContactInfo: Operation Failed");
}else{
throw new DeviceException(rval.ErrorCode,"Contacts: getContactInfo: Operation Failed");
}
}
}
var _41d={};
modifyObjectBaseProp(_41d);
var _41e=rval.ReturnValue.getNext();
__sp_device_contact_build(_41e,_41d);
return _41d;
}
}
catch(e){
__device_handle_exception(e,"__sp_contacts_getContactInfo:"+e);
}
};
function __sp_contacts_addGroup(_41f){
var _420={};
modifyObjectBaseProp(_420);
_420.GroupLabel=_41f;
if(typeof (_420.GroupLabel)==null){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Contacts: addGroups: callback is missing");
}
if((typeof _420.GroupLabel)=="undefined"){
throw new DeviceException(this.error.MISSING_ARG_ERR,"addGroup:Group Data Needed");
}
if((_420.GroupLabel)==undefined){
throw new DeviceException(this.error.MISSING_ARG_ERR,"addGroup:Group Data Needed");
}
var _421={};
modifyObjectBaseProp(_421);
_421.Type="Group";
_421.Data=_420;
try{
var _422=this.so.IDataSource.Add(_421);
if(_420){
delete _420.GroupLabel;
}
if(_421){
delete _421.Type;
delete _421.Data;
}
var _423=_422["ReturnValue"];
if(_422.ErrorCode!=0){
var _424=mappingVerification(_422.ErrorCode);
if(_422.ErrorMessage){
var _425=splitErrorMessage(_422.ErrorMessage);
if(_424){
throw new DeviceException(MapErrorCode[_422.ErrorCode],"Contacts: addGroup: "+_425);
}else{
throw new DeviceException(_425,_422.ErrorCode,"Contacts: addGroup: Operation Failed ");
}
}else{
if(_424){
throw new DeviceException(MapErrorCode[_422.ErrorCode],"Contacts: addGroup: Operation Failed");
}else{
throw new DeviceException(_422.ErrorCode,"Contacts: addGroup: Operation Failed");
}
}
}
return _423;
}
catch(e){
__device_handle_exception(e,"__sp_contacts_addGroup: "+e);
}
};
function __sp_contacts_getGroups_cb(arg1,arg2,arg3){
var iter=null;
var _42a;
var _42b;
var _42c;
_42c=glob_obj.getFromArray(arg1);
if(_42c){
_42a=_42c.success_cb;
_42b=_42c.error_cb;
}else{
return;
}
iter=arg3.ReturnValue;
if(arg3.ReturnValue){
iter=new __sp_groupinfo_iterator(arg3.ReturnValue);
}else{
if(arg3.ErrorCode!=0){
var _42d;
if(arg3.ErrorMessage){
_42d=splitErrorMessage(arg3.ErrorMessage);
}else{
_42d="Operation Failed";
}
_42b(new DeviceException(_42d,MapErrorCode[arg3.ErrorCode],"Contacts: getGroups:"));
return;
}
}
_42a(iter);
glob_obj.removeFromArray(arg1);
};
function __sp_contacts_getGroups(_42e,_42f){
var _430={};
modifyObjectBaseProp(_430);
_430.Type="Group";
try{
if(!_42e){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Contacts: getGroups: callback is missing");
}else{
if(typeof _42e!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: getGroups: callback is invalid");
}
}
if(_42f){
if(typeof (_42f)!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: getGroups: ErrorCallback is invalid");
}
}
temp_scb=_42e;
temp_ecb=_42f;
var rval=this.so.IDataSource.GetList(_430,this.getGroupsCb);
if(rval.TransactionID){
glob_obj.addToGlobalArray(rval.TransactionID,_42e,_42f);
}
if(_430){
delete _430.Type;
}
if(rval.ErrorCode!=0){
var _432=mappingVerification(rval.ErrorCode);
var _433=null;
if(rval.ErrorMessage){
_433=splitErrorMessage(rval.ErrorMessage);
}
if(_432){
switch(MapErrorCode[rval.ErrorCode]){
case this.error.MISSING_ARG_ERR:
case this.error.INVALID_ARG_ERR:
case this.error.NOT_SUPPORTED_ERR:
if(_433){
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getGroups: "+_433);
}else{
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getGroups: Operation Failed");
}
break;
default:
if(_42f!=undefined){
if(_433){
_42f(new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getGroups: "+_433));
}else{
_42f(new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts:  getGroups: Operation Failed "));
}
}else{
if(_433){
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getGroups: Operation Failed"+_433);
}else{
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getGroups: Operation Failed");
}
}
}
}else{
if(_42f!=undefined){
if(_433){
_42f(new DeviceException(rval.ErrorCode,"Contacts: getGroups: "+_433));
}else{
_42f(new DeviceException(rval.ErrorCode,"Contacts: getGroups: Operation Failed"));
}
}else{
if(_433){
throw new DeviceException(rval.ErrorCode,"Contacts: getGroups: Operation Failed"+_433);
}else{
throw new DeviceException(rval.ErrorCode,"Contacts: getGroups: Operation Failed");
}
}
}
}
return rval.TransactionID;
}
catch(e){
__device_handle_exception(e,"__sp_contacts_getGroups: "+e);
}
};
function __sp_contacts_deleteGroups(id){
var _435={};
modifyObjectBaseProp(_435);
var _436=[];
if(typeof id=="object"){
var i=0;
for(var val in id){
_436[i]=id[val];
i++;
}
}else{
_436[0]=id;
}
_435.IdList=[];
_435.IdList=_436;
var _439={};
modifyObjectBaseProp(_439);
_439.Type="Group";
_439.Data=_435;
try{
var _43a=this.so.IDataSource.Delete(_439);
if(_43a.ErrorCode!=0){
var _43b=mappingVerification(_43a.ErrorCode);
if(_43a.ErrorMessage){
var _43c=splitErrorMessage(_43a.ErrorMessage);
if(_43b){
throw new DeviceException(MapErrorCode[_43a.ErrorCode],"Contacts: deleteGroups: "+_43c);
}else{
throw new DeviceException(_43a.ErrorCode,"Contacts: deleteGroups: "+_43c);
}
}else{
if(_43b){
throw new DeviceException(MapErrorCode[_43a.ErrorCode],"Contacts: deleteGroups: Operation Failed");
}else{
throw new DeviceException(_43a.ErrorCode,"Contacts: deleteGroups: Operation Failed");
}
}
}
}
catch(e){
__device_handle_exception(e,"__sp_contacts_deleteGroups: "+e);
}
};
function __sp_contacts_addContactsToGroup(_43d,id1){
try{
var _43f={};
modifyObjectBaseProp(_43f);
var _440=false;
_43f.Type="Group";
var map={};
modifyObjectBaseProp(map);
var _442=[];
if(typeof id1=="object"){
var i=0;
for(var val in id1){
_442[i]=id1[val];
i++;
}
}else{
_442[0]=id1;
}
map.IdList=_442;
_440=true;
delete _442.index;
if(_43d!=undefined){
map.id=_43d;
_440=true;
}
if(_440){
_43f.Data=map;
}
_43f.OperationType="Associate";
var _445=this.so.IDataSource.Organise(_43f);
if(map){
delete map.id;
delete map.IdList;
}
if(_43f){
delete _43f.Data;
delete _43f.OperationType;
delete _43f.Type;
}
if(_445.ErrorCode!=0){
var _446=mappingVerification(_445.ErrorCode);
if(_445.ErrorMessage){
var _447=splitErrorMessage(_445.ErrorMessage);
if(_446){
throw new DeviceException(MapErrorCode[_445.ErrorCode],"Contacts: addContactsToGroup: "+_447);
}else{
throw new DeviceException(_445.ErrorCode,"Contacts: addContactsToGroup: "+_447);
}
}else{
if(_446){
throw new DeviceException(MapErrorCode[_445.ErrorCode],"Contacts: addContactsToGroup: Operation Failed");
}else{
throw new DeviceException(_445.ErrorCode,"Contacts: addContactsToGroup: Operation Failed");
}
}
}
}
catch(e){
__device_handle_exception(e,"__sp_contacts_addContactsToGroup: "+e);
}
};
function __sp_contacts_getContactIds_cb(arg1,arg2,arg3){
var item=null;
var _44c=null;
var _44d;
var _44e;
var _44f;
_44f=glob_obj.getFromArray(arg1);
if(_44f){
_44d=_44f.success_cb;
_44e=_44f.error_cb;
}else{
alert("Contacts: __sp_contacts_getContactIds_cb : Callback not found ");
return;
}
var id=null;
if(arg3["ReturnValue"]!=undefined){
item=arg3["ReturnValue"];
id=item["IdList"];
_44c=[];
_44c=id;
delete _44c.index;
}else{
if(arg3.ErrorCode!=0){
var _451;
if(arg3.ErrorMessage){
_451=splitErrorMessage(arg3.ErrorMessage);
}else{
_451="Operation Failed";
}
_44e(new DeviceException(MapErrorCode[arg3.ErrorCode],"Contacts: getContactIds:"+_451));
return;
}
}
_44d(_44c);
glob_obj.removeFromArray(arg1);
};
function __sp_contacts_getContactIds(_452,_453,_454,_455){
var _456={};
modifyObjectBaseProp(_456);
_456.Type="Contact";
if(_453){
_456.Filter={};
modifyObjectBaseProp(_456.Filter);
_456.Filter.SearchVal=_453;
}
if(_454!=null&&_454!=undefined){
_456.Sort={};
modifyObjectBaseProp(_456.Sort);
if(typeof _454=="number"){
if(_454==this.SORT_ASCENDING){
_456.Sort.Order="Ascending";
}else{
if(_454==this.SORT_DESCENDING){
_456.Sort.Order="Descending";
}else{
_455(new DeviceException(this.error.DATA_OUT_OF_RANGE_ERR,"Contacts: getContacts: invalid sortOrder input"));
return;
}
}
}else{
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: getContactIds: SortOrder is Invalid");
}
}
try{
if(!_452){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Contacts: getContactIds: callback is missing");
}else{
if(typeof _452!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: getContactIds: callback is invalid");
}
}
if(_455){
if(typeof (_455)!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: getContactIds: ErrorCallback is invalid");
}
}
temp_scb=_452;
temp_ecb=_455;
var rval=this.so.IDataSource.GetIds(_456,this.getContactIdsCb);
if(rval.TransactionID){
glob_obj.addToGlobalArray(rval.TransactionID,_452,_455);
}
if(rval.ErrorCode!=0){
var _458=mappingVerification(rval.ErrorCode);
var _459=null;
if(rval.ErrorMessage){
var _459=splitErrorMessage(rval.ErrorMessage);
}
if(_458){
switch(MapErrorCode[rval.ErrorCode]){
case this.error.MISSING_ARG_ERR:
case this.error.INVALID_ARG_ERR:
case this.error.NOT_SUPPORTED_ERR:
if(_459){
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getContactIds: "+_459);
}else{
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getContactIds: Operation Failed");
}
break;
default:
if(_455!=undefined){
if(_459){
_455(new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getContactIds: "+_459));
}else{
_455(new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getContactIds: Operation Failed "));
}
}else{
if(_459){
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getContactIds:"+_459);
}else{
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getContactIds: Operation Failed");
}
}
}
}else{
if(_455!=undefined){
if(_459){
_455(new DeviceException(rval.ErrorCode,"Contacts: getContactIds: "+_459));
}else{
_455(new DeviceException(rval.ErrorCode,"Contacts: getContactIds: Operation Failed "));
}
}else{
if(_459){
throw new DeviceException(rval.ErrorCode,"Contacts: getContactIds:"+_459);
}else{
throw new DeviceException(rval.ErrorCode,"Contacts: getContactIds: Operation Failed");
}
}
}
}
return rval.TransactionID;
}
catch(e){
__device_handle_exception(e,"__sp_contacts_getContactIds: "+e);
}
};
function __sp_contacts_getGroupIds_cb(arg1,arg2,arg3){
var _45d=null;
var item=null;
var _45f=[];
var _460;
var _45d;
var _461;
_461=glob_obj.getFromArray(arg1);
if(_461){
_460=_461.success_cb;
_45d=_461.error_cb;
}else{
return;
}
if(arg3.ReturnValue){
item=arg3["ReturnValue"];
arg3.ReturnValue.close();
var id=item["IdList"];
_45f=id;
}else{
if(arg3.ErrorCode!=0){
var _463;
if(rval.ErrorMessage){
_463=splitErrorMessage(rval.ErrorMessage);
}else{
_463="Operation Failed";
}
_45d(new DeviceException(MapErrorCode[arg3.ErrorCode],"Contacts: getGroupIds:"+_463));
return;
}
}
_460(_45f);
delete _45f.index;
glob_obj.removeFromArray(arg1);
};
function __sp_contacts_getGroupIds(_464,_465){
var _466={};
modifyObjectBaseProp(_466);
_466.Type="Group";
try{
if(!_464){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Contacts: getGroupIds: callback is missing");
}else{
if(typeof _464!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: getGroupIds: callback is invalid");
}
}
if(_465){
if(typeof (_465)!="function"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: getGroupIds: ErrorCallback is invalid");
}
}
temp_scb=_464;
temp_ecb=_465;
var rval=this.so.IDataSource.GetIds(_466,this.getGroupIdsCb);
if(rval.TransactionID){
glob_obj.addToGlobalArray(rval.TransactionID,_464,_465);
}
if(_466){
delete _466.Type;
}
if(rval.ErrorCode!=0){
var _468=mappingVerification(rval.ErrorCode);
var _469=null;
if(rval.ErrorMessage){
var _469=splitErrorMessage(rval.ErrorMessage);
}
if(_468){
switch(rval.ErrorCode){
case this.error.MISSING_ARG_ERR:
case this.error.INVALID_ARG_ERR:
case this.error.NOT_SUPPORTED_ERR:
if(_469){
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getGroupIds: "+_469);
}else{
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getGroupIds: Operation Failed");
}
break;
default:
if(_465!=undefined){
if(_469){
_465(new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getGroupIds: "+_469));
}else{
_465(new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getGroupIds: Operation Failed"));
}
}else{
if(_469){
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: Contacts: getGroupIds:"+_469);
}else{
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getGroupIds: Operation Failed");
}
}
}
}else{
if(_465!=undefined){
if(_469){
_465(new DeviceException(rval.ErrorCode,"Contacts: getGroupIds: "+_469));
}else{
_465(new DeviceException(rval.ErrorCode,"Contacts: getGroupIds: Operation Failed"));
}
}else{
if(_469){
throw new DeviceException(rval.ErrorCode,"Contacts: Contacts: getGroupIds:"+_469);
}else{
throw new DeviceException(rval.ErrorCode,"Contacts: getGroupIds: Operation Failed");
}
}
}
}
return rval.TransactionID;
}
catch(e){
__device_handle_exception(e,"__sp_contacts_getGroupIds: "+e);
}
};
function __sp_contacts_removeContactsFromGroup(_46a,id){
try{
var _46c={};
modifyObjectBaseProp(_46c);
var _46d=false;
_46c.Type="Group";
var map={};
if(id!=undefined){
var _46f=[];
if(typeof id=="object"){
var i=0;
for(var val in id){
_46f[i]=id[val];
i++;
}
}else{
_46f[0]=id;
}
map.IdList=_46f;
_46d=true;
}
if(_46a!=undefined){
map.id=_46a;
_46d=true;
}
if(_46d){
_46c.Data=map;
}
_46c.OperationType="Disassociate";
var _472=this.so.IDataSource.Organise(_46c);
if(map){
delete map.IdList;
}
if(_46c){
delete _46c.Data;
delete _46c.OperationType;
delete _46c.Type;
}
if(_472.ErrorCode!=0){
var _473=mappingVerification(_472.ErrorCode);
if(_472.ErrorMessage){
var _474=splitErrorMessage(_472.ErrorMessage);
if(_473){
throw new DeviceException(MapErrorCode[_472.ErrorCode],"Contacts: removeContactsFromGroup: "+_474);
}else{
throw new DeviceException(_472.ErrorCode,"Contacts: removeContactsFromGroup: "+_474);
}
}else{
if(_473){
throw new DeviceException(MapErrorCode[_472.ErrorCode],"Contacts: removeContactsFromGroup: Operation Failed");
}else{
throw new DeviceException(_472.ErrorCode,"Contacts: removeContactsFromGroup: Operation Failed");
}
}
}
}
catch(e){
__device_handle_exception(e,"__sp_contacts_removeContactsFromGroup: "+e);
}
};
function __sp_contacts_cancel(_475){
try{
var _476={};
if((_475)==null){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Contacts: cancel: transactionId is missing ");
}
if((_475)==undefined){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Contacts: cancel:transactionId is undefined ");
}
if((typeof _475)=="undefined"){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Contacts: cancel: transactionId is undefined ");
}
if(((typeof _475)!="number")||(_475<=0)){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: cancel: transactionId is Invalid");
}
modifyObjectBaseProp(_476);
_476.TransactionID=_475;
var _477=this.so.IDataSource.Cancel(_476);
if(_476){
delete _476.TransactionID;
}
var _478=_477["ErrorCode"];
if(_478!=0){
var _479=mappingVerification(_477.ErrorCode);
if(_477["ErrorMessage"]){
var _47a=splitErrorMessage(_477.ErrorMessage);
if(_479){
throw new DeviceException(MapErrorCode[_478],"Contacts: cancel: "+_47a);
}else{
throw new DeviceException(_478,"Contacts: cancel: "+_47a);
}
}else{
if(_479){
throw new DeviceException(MapErrorCode[_478],"Contacts: cancel: Operation Failed");
}else{
throw new DeviceException(_478,"Contacts: cancel: Operation Failed");
}
}
}
}
catch(e){
__device_handle_exception(e,"__sp_contacts_cancel: "+e);
}
};
function __sp_contacts_updateGroup(_47b){
if(!(_47b)){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Contacts: updateGroup:Group Data is missing");
}
if((typeof _47b)!="object"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: updateGroup:Invalid Group Data");
}
if(!(_47b&&_47b.groupId)){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Contacts: updateGroup: Group id is missing");
}
if(typeof _47b.groupId!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: updateGroup:Invalid Group id input");
}
try{
var _47c={};
modifyObjectBaseProp(_47c);
_47c.Type="Group";
var _47d={};
modifyObjectBaseProp(_47d);
if(_47b!=undefined){
if(_47b.groupId!=undefined){
_47d["id"]=_47b.groupId;
}else{
throw new DeviceException(this.error.MISSING_ARG_ERR,"Contacts: updateGroup: Id input is mandatory");
}
if(_47b.groupName!=undefined){
_47d["GroupLabel"]=_47b.groupName;
}
}
_47c.Data=_47d;
var _47e=this.so.IDataSource.Add(_47c);
if(_47d){
delete _47d.prototype;
}
if(_47c){
delete _47c.Data;
delete _47c.Type;
}
if(_47e.ErrorCode!=0){
var _47f=mappingVerification(_47e.ErrorCode);
if(_47e.ErrorMessage){
var _480=splitErrorMessage(_47e.ErrorMessage);
if(_47f){
throw new DeviceException(MapErrorCode[_47e.ErrorCode],"Contacts: updateGroup: "+_480);
}else{
throw new DeviceException(_47e.ErrorCode,"Contacts: updateGroup: "+_480);
}
}else{
if(_47f){
throw new DeviceException(MapErrorCode[_47e.ErrorCode],"Contacts: updateGroup: Operation Failed");
}else{
throw new DeviceException(_47e.ErrorCode,"Contacts: updateGroup: Operation Failed");
}
}
}
}
catch(e){
__device_handle_exception(e,"__sp_contacts_updateGroup: "+e);
}
};
function __sp_contacts_getGroupInfo(_481){
try{
var _482={};
modifyObjectBaseProp(_482);
_482.Type="Group";
_482.Filter={};
modifyObjectBaseProp(_482.Filter);
if(_481==undefined){
throw new DeviceException(this.error.MISSING_ARG_ERR,"Contacts: getGroupInfo: Id input is mandatory");
}
if((typeof _481)!="string"){
throw new DeviceException(this.error.INVALID_ARG_ERR,"Contacts: getGroupInfo: Id input is mandatory");
}
_482.Filter.id=_481;
var rval=this.so.IDataSource.GetList(_482);
if(_482.Filter){
delete _482.Filter.id;
}
if(_482){
delete _482.Filter;
delete _482.Type;
}
if(rval){
if(rval.ErrorCode!=0){
var _484=mappingVerification(rval.ErrorCode);
if(rval.ErrorMessage){
var _485=splitErrorMessage(rval.ErrorMessage);
if(_484){
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getGroupInfo: "+_485);
}else{
throw new DeviceException(rval.ErrorCode,"Contacts: getGroupInfo: "+_485);
}
}else{
if(_484){
throw new DeviceException(MapErrorCode[rval.ErrorCode],"Contacts: getGroupInfo: Operation Failed");
}else{
throw new DeviceException(rval.ErrorCode,"Contacts: getGroupInfo: Operation Failed");
}
}
}else{
var _486={};
modifyObjectBaseProp(_486);
var _487=rval.ReturnValue.getNext();
__sp_device_groupinfo_build(_487,_486);
return _486;
}
}
}
catch(e){
__device_handle_exception(e,"__sp_contacts_getGroupInfo:"+e);
}
};
function mappingVerification(_488){
if(_488===1016||_488===1012||_488===1010||_488===1009||_488===1005||_488===1000||_488===1011||_488===1007||_488===1003||_488===1002||_488===1004){
return true;
}else{
return false;
}
};
function __sp_contacts_instance(){
this.SORT_ASCENDING=0;
this.SORT_DESCENDING=1;
this.descriptor=new __sp_contacts_descriptor();
this.startEditor=__sp_contacts_startEditor;
this.getContacts=__sp_contacts_getContacts;
this.getContactsCb=__sp_contacts_getContacts_cb;
this.addContact=__sp_contacts_add;
this.updateContact=__sp_contacts_update;
this.deleteContacts=__sp_contacts_delete;
this.getContactInfo=__sp_contacts_get;
this.addGroup=__sp_contacts_addGroup;
this.getGroups=__sp_contacts_getGroups;
this.getGroupsCb=__sp_contacts_getGroups_cb;
this.deleteGroups=__sp_contacts_deleteGroups;
this.addContactsToGroup=__sp_contacts_addContactsToGroup;
this.getContactIds=__sp_contacts_getContactIds;
this.getContactIdsCb=__sp_contacts_getContactIds_cb;
this.getGroupIds=__sp_contacts_getGroupIds;
this.getGroupIdsCb=__sp_contacts_getGroupIds_cb;
this.removeContactsFromGroup=__sp_contacts_removeContactsFromGroup;
this.cancel=__sp_contacts_cancel;
this.updateGroup=__sp_contacts_updateGroup;
this.getGroupInfo=__sp_contacts_getGroupInfo;
this.error=new DeviceException(0,"Dummy");
try{
this.so=device.getServiceObject("Service.Contact","IDataSource");
}
catch(e){
__device_handle_exception(e,"Contacts service not available "+e);
}
};

