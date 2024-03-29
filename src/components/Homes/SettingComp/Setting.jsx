import { ThemeContext } from '../../../Providers/ThemeContext';
import useColor from '@/Hooks/useColor';
import { Switch } from "@nextui-org/react";
import React, { useContext, useState } from 'react';
import { MdSunny } from "react-icons/md";
import { IoIosMoon } from "react-icons/io";

const Setting = () => {
    const [theme, toggleButton] = useContext(ThemeContext);
    const [enabled, setEnabled] = useState(theme === "dark" ? true : false);
    const { color, setColor, setBgColor } = useColor();

    const handleColor = (color) => {
        setColor(color.colorClass)
        setBgColor(color.bgClass)
    }

    // Colors
    const colors = [
        {
            id: 1,
            colorClass: theme === "dark" ? "text-gray-200" : "text-gray-600",
            bgClass: theme === "dark" ? "bg-gray-200" : "bg-gray-600",
        },
        {
            id: 2,
            colorClass: theme === "dark" ? "text-blue-600 dark:text-blue-400" : "text-blue-600 dark:text-blue-400",
            bgClass: theme === "dark" ? "bg-blue-400" : "bg-blue-600",
        },
        {
            id: 3,
            colorClass: theme === "dark" ? "dark:text-indigo-400 text-indigo-600" : "text-indigo-600 dark:text-indigo-400",
            bgClass: theme === "dark" ? "bg-indigo-400" : "bg-indigo-600",
        },
        {
            id: 4,
            colorClass: theme === "dark" ? "dark:text-purple-400 text-purple-600" : "text-purple-600 dark:text-purple-400",
            bgClass: theme === "dark" ? "bg-purple-400" : "bg-purple-600",
        },
        {
            id: 5,
            colorClass: theme === "dark" ? "dark:text-pink-400 text-pink-600" : "text-pink-600 dark:text-pink-400",
            bgClass: theme === "dark" ? "bg-pink-400" : "bg-pink-600",
        },
        {
            id: 6,
            colorClass: theme === "dark" ? "dark:text-red-400 text-red-600" : "text-red-600 dark:text-red-400",
            bgClass: theme === "dark" ? "bg-red-400" : "bg-red-600",
        },
        {
            id: 7,
            colorClass: theme === "dark" ? "dark:text-orange-400 text-orange-600" : "text-orange-600 dark:text-orange-400",
            bgClass: theme === "dark" ? "bg-orange-400" : "bg-orange-600",
        },
        {
            id: 8,
            colorClass: theme === "dark" ? "dark:text-yellow-400 text-yellow-600" : "text-yellow-600 dark:text-yellow-400",
            bgClass: theme === "dark" ? "bg-yellow-400" : "bg-yellow-600",
        },
        {
            id: 9,
            colorClass: theme === "dark" ? "dark:text-green-400 text-green-600" : "text-green-600 dark:text-green-400",
            bgClass: theme === "dark" ? "bg-green-400" : "bg-green-600",
        },
        {
            id: 10,
            colorClass: theme === "dark" ? "dark:text-teal-400 text-teal-600" : "text-teal-600 dark:text-teal-400",
            bgClass: theme === "dark" ? "bg-teal-400" : "bg-teal-600",
        },
    ]

    return (
        <div>
            <div className='px-3 py-2'>
                <h4 className='text-xl italic font-semibold'>Settings</h4>
                <div className='pt-2'>
                    <div>
                        <h4 className='font-medium opacity-60'>Colors</h4>
                        <ul className='flex flex-wrap justify-start gap-3 mt-2'>
                            {
                                colors.map(color => <li onClick={() => handleColor(color)} key={color.id}>
                                    <button className={`${color.bgClass} w-6 h-6 rounded-full`}></button>
                                </li>)
                            }
                        </ul>
                    </div>
                    <div className='mt-2'>
                        {/* Theme */}
                        <h2 className='font-medium opacity-60'>Theme</h2>
                        <div className='flex items-center justify-between mt-2'>
                            <h4 className='font-medium opacity-80'>{theme === 'dark' ? "Dark" : "Light"}</h4>
                            <div>
                                <Switch onClick={toggleButton} defaultSelected={enabled} size="lg"
                                    color="success"
                                    thumbIcon={({ isSelected, className }) =>
                                        isSelected ? (
                                            <MdSunny className={className} />
                                        ) : (
                                            <IoIosMoon className={className} />
                                        )
                                    }></Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;