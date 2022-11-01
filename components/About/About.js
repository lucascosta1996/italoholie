import styles from './About.module.scss'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

function AboutContent({ content }) {
    console.log(content)
    return (
        <div
            className={styles.about}
        >
            <section className={styles.artistPictures}>
                {content.items[0].fields.artistPictures.map(pic => (
                    <div className={styles.picture}>
                        <Image
                            src={`https:${pic.fields.file.url}`}
                            alt=""
                            height={pic.fields.file.details.image.height}
                            width={pic.fields.file.details.image.width}
                            layout="responsive"
                            quality={100}
                            placeholder="blur"
                            blurDataURL={`https:${pic.fields.file.url}`}
                        />
                    </div>
                ))}
            </section>
            <section className={styles.artistDescription}>
                <h2>
                    {content.items[0].fields.title}
                </h2>
                <div>
                    {documentToReactComponents(content.items[0].fields.artistBio)}
                </div>
            </section>
        </div>
    )
}

export default AboutContent
