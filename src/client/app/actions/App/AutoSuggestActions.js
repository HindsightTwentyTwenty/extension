import * as types from '../../constants/ActionTypes';

export function loadSuggestions(value, suggestions) {
  return dispatch => {
    dispatch(loadSuggestionsBegin());
    dispatch(maybeUpdateSuggestions(suggestions, value));
  };
}

export function updateInputValue(value) {
  return {
    type: types.UPDATE_INPUT_VALUE,
    value
  };
}

export function clearSuggestions() {
  return {
    type: types.CLEAR_SUGGESTIONS
  };
}

export function loadSuggestionsBegin() {
  return {
    type: types.LOAD_SUGGESTIONS_BEGIN
  };
}

export function maybeUpdateSuggestions(suggestions, value) {
  return {
    type: types.MAYBE_UPDATE_SUGGESTIONS,
    suggestions,
    value
  };
}
