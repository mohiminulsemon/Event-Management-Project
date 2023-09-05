import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from './Avatar'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../../Hooks/useAuth'


const MenuDropdown = () => {
  const { user, logOut, role} = useAuth();
  const [isOpen, setIsOpen] = useState(false)
  console.log(role)

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
      <div className='hidden md:block text-sm font-semibold rounded-full py-3 px-8   transition'>
          {!user && (
            <button
              className='cursor-pointer hover:bg-neutral-100  px-4 '
              
              disabled={!user}
            >
              login to full access
            </button>
          )}
        </div>
        {/* Dropdown btn */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            <Link
              to='/'
              className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
            >
              Home
            </Link>
            {user ? (
              <>
                <Link
                  to='/dashboard'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Dashboard
                </Link>

                <div
                  onClick={() => {
                    logOut()
                  }}
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Login
                </Link>
                <Link
                  to='/signUp'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuDropdown
