import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-white bg-opacity-5 w-full h-14'>
      <ul className='flex items-center p-2 justify-around'>
        <li className='font-bold text-4xl'>
             <span >&lt;Pass</span>
             <span className='text-blue-600'>Key&gt;</span></li>
            
        <div className='flex gap-12'>
        <li className='cursor-pointer  hover:text-gray-400 hover:font-bold text-xl'>Home</li>
        <li className='cursor-pointer  hover:text-gray-400 hover:font-bold text-xl '>About</li>
        <li className='cursor-pointer  hover:text-gray-400 hover:font-bold text-xl '>Contact</li>
        </div>
      </ul>
    </div>
  )
}

export default Navbar
