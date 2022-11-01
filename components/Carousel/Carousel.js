import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import styles from './Carousel.module.scss'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

function Carousel({ images, close, initialSlide }) {
    return (
        <div className={styles.carousel}>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                initialSlide={initialSlide}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {images.map(image => (
                    <SwiperSlide>
                        <div
                            className={styles.imageSlide}
                        >
                            <Image
                                src={`https:${image.fields.file.url}`}
                                className={styles.carouselImage}
                                alt=""
                                height={image.fields.file.details.image.height}
                                width={image.fields.file.details.image.width}
                                layout="fill"
                                quality={100}
                                placeholder="blur"
                                blurDataURL={`https:${image.fields.file.url}`}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <span
                className={styles.closeButton}
                onClick={() => close()}
            >
                x
            </span>
        </div>
    )
}

export default Carousel
