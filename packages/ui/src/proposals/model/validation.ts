import { isBn } from '@polkadot/util'
import BN from 'bn.js'
import * as Yup from 'yup'
import { AnyObject } from 'yup/lib/types'

import { isValidAddress } from '@/accounts/model/isValidAddress'
import { formatJoyValue } from '@/common/model/formatters'

export const maxAccounts = (message:string, max: number | undefined): Yup.TestConfig<any, AnyObject> => ({
    message,
    name: 'maxAccounts',
    params: {max},
    exclusive: false,
    test(value: string) {        
        const pairs = value.split(';')
        return max ? pairs.length <= max : false
    },
  })

  export const duplicateAccounts = (message:string): Yup.TestConfig<any, AnyObject> => ({
    message,
    name: 'duplicateAccounts',
    exclusive: false,
    test(value: string) {        
        const pairs = value.split(';');
        const addresses:string[] = []

        for(const pair of pairs){
          const [address,] = pair.split(',')
          if(addresses.indexOf(address) >= 0) return false
          addresses.push(address)
        }

        return true
    },
  })

  export const isValidCSV = (message:string): Yup.TestConfig<any, AnyObject> =>({
    message,
    name: 'isValidCSV',
    exclusive: false,
    test(value: string, testContext){
        const pattern = /^([^,:;]+),([^,:;]+)(;[^,:;]+,[^,:;]+)*;?$/;
        if(!pattern.test(value)) return false;

        const pairs = value.split(';');
        const keyring = testContext?.options?.context?.keyring

        for(const pair of pairs){
          const [address,amount] = pair.split(',')
          if(!Number(amount) || !isValidAddress(address.replace('\n',''),keyring))return false
        }

        return true
    }
  })

  export const maxFundingAmount = (message:string,max: number | BN | undefined,isJoyValue = true): Yup.TestConfig<any, AnyObject> =>({
    message,
    name: 'maxFundingAmount',
    params: { max: isJoyValue && isBn(max) ? formatJoyValue(max, { precision: 2 }) : max },
    exclusive: false,
    test(value: string){

        const pairs = value.split(';');
        let total = 0;
        for(const pair of pairs){
          const [,amount] = pair.split(',')
          total += Number(amount)
        }
        const formattedTotal = new BN(total)
        return max ? formattedTotal.lte(new BN(max)) : false
    }
  })

export const AccountAndAmountSchema = Yup.string().test(duplicateAccounts('Duplicate accounts are not allowed')).test(isValidCSV('Not valid CSV format'))