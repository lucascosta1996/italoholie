import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const NavbarWrapper = styled.nav`
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Inter Tight', sans-serif;
    font-weight: 600;
    top: 15px;
    left: 15px;
    width: 100%;
    z-index: 2;
    background-color: transparent;
    height: auto;
    transition: all ease 0.2s;

    @media (max-width: 912px) {
        background-color: #000;
        top: 0;
        left: 0;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        height:100%;
    }

    .logo-container {
        width: 250px;
        margin: 0;
        transition: all ease 0.6s;

    }

    .menu-items {
        display: flex;
        list-style: none;
        padding-left: 0;
        padding-right: 30px;
        transition: all ease 0.6s;

        @media (max-width: 912px) {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            height: 300px;
            padding-right: 0;
            margin-top: 50px; 
        }

        li {
            font-size: 13px;
            letter-spacing: 2px;
            padding: 0 10px;
            text-transform: uppercase;

            @media (max-width: 912px) {
                font-size: 18px;
                line-height: 28px;
                letter-spacing: 4px;
            }
        }
    }

    .close-button {
        font-size: 25px;
        font-weight: 100;
        cursor: pointer;
        position: absolute;
        right: 35px;
        top: 25px;
        z-index: 5;

        @media (min-width: 912px) {
            display: none;
        }
    }

    .mobile-background {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        height: 100vh;
        width: 170%;
        filter: grayscale(1);
        opacity: 0.2;

        @media (min-width: 912px) {
            display: none;
        }
    }

    .mobile-icons {
        @media (min-width: 912px) {
            display: none;
        }

        display: flex;

        a {
            margin: 0px 20px;
        }
    }

    .desktop-icon {
        @media (max-width: 912px) {
            display: none;
        }
    }
`

function Navbar({ logo, menuItems, closeOption, showCloseButton, mobileSlideshow, background }) {

    return (
        <NavbarWrapper>
            <div className='logo-container'>
              <Image
                  src={`https:${logo.file.url}`}
                  alt="Picture of the author"
                  height={logo.file.details.image.height}
                  width={logo.file.details.image.width}
                  layout="responsive"
                  priority
              />
            </div>
            <ul className='menu-items'>
                <li className='mobile-icons'>
                    <a href="https://www.instagram.com/italoholietattoo/" target="__blank">
                        <i class="fa fa-instagram" styles={{fontSize: '46px'}}></i>
                    </a>
                    <a href="https://www.instagram.com/italoholietattoo/" target="__blank">
                        <i class="fa fa-facebook-official" styles={{fontSize: '46px'}}></i>
                    </a>
                    <a href="https://www.instagram.com/italoholietattoo/" target="__blank">
                        <i class="fa fa-youtube-play" styles={{fontSize: '46px'}}></i>
                    </a>
                </li>
                <li className='desktop-icon'>
                    <a href="https://www.instagram.com/italoholietattoo/" target="__blank">
                        <i class="fa fa-instagram" styles={{fontSize: '46px'}}></i>
                    </a>
                </li>
                <li className='desktop-icon'>
                    <a href="https://www.instagram.com/italoholietattoo/" target="__blank">
                        <i class="fa fa-facebook-official" styles={{fontSize: '46px'}}></i>
                    </a>
                </li>
                <li className='desktop-icon'>
                    <a href="https://www.instagram.com/italoholietattoo/" target="__blank">
                        <i class="fa fa-youtube-play" styles={{fontSize: '46px'}}></i>
                    </a>
                </li>
                {menuItems.map((menuItem) => {
                    const ROUTE_NAME = menuItem.fields.sectionTitle.toLowerCase().replace(' ', '-')
                    return (
                        <li
                            onClick={() => closeOption()}
                            key={menuItem.fields.sectionTitle}
                        >
                            <Link
                                href={{
                                    pathname: '[category]',
                                    query: { category: ROUTE_NAME }
                                }}
                            >
                                {menuItem.fields.sectionTitle}
                            </Link>
                        </li>
                    )
                })}
                <li
                    onClick={() => closeOption()}
                >
                    <Link
                        href="/about"
                    >
                        about
                    </Link>
                </li>
                <li
                    onClick={() => closeOption()}
                >
                    <Link
                        href="/contact"
                    >
                        Contact
                    </Link>
                </li>
                <li
                    onClick={() => closeOption()}
                >
                    <Link
                        href="/booking"
                    >
                        Booking
                    </Link>
                </li>
            </ul>
            <div className='mobile-background'>
                <Image
                    src={`https:${background.fields.file.url}`}
                    alt="Picture of the author"
                    height={background.fields.file.details.image.height}
                    width={background.fields.file.details.image.width}
                    layout="responsive"
                    priority
                />
            </div>
            {showCloseButton ? (
                <span
                    className="close-button"
                    onClick={() => closeOption()}
                >
                    X
                </span>
            ) : null}
        </NavbarWrapper>
    )
}

export default Navbar