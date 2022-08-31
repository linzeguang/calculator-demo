/*
 * @Author: linzeguang
 * @Date: 2022-08-31 01:38:18
 * @LastEditTime: 2022-08-31 02:38:10
 * @LastEditors: linzeguang
 * @Description: 运算方法
 */
import BigNumber from 'bignumber.js'

import { OperatorHandle } from './types'

const operatorMethod: Record<string, OperatorHandle> = {
  '+': (num1: string, num2: string) => new BigNumber(num1).plus(num2),
  '-': (num1: string, num2: string) => new BigNumber(num1).minus(num2),
  '*': (num1: string, num2: string) => new BigNumber(num1).multipliedBy(num2),
  '/': (num1: string, num2: string) => new BigNumber(num1).dividedBy(num2),
}

export default operatorMethod
