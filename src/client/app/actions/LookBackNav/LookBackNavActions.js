import * as types from '../../constants/ActionTypes';

export function switchLookBackSelection(newLookBackSelection) {
  return {
    type: types.SWITCH_LOOKBACK_SELECTION,
    lookBackSelection: newLookBackSelection
  }
}
