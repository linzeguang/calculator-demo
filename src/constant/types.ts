import { CSSProperties } from 'react'
import BigNumber from 'bignumber.js'

export enum KeyEnum {
  Number,
  Operator,
  Clear,
  Del,
  Equal,
  Dot,
}

export interface KeyboardConfig {
  label: string
  type: KeyEnum
  style?: CSSProperties
}

export type OperatorHandle = (num1: string, num2: string) => BigNumber
