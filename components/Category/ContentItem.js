import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'
import Carousel from '../Carousel/Carousel'
import styles from './ContentItem.module.scss'

function ContentItem({ content }) {
    const { artworkTitle, artworkDescription, artworkImages, year, location } = content.fields
    const [ carouselVisibility, setCarouselVisibility ] = useState(false)
    const [ slidePosition, setSlidePosition ] = useState(0)

    return (
        <div className={styles.contentItem}>
             <header className={styles.contentItemHeader}>
                <h2>{artworkTitle}</h2>
                <small>{location}, {year}</small>
            </header>
            <div className={styles.artworkDescription}>{documentToReactComponents(artworkDescription)}</div>
            <section className={styles.artworkImagesList}>
                {artworkImages.map((artworkImage, index) => (
                    <div
                        className={styles.artworkImage}
                        onClick={() => {
                            setCarouselVisibility(true);
                            setSlidePosition(index)
                        }}
                    >
                        <Image
                            src={`https:${artworkImage.fields.file.url}`}
                            alt=""
                            height={artworkImage.fields.file.details.image.height}
                            width={artworkImage.fields.file.details.image.width}
                            layout="responsive"
                            quality={100}
                            placeholder="blur"
                            blurDataURL={`https:${artworkImage.fields.file.url}`}
                        />
                    </div>
                ))}
            </section>
            {carouselVisibility ? (
                <Carousel images={artworkImages} initialSlide={slidePosition} close={() => setCarouselVisibility(false)} />
            ) : null}
        </div>
    )
}

export default ContentItem
