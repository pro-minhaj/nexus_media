import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// List of emoji symbols with their Unicode representation
const emojiSymbols = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '😘', '😗', '😙', '😚', '😋', '😜', '😝', '😛', '🤑', '🤗', '🤓', '😎', '🤡', '🤠', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '😤', '😠', '😡', '😶', '😐', '😑', '😯', '😦', '😧', '😮', '😲', '😵', '😳', '😱', '😨', '😰', '😢', '😥', '🤤', '😭', '😓', '😪', '😴', '🙄', '🤔', '🤥', '😬', '🤐', '🤢', '🤧', '😷', '🤒', '🤕', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '👾', '🤖', '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'
];

const EmojiSlider = ({ setEmoji, slidePerView }) => {

    return (
        <>
            <div>
                <Swiper
                    slidesPerView={slidePerView || 10}
                    spaceBetween={5}
                    breakpoints={{
                        50: {
                            slidesPerView: 6,
                        },
                        768: {
                            slidesPerView: 6,
                        },
                        1000: {
                            slidesPerView: 8,
                        },
                        1600: {
                            slidesPerView: slidePerView || 10,
                        },
                    }}
                >
                    {
                        emojiSymbols.map((symbol, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <button onClick={() => setEmoji((prev) => prev + symbol)} type='button' className='flex items-center justify-center w-10 h-10 text-xl rounded-full'>
                                        {symbol}
                                    </button>
                                </SwiperSlide>
                            );
                        })
                    }
                </Swiper>
            </div >
        </>
    );
};

export default EmojiSlider;