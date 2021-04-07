import { gql, makeVar } from '@apollo/client';
import _ from "lodash";


export const prefCurrencyVar = makeVar("USD");
export function nextPrefCurrency () {    
  const units = ["sats", "USD"] // "BTC"
  const currentIndex = _.indexOf(units, prefCurrencyVar())
  prefCurrencyVar(units[(currentIndex + 1) % units.length])
}

export const modalClipboardVisibleVar = makeVar(false)

export const QUERY_PRICE = gql`
  query prices($length: Int = 1) {
    prices(length: $length) {
      id
      o
    }
}`

export const WALLET = gql`
  query wallet {
  wallet {
    id
    balance
    currency
    transactions {
      id
      amount
      description
      created_at
      hash
      type
      usd
      fee
      feeUsd
      pending
      username
      date @client
      date_format @client
      date_nice_print @client
      isReceive @client
      text @client
    }
  }
}`

export const getWallet = (client) => {
  const { wallet } = client.readQuery({
    query: WALLET
  });
  return wallet
}


export const balanceUsd = (client) => _.find(getWallet(client), {id: "BTC"}).balance * btc_price(client)
export const balanceBtc = (client) => _.find(getWallet(client), {id: "BTC"}).balance  
export const lastTransactions = (client) => _.find(getWallet(client), {id: "BTC"}).transactions.slice(undefined, 3)

export const getPubKey = (client) => {
  const { nodeStats } = client.readQuery({query: gql`
      query nodeStats {
      nodeStats {
        id
      }
    }`})
  
  return nodeStats?.id ?? ""
}

export const getMyUsername = (client) => {
  const { me } = client.readQuery({query: gql`
      query username {
      me {
        username
      }
    }`})
  
  return me?.username ?? ""
}

export const USERNAME_EXIST = gql`
  query username_exist($username: String!) { 
    usernameExists(username: $username)
  }
`

export const QUERY_TRANSACTIONS = gql`
query query_transactions {
  wallet {
    id
    transactions {
      id
      amount
      description
      created_at
      hash
      type
      usd
      fee
      feeUsd
      pending
      username
    }
  }
}`

export const btc_price = (client) => {
  // this should be used only on first run before a query is done in the backend
  const price_default = 0.0002
  try {
    const result = client.readQuery({query: QUERY_PRICE})
    console.log({result}, "price")
    const { prices } = result
    console.log({prices})
    console.log({prices_0: prices[0]})
    return prices[0].o ?? price_default
  } catch (err) {
    console.log({err})
    //default value
    return price_default
  }
}

export const walletIsActive = (client) => {
  // { me } may not exist if the wallet is not active
  const result = client.readQuery({query: gql`
    query me {
      me {
        level
      }
    }`
  })
  return result?.me?.level ?? 0 > 0 
}

export const GET_LANGUAGE = gql`
query me {
  me {
    id
    language
  }
}`

export const MAIN_QUERY = gql`
query gql_main_query($logged: Boolean!) {
  maps {
    id
    title
    username
    coordinate {
      latitude
      longitude
    }
  }

  nodeStats {
    id
  }

  earnList {
    id
    value
    completed @include(if: $logged)
  }

  wallet @include(if: $logged) {
    id
    balance
    currency
    transactions {
      id
      amount
      description
      created_at
      hash
      type
      usd
      fee
      feeUsd
      pending
      username
    }
  }

  buildParameters {
    minBuildNumberAndroid
    minBuildNumberIos
    lastBuildNumberAndroid
    lastBuildNumberIos
  }

  getLastOnChainAddress @include(if: $logged) {
    id
  }

  me @include(if: $logged) {
    id
    level
    username
    phone
    language
    contacts {
      id
      name
      transactionsCount
    }
  }
}
`
