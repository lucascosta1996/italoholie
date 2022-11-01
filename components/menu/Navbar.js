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
    ${props => props.smallLogo ? 'top: 15px' : 'top: 0'};
    ${props => props.smallLogo ? 'left: 15px' : 'left: 0'};
    width: 100%;
    z-index: 2;
    ${props => props.smallLogo ? 'background-color: transparent' : 'background-color: #000'};
    ${props => props.smallLogo ? 'height; auto' : 'height: 100vh'};
    transition: all ease 0.2s;

    @media (max-width: 912px) {
        background-color: #000;
        top: 0;
        left: 0;
        flex-direction: column;
        justify-content: center;
        overflow-y:auto;
        height:100%;
    }

    .logo-container {
        ${props => props.smallLogo ? 'width: 250px' : 'width: 100%'};
        ${props => props.smallLogo ? 'margin: 0' : 'margin: 0 auto'};
        transition: all ease 0.6s;

    }

    .menu-items {
        ${props => props.smallLogo ? 'display: flex' : 'display: none'};
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
`

function Navbar({ logo, menuItems, startBigLogo, closeOption, showCloseButton }) {
    const [ smallLogo, setSmallLogo ] = useState(startBigLogo);
    console.log('closeOption', closeOption)
    useEffect( () => {
        setTimeout( () => {
            setSmallLogo(true)
        }, 3000 )
    }, []);

    return (
        <NavbarWrapper
            smallLogo={smallLogo}
        >
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
                <li>
                    <a href="https://www.instagram.com/italoholietattoo/" target="__blank">
                        <i class="fa fa-instagram" styles={{fontSize: '46px'}}></i>
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
            </ul>
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