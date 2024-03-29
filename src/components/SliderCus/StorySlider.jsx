"use client"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import StoryModal from '../Shared/Modal/StoryModal';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import StorySliderLoading from './StorySliderLoading';

const StorySlider = () => {
    const [loading, setLoading] = useState(true);
    const [stories, setStories] = useState([]);

    useEffect(() => {
        getAllStory()
            .then(story => {
                setLoading(false);
                setStories(story)
            })
    }, [])

    const getAllStory = async () => {
        const response = await fetch('http://localhost:3000/api/story');
        const data = await response.json();
        return data;
    }

    return (
        <div>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                    50: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    210: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    280: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                    350: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                    500: {
                        slidesPerView: 8,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                    1000: {
                        slidesPerView: 8,
                        spaceBetween: 10,
                    },
                    1600: {
                        slidesPerView: 14,
                        spaceBetween: 10,
                    },
                }}
            >
                {
                    loading ? <SwiperSlide><StorySliderLoading /></SwiperSlide> : stories?.map((item, index) => (
                        <SwiperSlide className='!flex' key={index}>
                            <StoryModal
                                item={item}
                                card={<Image
                                    src={item.
                                        storyPhoto}
                                    width={50}
                                    height={50}
                                    loading='lazy'
                                    className='rounded-full w-[3.125rem] h-[3.125rem] border-[3px] border-blue-400 dark:border-blue-500'
                                    alt="Image"
                                />} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default StorySlider;