import * as types from '../../constants/ActionTypes';
import * as urls from '../../constants/GlobalConstants';
import fetch from 'isomorphic-fetch'

/*
callback when decryption dom is received from s3
*/
export function receiveDecrypted(text){
  return {
    type: types.RECEIVE_DECRYPTED,
    html:text
  }
}

/*
get the dom to pass to the iframe from amazon with decryption key and md5
  -url is the s3 endpoint
  -md5, ekey are stored in local storage and got on login/ removed on logout
info: http://docs.aws.amazon.com/AmazonS3/latest/dev/ServerSideEncryptionCustomerKeys.html
*/
export function getIframeHTML(url, md5, ekey){
  return dispatch => {
    return fetch(url, {
          headers: {
             'Content-Type': 'text/html',
             'x-amz-server-side-encryption-customer-algorithm': 'AES256',
             'x-amz-server-side-encryption-customer-key': ekey,
             'x-amz-server-side-encryption-customer-key-MD5': md5
           },
           method: "GET"
         }
       )
       .then(response => response.text())
       .then(text => {
         dispatch(receiveDecrypted(text))
       })
  }

}
