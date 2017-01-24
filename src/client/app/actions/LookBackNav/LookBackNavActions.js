import * as types from '../../constants/ActionTypes';
import * as LookBackSections from '../../constants/LookBackConstants.js'

export function switchLookBackSelection(newLookBackSelection) {

  return {
    type: types.SWITCH_LOOKBACK_SELECTION,
    lookBackSelection: newLookBackSelection
  }
}
