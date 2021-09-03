import { Address } from 'expo-location'
import {  UserAction } from '../actions'
import { UserModel, UserState, FoodModel } from '../models'

const initialState: UserState = { 
  user: {} as UserModel,
  location: {} as Address,
  error: undefined,
  Cart: {} as [FoodModel]
}

const UserReducer = ( state: UserState = initialState, action: UserAction) => {

  switch(action.type) {
    case 'ON_UPDATE_LOCATION':
      return {
        ...state,
        location: action.playload
      }
    default : 
    return state;
  }

}

export { UserReducer}