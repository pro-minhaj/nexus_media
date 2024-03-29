"use client"
import Link from "next/link";
import { MdAutorenew, MdOutlineChatBubbleOutline } from "react-icons/md";
import { BiSolidContact } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import useColor from "@/Hooks/useColor";
import { motion } from 'framer-motion';
import { SlSettings } from "react-icons/sl";
import { IoAlertCircleSharp } from "react-icons/io5";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { FaBookmark } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Logout from "../Logout/Logout";
import useAuth from "@/Hooks/useAuth";

// Left Menu Items
const leftMenuItems = [
    {
        name: "Profile",
        path: "/profile/1/posts",
        icon: <CgProfile className="text-2xl" />
    },
    {
        name: 'Saved',
        path: '/saved',
        icon: <FaBookmark className="text-2xl" />
    },
    {
        name: 'Contact',
        path: '/contact',
        icon: <BiSolidContact className="text-2xl" />
    },
    {
        name: 'About',
        path: '/about',
        icon: <IoAlertCircleSharp className="text-2xl" />
    },

]

const leftActionItems = [
    {
        name: 'Account Setting',
        path: '/account/setting',
        icon: <div className='rounded-full bg-slate-200 dark:bg-gray-600'>
            <motion.div
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            >
                <SlSettings className="text-2xl" />
            </motion.div>
        </div>
    },
    {
        name: 'Chat',
        path: '/message',
        icon: <MdOutlineChatBubbleOutline className="text-2xl" />
    }
]

const LeftMenu = () => {
    const { color } = useColor();
    const path = usePathname();
    const user = useAuth();

    const reloadPage = () => {
        window.location.reload();
    };

    return (

        <div className="transition-all bg-white dark:bg-[#0F172A] rounded-lg h-screen duration-300 md:space-y-5">
            <div className='p-3 flex flex-col gap-2 bg-transparent md:bg-white rounded-lg md:dark:bg-[#0F172A]'>
                <button onClick={reloadPage} className="w-full px-3 hover:bg-[#F2F2F2] dark:text-gray-300 dark:hover:bg-[#3A3B3C] rounded-md py-2 text-[1.02rem transition-all duration-300">
                    <span className="flex items-center gap-2 sm:gap-3">
                        <span className={`bg-gray-300 dark:bg-gray-600 rounded-full p-2 ${color && color}`}>
                            <MdAutorenew className="text-2xl" />
                        </span>
                        <span className="text-lg font-medium">
                            Latest Feed
                        </span>
                    </span>
                </button>
                {
                    leftMenuItems.map(item =>
                        <Link className={`${path === item.path && "dark:bg-[#3A3B3C] bg-[#F0F2F5]"} block px-3 hover:bg-[#F2F2F2] dark:text-gray-300 dark:hover:bg-[#3A3B3C] rounded-md py-2 text-[1.02rem transition-all duration-300`} href={item.path} key={item.path}>
                            <span className="flex items-center gap-2 sm:gap-3">
                                <span className={`${path === item.path && "dark:bg-[#1877F2] !bg-[#1877F2] text-[#ffffff]"} bg-gray-300 dark:bg-gray-600 rounded-full p-2 ${color && path === item.path || color}`}>
                                    {item.icon}
                                </span>
                                <span className="text-lg font-medium">
                                    {item.name}
                                </span>
                            </span>
                        </Link>
                    )
                }
            </div>
            <hr className="dark:border-t-gray-600 border-t-gray-300" />
            <div className='p-3 flex flex-col gap-2 bg-transparent md:bg-white rounded-lg md:dark:bg-[#0F172A]'>
                {
                    leftActionItems.map(item =>
                        <Link className={`${path === item.path && "dark:bg-[#3A3B3C] bg-[#F0F2F5]"} block px-3 hover:bg-[#F2F2F2] dark:text-gray-300 dark:hover:bg-[#3A3B3C] rounded-md py-2 text-[1.02rem transition-all duration-300`} href={item.path} key={item.path}>
                            <span className="flex items-center gap-2 sm:gap-3">
                                <span className={`${path === item.path && "dark:bg-[#1877F2] bg-[#1877F2] text-[#FFFFFF]"} bg-gray-300 dark:bg-gray-600 rounded-full p-2 ${color && path === item.path || color}`}>
                                    {item.icon}
                                </span>
                                <span className="text-lg font-medium">
                                    {item.name}
                                </span>
                            </span>
                        </Link>
                    )
                }
                {
                    user ? <Logout>
                        <button className='w-full px-3 hover:bg-[#F2F2F2] dark:text-gray-300 dark:hover:bg-[#3A3B3C] rounded-md py-2 text-[1.02rem transition-all duration-300'>
                            <span className="flex items-center gap-2 sm:gap-3">
                                <span className={`bg-gray-300 dark:bg-gray-600 rounded-full p-2 ${color && color}`}>
                                    <HiArrowRightOnRectangle className="text-2xl" />
                                </span>
                                <span className="text-lg font-medium">
                                    Logout
                                </span>
                            </span>
                        </button>
                    </Logout> : <Link className="w-full px-3 block hover:bg-[#F2F2F2] dark:text-gray-300 dark:hover:bg-[#3A3B3C] rounded-md py-2 text-[1.02rem transition-all duration-300" href="/login">
                        <span className="flex items-center gap-2 sm:gap-3">
                            <span className={`bg-gray-300 dark:bg-gray-600 rounded-full p-2 ${color && color}`}>
                                <HiArrowRightOnRectangle className="text-2xl" />
                            </span>
                            <span className="text-lg font-medium">Login</span>
                        </span>
                    </Link>
                }
            </div>
        </div >
    );
};

export default LeftMenu;