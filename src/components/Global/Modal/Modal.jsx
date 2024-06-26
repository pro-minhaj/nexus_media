'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';

export default function Modal({ children }) {
    const router = useRouter();
    const handleClose = () => router.back();

    return (
        <Transition.Root show={true} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 transition-opacity bg-[#0009]' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                    <div className='flex items-center justify-center min-h-full p-4 text-center sm:items-center sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <Dialog.Panel className='relative bg-[#FFFFFF] dark:bg-[#18191B] shadow-xl rounded-md p-4 overflow-hidden text-left transition-colors sm:w-full sm:max-w-xl'>
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
