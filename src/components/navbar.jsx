"use client";
import {useState} from 'react'
import logo from '@/app/logo.png'
import Image from 'next/image';
import Search from './search'
import Menu from '@components/menu'
const Navbar = ({avatar, firstName, lastName, username}) => {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <nav className='w-full '>
            <div className='flex p-3 justify-between bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
                <div className='flex items-center'>
                <Search size={20} />
                </div>
                <div className='space-x-3'>
                <ul className=''>
                    <li></li>
                </ul>
                <Menu avatar={avatar} firstName={firstName} lastName={lastName} username={username} />
                </div>
            </div>
        </nav>
    )
}


export default Navbar;