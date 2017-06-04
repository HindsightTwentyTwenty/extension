var ApiUtils = {
  checkStatus: function(response) {
    if (response.status == 200){
      // Good response
      return response;
    } else {

      // Bad response. Return the status code for parsing in catch
      throw response;
    }
  }
};
export { ApiUtils as default };
