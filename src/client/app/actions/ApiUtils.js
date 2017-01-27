var ApiUtils = {
  checkStatus: function(response) {
    console.log("Api Utils", response);
    if (response.status == 200){
      // Good response
      return response;
    } else {

      // Bad response. Return the status code for parsing in catch
      throw response.status;

    }
  }
};
export { ApiUtils as default };
