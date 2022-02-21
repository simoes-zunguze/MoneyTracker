import { createStore, Reducer, Action } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

export interface ICategory {
    id: number
    name: string,
    description: string,
    limit: number
}

export interface IWallet {
  id: number,
  balance: number,
  description: string,
  limit: number
}

export interface IExpense {
  id: number;
  description: string;
  wallet?: IWallet;
  walletId?:  number;
  amount: number;
  category?: ICategory;
  categoryId?: number;
  created_at: string;
}

export interface IIncome {
  id: number;
  description: string;
  wallet?: IWallet;
  walletId?:  number;
  amount: number;
  created_at?: string;

}


export interface IBill {
  id: number;
  description: string;
  cate?: IWallet;
  categoryId?:  number;
  wallet?: IWallet;
  walletId?:  number;
  amount: number;
  category: ICategory;
}

export type Tokens = {
  token: string,
  refreshToken : string
}

export interface IUser {
    id: number
    firstName: string,
    lastName: string,
    email?: string,
    password?: string,
    confirmPassword?: string
}

export interface IState{
    url: string,
    category: ICategory,
    tokens : Tokens | undefined;
    user: IUser;
}

const INITIAL_STATE: IState = {
    url : 'http://localhost:3000',
    category: {
        id: 0,
        name: "",
        description: "",
        limit: 0
    },
    tokens: undefined,
    user: {id: 0, firstName:"", lastName:"", email: ""}
}

interface IAction extends Action{
  tokens?: Tokens;
  url?: string;
  user?: IUser;
}

const  reducer: Reducer = (state = INITIAL_STATE, action: IAction) => {
  // console.log(action);
  
    switch (action.type) {
      case 'SET_URL':
        return {...state, url: action.url};
      case 'SET_TOKENS':
          return {...state, tokens: action.tokens};
      case 'SET_USER':
        return {...state, user: action.user};
      default:
        return state
    }
  }

// const store = createStore(reducer);
const store = createStore(reducer, composeWithDevTools())

export default store;
