/*
 * @Author: linzeguang
 * @Date: 2022-08-30 17:35:56
 * @LastEditTime: 2022-08-31 01:35:25
 * @LastEditors: linzeguang
 * @Description: styled 组件
 */

import styled from '@emotion/styled'

export const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  grid-gap: 20px;
  padding: 20px;
  background-color: #333;
  border-radius: 20px;
`

export const KeyboardWrapper = styled.div`
  flex: 1;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, 50px);
  grid-template-rows: repeat(5, 50px);
  button {
    border-radius: 4px;
    background-color: #fff;
    color: #333;
    border: none;
  }
`

export const InputWindow = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  height: 64px;
  padding: 10px;
  font-size: 16px;
  line-height: 2;
  background-color: #fff;
`

export const Formula = styled.div`
  font-size: 16px;
  text-align: right;
  color: #333;
`
export const Sum = styled(Formula)`
  color: #ccc;
`
