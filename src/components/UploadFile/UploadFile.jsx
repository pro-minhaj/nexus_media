import { Card } from '@radix-ui/themes';
import Image from 'next/image';
import { CiImageOn } from 'react-icons/ci';
import { HiOutlineTrash } from 'react-icons/hi2';

const UploadFile = ({ imageState, setImageState, className }) => {
    return (
        <div>
            {
                !imageState && <div className="flex items-center justify-center">
                    <Card className='w-full'>
                        <label className="flex flex-col items-center w-full py-6 uppercase cursor-pointer">
                            <div>
                                <CiImageOn className="text-4xl" />
                            </div>
                            <span className="mt-2 text-base font-medium leading-normal text-gray-600 dark:text-gray-300">
                                Select a Image
                            </span>
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={e => setImageState(e.target.files[0])}
                            />
                        </label>
                    </Card>
                </div>
            }
            {imageState && (
                <div className="">
                    <div className="flex items-center justify-between">
                        <h2 className="mb-2 text-lg font-semibold text-gray-600 dark:text-gray-400">Selected Image:</h2>
                        <button onClick={() => setImageState("")} className="p-3 border rounded-full dark:border-gray-600">
                            <HiOutlineTrash className="text-2xl" />
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center pt-2">
                        <Image
                            src={URL.createObjectURL(imageState)}
                            alt="Selected"
                            className={`${className} w-full rounded-md max-h-[20rem] object-cover`}
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadFile;