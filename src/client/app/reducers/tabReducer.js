/*
function tabReducer(state = {title:"", url:"" }, action){
  switch(action.type){
    case "tab_added":
        //new object with title and url in it, and then override url key
        //could use spread to append to string
        return {...state, url: action.url, title: action.title}
    case default:
        return state;
  }

}
*/
