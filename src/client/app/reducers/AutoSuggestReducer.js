import * as types from '../constants/ActionTypes';

const initialState = {
  value: '',
  suggestions: [],
  isLoading: false
};

function autoSuggestReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_INPUT_VALUE:
      return {
        ...state,
        value: action.value
      };

    case types.CLEAR_SUGGESTIONS:
      return {
        ...state,
        suggestions: []
      };

    case types.LOAD_SUGGESTIONS_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case types.MAYBE_UPDATE_SUGGESTIONS:
      // Ignore suggestions if input value changed
      if (action.value !== state.value) {
        return {
          ...state,
          isLoading: false
        };
      }

      return {
        ...state,
        suggestions: action.suggestions,
        isLoading: false
      };

    default:
      return state;
  }
}

export default autoSuggestReducer;
