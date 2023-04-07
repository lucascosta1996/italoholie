import { createClient } from 'contentful'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import ContentItem from '../../components/Category/ContentItem'
import Sidebar from '../../components/menu/Sidebar'

export async function getServerSideProps() {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY
    })
  
    const content = await client.getEntries({
        content_type: "menu",
        limit: 1,
        include: 10
    })

    return {
      props: {
        content: content
      }
    }
}

const ArtworkWrapper = styled.div`
    display: flex;
    padding-left: 230px;
    overflow-x: hidden;
    background-color: #000;
    color: #fff;

    @media (max-width: 912px) {
        padding-left: 0;
    }

    .menu-icon {
        position: fixed;
        left: 9px;
        top: 25px;
        z-index: 5;
        font-size: 24px;

        @media (min-width: 912px) {
            display: none;
        }
    }
`

function Artwork({ content }) {
    const router = useRouter()

    const activeCategory = content.items[0].fields.menuItems.find(i => (
        i.fields.sectionTitle.toLowerCase().replace(' ', '') === router.query.category
    ))

    const activeArtwork = activeCategory.fields.artworks.find(a => (
       a.fields.artworkTitle.toLowerCase().replace(' ', '-') === router.query.artwork
    ))

    return (
        <ArtworkWrapper>
            <div
                className="menu-icon"
                onClick={() => router.back()}
            >
                &larr;
            </div>
            <Sidebar
                logo={content.items[0].fields.menuLogo.fields}
                menuItems={content.items[0].fields.menuItems}
            />
            <ContentItem content={activeArtwork} />
        </ArtworkWrapper>
    )
}

export default Artwork
