import React, { useContext } from 'react'
import { CartContext } from '../Context/CartContext'

export const ItemCart = ({item}) => {
    const {deleteItemToCart, addItemToCart} = useContext(CartContext);

    const {id} = item;

  return (
    <div className='flex justify-between items-center mx-2 my-2'>
    <img className='rounded w-24 h-24' src={item.imagen} alt={item.nombre} />
    <div className='flex justify-between w-full h-full'>
      <div className='pl-5 flex flex-col justify-between'>
        <p className='font-bold text-xs'>{item.nombre}</p>
        <div className='flex gap-1'>
          <button className='cursor-pointer bg-white hover:bg-slate-100 text-xs p-1 rounded text-black font-bold' onClick={() => addItemToCart(item)}>
            AGREGAR
          </button>
          <button className='cursor-pointer bg-white hover:bg-slate-100 text-xs p-1 rounded text-black font-bold' onClick={() => deleteItemToCart(item)}>
            SACAR
          </button>
        </div>
      </div>
      <div className='flex flex-col justify-between items-end'>
        <div className='bg-red w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold'>{item.amount}</div>
        <p className='font-bold'>Total: ${item.amount * item.precio}</p>
      </div>
    </div>
    </div>
    );
    };
