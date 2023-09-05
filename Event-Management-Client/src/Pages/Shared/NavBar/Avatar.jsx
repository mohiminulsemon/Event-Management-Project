
import avatarImg from '../../../assets/placeholder.jpg'
import useAuth from '../../../Hooks/useAuth'

const Avatar = () => {
  const { user } = useAuth();
  return (
    <img
      className='rounded-full'
      src={user && user.photoURL ? user.photoURL : avatarImg}
      alt='profile'
      height='30'
      width='30'
    />
  )
}

export default Avatar
