import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./ContentList.module.scss"

function ContentList({ content }) {
    const router = useRouter()
    const [selectedArtwork, setSelectedWork] = useState(null)
    const { sectionTitle, subCategories, sectionDescription, artworks } = content.fields

    useEffect(() => {
        setSelectedWork(null)
    }, [content])

    return (
        <div className={styles.contentList}>
            <header className={styles.contentListHeader}>
                <h2>{selectedArtwork ? selectedArtwork.fields.artworkTitle : sectionTitle}</h2>
                <small>{selectedArtwork ? null : subCategories}</small>
            </header>
            <div className={styles.categoryDescription}>{selectedArtwork ? documentToReactComponents(selectedArtwork.fields.artworkDescription) : documentToReactComponents(sectionDescription)}</div>
            {!selectedArtwork && artworks?.length > 0 ? (
                <ul
                    className={styles.artworksList}
                >
                    {artworks.map(a => {
                        const ROUTE_NAME = a.fields.artworkTitle.toLowerCase().replace(' ', '-')
                        return (
                            <Link
                                href={{
                                    pathname: '/[category]/[artwork]',
                                    query: {
                                        artwork: ROUTE_NAME,
                                        category: router.query.category
                                    }
                                }}
                                key={`https:${a.fields.artworkImages[0].fields.file.url}`}
                            >
                                <li
                                    className={styles.artworksListItem}
                                    onClick={() => setSelectedWork(a)}
                                >
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src={`https:${a.fields.artworkImages[0].fields.file.url}`}
                                            alt=""
                                            height={a.fields.artworkImages[0].fields.file.details.image.height}
                                            width={a.fields.artworkImages[0].fields.file.details.image.width}
                                            layout="responsive"
                                            className={styles.artworkImage}
                                            quality={100}
                                            placeholder="blur"
                                            blurDataURL={`https:${a.fields.artworkImages[0].fields.file.url}`}
                                        />
                                        <section className={styles.artworkInfo}>
                                            <p className="title">{a.fields.artworkTitle}</p>
                                            <p>{a.fields.techniques}</p>
                                            <p>{a.fields.location}, {a.fields.year}</p>
                                            <button className={styles.learnMore}>LEARN MORE</button>
                                        </section>
                                    </div>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            ) : null}
        </div>
    )
}

export default ContentList
