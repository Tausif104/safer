import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import HomeIcon from '@/assets/images/home-mobile.svg'
import AddIcon from '@/assets/images/add-circle-dark.svg'
import Settings from '@/assets/images/settings-dark.svg'
import UserProfile from '@/assets/images/user-profile-dark.svg'


const MobileNav = () => {
  return (
    <>
      <div className='bg-white shadow-[10px_-40px_60px_0px_#E5E9ED_0.4] py-[10px] px-[20px] fixed bottom-0 left-0 w-full z-50 sm:hidden'>
        <ul className='flex text-center justify-between gap-2 text-[12px] font-medium'>
            <li>
                <Link href="/" className='text-center flex flex-col gap-1.5 justify-center'>
                    <Image className='mx-auto' src={HomeIcon} alt="Home" />
                    <span>Home</span>
                </Link>
            </li>
            <li>
                <Link href="/" className='text-center flex flex-col gap-1.5 justify-center'>
                    <Image className='mx-auto' src={Settings} alt="Home" />
                    <span>Setting</span>
                </Link>
            </li>
            <li>
                <Link href="/" className='text-center flex flex-col gap-1.5 justify-center'>
                    <Image className='mx-auto' src={UserProfile} alt="Home" />
                    <span>Profile</span>
                </Link>
            </li>
        </ul>
      </div>
    </>
  )
}

export default MobileNav
