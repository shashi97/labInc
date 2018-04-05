export class ApiUrl {

  static serverMode = true;

  static localUrl = 'http://localhost';
  static serverUrl = 'http://54.152.245.210';
  // static serverUrl = 'http://54.163.111.76';

  static baseUrl: string = ApiUrl.serverMode === true ? ApiUrl.serverUrl : ApiUrl.localUrl;

  static prodMode = true; /* this is for production or development url */
  static LOGIN_URI_PORT = ApiUrl.prodMode === true ? ':6002/' : ':6010/';
  static MAIN_URI_PORT = ApiUrl.prodMode === true ? ':6001/api/' : ':6009/api/';
  static DOCUMENT_STORE_URI_PORT = ApiUrl.prodMode === true ? ':6001/' : ':6009/';


  static LOGIN_URI = ApiUrl.baseUrl + ApiUrl.LOGIN_URI_PORT;
  static MAIN_URI = ApiUrl.baseUrl + ApiUrl.MAIN_URI_PORT;
  static DOCUMENT_STORE_URI = ApiUrl.baseUrl + ApiUrl.DOCUMENT_STORE_URI_PORT;
}


