import React, { PropsWithChildren } from 'react'

const Providers: React.FC<PropsWithChildren> = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>
}

export default Providers
