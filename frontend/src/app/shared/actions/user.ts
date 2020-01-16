
import { Action } from '@ngrx/store'

export const USER = '[Session] User'

export class UserAction implements Action {
  type = USER

  constructor(public payload: any) { }
}