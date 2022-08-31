/*
 * @Author: linzeguang
 * @Date: 2022-08-31 01:36:51
 * @LastEditTime: 2022-08-31 02:37:59
 * @LastEditors: linzeguang
 * @Description: 计算器按钮配置
 */

import { KeyboardConfig, KeyEnum } from './types'

const keyboards: KeyboardConfig[] = [
  { label: 'C', type: KeyEnum.Clear },
  { label: 'DEL', type: KeyEnum.Del },
  { label: '/', type: KeyEnum.Operator },
  { label: '*', type: KeyEnum.Operator },
  { label: '7', type: KeyEnum.Number },
  { label: '8', type: KeyEnum.Number },
  { label: '9', type: KeyEnum.Number },
  { label: '-', type: KeyEnum.Operator },
  { label: '4', type: KeyEnum.Number },
  { label: '5', type: KeyEnum.Number },
  { label: '6', type: KeyEnum.Number },
  { label: '+', type: KeyEnum.Operator },
  { label: '1', type: KeyEnum.Number },
  { label: '2', type: KeyEnum.Number },
  { label: '3', type: KeyEnum.Number },
  {
    label: '0',
    type: KeyEnum.Number,
    style: {
      gridColumn: '1 / 3',
    },
  },
  { label: '.', type: KeyEnum.Dot },
  {
    label: '=',
    type: KeyEnum.Equal,
    style: {
      gridColumn: '4',
      gridRow: '4 / 6',
    },
  },
]

export default keyboards
