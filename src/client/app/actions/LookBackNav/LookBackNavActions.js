import * as types from '../../constants/ActionTypes';
import * as LookBackSections from '../../constants/LookBackConstants.js'

export function switchLookBackSelection(newLookBackSelection, search_term) {

  return {
    type: types.SWITCH_LOOKBACK_SELECTION,
    lookBackSelection: newLookBackSelection,
    searchTerm: search_term
  }
}
