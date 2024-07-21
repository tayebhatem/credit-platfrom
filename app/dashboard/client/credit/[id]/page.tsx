import React from 'react'

const CreditPage = ({params}:{params:{id:string}}) => {
  return (
    <div>{params.id}</div>
  )
}

export default CreditPage