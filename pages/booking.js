import { useForm } from "react-hook-form"
import { createClient } from 'contentful'
import styled from 'styled-components'
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { DateTimePicker } from 'react-rainbow-components';
import { InlineWidget } from 'react-calendly';

import Navbar from '../components/menu/Navbar'
import Sidebar from '../components/menu/Sidebar'
import MenuIcon from '../components/menuIcon/MenuIcon'
import Head from "next/head"

export async function getServerSideProps() {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY
    })
  
    const mainMenu = await client.getEntries({
        content_type: "menu",
        limit: 1,
        include: 10
    })

    return {
      props: {
        menu: mainMenu
      }
    }
}

const CategoryWrapper = styled.div`
    display: flex;
    padding-left: 230px;

    @media (max-width: 912px) {
        padding-left: 0;
    }

    .mobile-navbar {
        position: fixed;
        left: 0;
        z-index: 9;
        width: 100%;
        height: 100%;

        @media (min-width: 912px) {
            display: none;
        }
    }

    .hide {
        display: none;
    }

    .menu-icon {
        position: fixed;
        right: 25px;
        top: 25px;
        z-index: 5;
    }
`

const FormWrapper = styled.form`
    padding: 70px 0;
    margin: 0 auto;
    width: 840px;
    padding-left: 50px;
    ${props => props.sendingMessage && 'opacity: 0.2;'}
    max-height: 350px;

    @media (max-width: 912px) {
        width: 100%;
        padding-left: 0;
        padding-top: 20px;
    }

    input, textarea {
        width: 100%;
        padding: 12px;
        margin: 6px 0 4px;
        border: 1px solid #ccc;
        background: #fafafa;
        color: #000;
        font-family: sans-serif;
        font-size: 12px;
        line-height: normal;
        box-sizing: border-box;
    }

    textarea {
        height: 150px;
    }

    .date-time-picker {
        input {
            border-radius: 0;
            width: 100%;
        }

        label {
            align-self: flex-start;
            color: #fafafa;
        }
    }
`

const Container = styled.div`
    display: flex;
    width: 840px;
    margin: 0 auto;
    font-size: 14px;

    @media (max-width: 912px) {
        flex-direction: column;
        width: 95%;
    }

    .make-contact {
        width: 40%;
        margin-right: 50px;
        padding: 70px 0;

        @media (max-width: 912px) {
            width: 95%;
            margin-right: 0;
            padding-bottom: 0;
        }

        h2 {
            margin-top: 0;

            @media (max-width: 912px) {
                margin-bottom: 0;
            }
        }
    }

    .submit-button {
        font-weight: 700;
        font-style: normal;
        line-height: 1.6em;
        text-transform: none;
        letter-spacing: .02em;
        background-color: #fff;
        border-radius: 0;
        text-shadow: none;
        color: #171717;
        border: none;
        padding: 5px 20px;
        box-shadow: none;
        width: 100px;
        cursor: pointer;

        &:hover {
            opacity: 0.7;
        }
    }
`

function Booking({ menu }) {
  const [ mobileMenu, setMobileMenu ] = useState(false)
  const [ messageSent, setMessageSent ] = useState(false)
  const [ sendingMessage, setSendindMessage ] = useState(false)
  const form = useRef()
  
  return (
    <CategoryWrapper>
        <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        </Head>
        <div className="menu-icon">
            <MenuIcon
                onClick={() => setMobileMenu(true)}
            />
        </div>
        <Sidebar
            logo={menu?.items[0].fields.menuLogo.fields}
            menuItems={menu?.items[0].fields.menuItems}
        />
        <div className={`${mobileMenu ? 'mobile-navbar ' : 'hide'}`}>
            <Navbar
                logo={menu?.items[0].fields.menuLogo.fields}
                menuItems={menu?.items[0].fields.menuItems}
                startBigLogo={true}
                closeOption={() => setMobileMenu(false)}
                showCloseButton={true}
                background={menu?.items[0].fields.mobileBackground}
            />
        </div>
        <Container>
            <div className="make-contact">
                <h2>Make an appointment</h2>
                {/* TODO: CHANGE FOR CONTENTFUL DATA */}
                <p>{`I'll be back in touch as soon as possible.`}</p>
            </div>
            {messageSent ? (
                <FormWrapper>Thank you!</FormWrapper>
            ) : (
                <FormWrapper onSubmit={handleSubmit(sendEmail)} sendingMessage={sendingMessage} ref={form}>
                    <InlineWidget
                        url="https://calendly.com/italoholie"
                    />
                </FormWrapper>
            )}
        </Container>
    </CategoryWrapper>
  )
}

export default Booking
