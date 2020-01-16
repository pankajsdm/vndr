
import * as user from '../actions/user'

export function reducer(state: any, action: user.UserAction) {
  switch (action.type) {
    case user.USER:
     return {...state, ...action.payload}
    default:
      return state
  }
}