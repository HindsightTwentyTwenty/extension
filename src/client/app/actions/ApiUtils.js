var ApiUtils = {
  checkStatus: function(response) {
    console.log("Api Utils", response);
    if (response.status == 204){
      // console.log("Catching 204 No Content");
      let error = new Error('NoContent')
      error.response = response;
      throw error;
    }
    if (response.status >= 200 && response.status < 300) {
      // console.log("good response");
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
};
export { ApiUtils as default };
