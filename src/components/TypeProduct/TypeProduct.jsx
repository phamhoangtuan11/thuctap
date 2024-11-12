import React from 'react'
import { useNavigate } from 'react-router-dom'


const TypeProduct = ({ name }) => {
  const navigate = useNavigate()
  const handleNavigatetype = (type) => {
    navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, {state: type})
  }
  return (
    <div className='cursor-pointer w-[105px] flex justify-center' onClick={() => handleNavigatetype(name)}>
      <span className='text-[#646464] text-[15px]  hover:text-[#C92127] font-normal text-center leading-8'>{name}</span>
    </div>
  )
}

export default TypeProduct