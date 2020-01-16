
export interface State {
  user: object
}

import * as fromUser from './user'

export const reducers = {
  user: fromUser.reducer
}


export const getUserState = (state: State) => state.user