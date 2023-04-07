import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Link from 'next/link';

const ListItem = styled.li`
    position: relative;
    cursor: pointer;
    flex: 1;
    list-style: none;
    height: 100vh;
    ${props => props.isMenuOpen && 'flex-grow: 10;'}
    transition: all ease 1s;
    background-color: #000;
    color: #fff;

    header {
        /* ${props => !props.isMenuOpen && 'display: none;'} */
        margin: 20px;
        max-height: 418px;
        transition: all ease 1s;

        > div {
            position: unset !important;
        }

        .image {
            object-fit: cover;
            width: 100% !important;
            position: relative !important;
            height: unset !important;
            filter: grayscale();
            opacity: 0.2;
            ${props => props.isMenuOpen && 'filter: none;'}
            ${props => props.isMenuOpen && 'opacity: 1;'}
            ${props => props.isMenuOpen && 'object-fit: contain;'}
            transition: all ease 1s;
        }
    }
`

const DesktopTitle = styled.h2`
    position: absolute;
    bottom: 0;
    left: 20px;
    margin: 0;
    text-transform: uppercase;
    color: #FFF;
    display: flex;
    flex-wrap: no-wrap;
    font-family: 'Inter Tight', sans-serif;
    font-size: ${props => props.isMenuOpen ? '200' : '18'}px;
    transition: all ease 1s;

    div {
        display: inline-block;
        text-decoration: none;
        text-align: center;
        transition: all ease 1s;
    }
`;

export default function MenuItem({
    title,
    background,
    setMenuOpen,
    isMenuOpen,
    image,
    setCategory
}) {
    const listItemRef = useRef(null)
    const titleDividedByLetters = title.toUpperCase().split('')
    const [titleFontSize, setTitleFontSize] = useState(18)
    const [openMenuFontSize, setOpenMenuFontSize] = useState(0)
    const ROUTE_NAME = title.toLowerCase().replace(' ', '-')

    useEffect(() => {
        const charactersSize = listItemRef.current.clientWidth / titleDividedByLetters.length
        setOpenMenuFontSize(charactersSize)
    }, [isMenuOpen, setMenuOpen])


    return (
        <ListItem
            ref={listItemRef}
            background={background}
            titleFontSize={titleFontSize}
            isMenuOpen={isMenuOpen}
            onMouseEnter={setMenuOpen}
        >
            <header>
                <Image
                    src={`https:${image.file.url}`}
                    alt=""
                    height={image.file.details.image.height}
                    width={image.file.details.image.width}
                    layout="fill"
                    className="image"
                    quality={100}
                    placeholder="blur"
                    blurDataURL={`https:${image.file.url}`}
                />
            </header>
            <Link
                href={{
                    pathname: '[category]',
                    query: { category: ROUTE_NAME }}
                }
            >
                <DesktopTitle
                    fontSize={isMenuOpen ? openMenuFontSize : titleFontSize}
                    isMenuOpen={isMenuOpen}
                >
                    {title}
                </DesktopTitle>
            </Link>
        </ListItem>
    )
}
