import { MapErrorToState } from './types';

export function mapErrorToState(error: Record<string, any>): MapErrorToState {
  const resp: MapErrorToState = error.response.data;
  const state: MapErrorToState = {};
  if (resp.message) {
    state.message = resp.message;
  }
  if (resp.errors) {
    state.errors = resp.errors;
  }
  return state;
}
