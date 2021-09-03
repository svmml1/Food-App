
import axios from 'axios'
import { Address } from 'expo-location'
import { Dispatch } from 'react'
import { BASE_URL } from '../../utils'
import AsyncStorage from '@react-native-community/async-storage'
import { FoodModel } from '../models'


export interface UpdateLocationAction{
  readonly type: 'ON_UPDATE_LOCATION',
  payload: Address
}

export interface UserErrorAction{
  readonly type: 'ON_USER_ERROR',
  payload: any
}


export interface UpdateCartAction{
  readonly type: 'ON_UPDATE_CART',
  payload: FoodModel
}

export interface UserLoginAction{
  readonly type: 'ON_USER_LOGIN',
  payload: string
}

export type UserAction = UpdateLocationAction | UserErrorAction | UpdateCartAction | UserLoginAction;


export const onUpdateLocation = (location: Address) => {

  return async ( dispatch: Dispatch<UserAction>) => {
    try {
       // save our location in local storage
       dispatch({
         type: 'ON_UPDATE_LOCATION',
         payload: location
       })
    } catch(error) {
      dispatch({
        type: 'ON_USER_ERROR',
         payload: error
      })

    }
  }
}
