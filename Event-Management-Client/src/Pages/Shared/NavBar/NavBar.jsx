import Container from './Container'
import Logo from './Logo'
import Search from './Search'
import MenuDropdown from './MenuDropdown'

const Navbar = () => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-2 border-b-[1px]'>
        <Container>
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
            <div className='flex gap-3 justify-center items-center'>
            <Logo />
            <h2 className='font-bold text-black text-2xl'>Eventease</h2>
            </div>
            <Search />
            <MenuDropdown />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
