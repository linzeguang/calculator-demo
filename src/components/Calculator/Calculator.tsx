/*
 * @Author: linzeguang
 * @Date: 2022-08-30 17:25:16
 * @LastEditTime: 2022-08-31 12:25:55
 * @LastEditors: linzeguang
 * @Description: 计算器
 * bignumber：默认精度为18位
 * 整体思路：点击输入数值、运算符时，把keyboard内容存储到keys数组，
 *          再经过第一个循环得到计算公式字符串与计算数组，
 *          计算数组调起第二个循环优先处理乘除后返回只剩加减的计算数组
 *          最后一个循环处理只剩加减的计算数组得到最后计算结果
 *          最后计算结果遍历得到最后结果对应的keyboard数组，方便点击 = 时替换 keys
 */

import React, { useCallback, useMemo, useState } from 'react'
import { KeyboardConfig, keyboards, KeyEnum, operatorMethod } from 'constant'

import { Formula, InputWindow, KeyboardWrapper, Sum, Wrapper } from './styled'

export const Calculator: React.FC = () => {
  const [keys, setKeys] = useState<KeyboardConfig[]>([])

  const data = useMemo(() => {
    // 存储运算数组，用于计算运算结果，判断ui是否显示预览结果
    let computeStack: Array<string> = []
    // 存储输入数字
    let num: string = ''

    // 获取计算公式，并输出二维数组用于计算最后结果
    const formula = keys
      .map((config, index) => {
        const { type, label } = config
        // 用于判断首位是否输入为+-
        const isFrist = index !== 0
        if (type === KeyEnum.Operator && isFrist) {
          // 遇到运算符，num推入computeArr并清空
          computeStack.push(num)
          computeStack.push(label)
          num = ''
        } else {
          num += label
          if (index === keys.length - 1) {
            computeStack.push(num)
          }
        }
        return label
      })
      .join('')

    // 计算数字数组
    const nums = formula.split(/[+\-*/]/)

    // 正在输入的数字
    const [lastNum] = nums.slice(-1)

    // 优先计算乘除，resultStack用于存储计算乘除完成后的数组
    const resultStack: string[] = []
    computeStack.forEach((value, index) => {
      const op = computeStack[index - 1]
      const prev = computeStack[index - 2]

      if (index >= 2 && ['*', '/'].includes(op)) {
        resultStack.splice(resultStack.length - 2, 2, operatorMethod[op](prev, value).toString())
      } else {
        resultStack.push(value)
      }
    })

    // 再计算加减，得出最终结果
    const sum = resultStack.reduce((accm, value, index) => {
      // 判断，value非运算符则进入计算
      if (Number(value) || Number(value) === 0) {
        if (index === 0) accm = value
        else {
          // 获取运算符
          const op = resultStack[index - 1]
          accm = operatorMethod[op](accm, value === '.' ? '0' : value).toString()
        }
      }
      return accm
    }, '')

    // map出sum结果对应的keyboard，用于按等于号时赋值
    const sumKeys = sum
      .split('')
      .map((token) => keyboards.find((key) => key.label === token) as KeyboardConfig)

    return {
      computeStack, // 计算数组，用于判断ui是否显示预览结果
      formula, // 计算公式字符串
      lastNum, // 正在输入的数字
      sum, // 计算结果
      sumKeys, // 计算结果对应的keys数组
    }
  }, [keys])

  const handleClick = useCallback(
    (config: KeyboardConfig) => {
      const { type, label } = config

      switch (type) {
        case KeyEnum.Clear:
          // 删除全部
          setKeys([])
          break

        case KeyEnum.Del:
          // 删除字符
          keys.pop()
          setKeys([...keys])
          break

        case KeyEnum.Number:
          // 键入数字
          setKeys([...keys, config])
          break

        case KeyEnum.Operator:
          // 键入运算符
          // 首位不允许输入乘除
          if (['*', '/'].includes(config.label) && keys.length === 0) break
          // 获取最后一个字符并判断是否为运算符，如果是则直接替换运算符
          const last = keys[keys.length - 1]
          if (last && last.type === KeyEnum.Operator) {
            keys.splice(keys.length - 1, 1, config)
            setKeys([...keys])
            break
          }
          setKeys([...keys, config])
          break

        case KeyEnum.Dot:
          // 键入小数点
          // 判断当前数值是否已输入小数点，已输入则不做处理
          !data.lastNum.includes(label) && setKeys([...keys, config])
          break

        case KeyEnum.Equal:
          // 点击等于
          setKeys(data.sumKeys)
          break
      }
    },
    [data, keys],
  )

  return (
    <Wrapper>
      {/* 输入窗口 */}
      <InputWindow>
        <Formula>{data.formula}</Formula>
        <Sum>{data.computeStack.length > 2 && data.sum}</Sum>
      </InputWindow>
      {/* 键盘 */}
      <KeyboardWrapper>
        {keyboards.map((config) => (
          <button
            style={{ ...config.style }}
            key={config.label}
            onClick={() => handleClick(config)}
          >
            {config.label}
          </button>
        ))}
      </KeyboardWrapper>
    </Wrapper>
  )
}
