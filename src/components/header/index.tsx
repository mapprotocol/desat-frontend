import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import styles from './index.module.css'
import Router from 'next/router';
import { useRouter } from 'next/router';

import Head from 'next/head';

const Header = (

) => {
    const [currentTab, setCurrentTab] = useState<string | null>(null);
    const [fade, setFade] = useState(styles.header)
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const [languageLabel, setLanguageLabel] = useState('English')
    const navbarRef = useRef<any>(null);
    const [showPanel, setShowPanel] = useState(false);

    




   
    useEffect(() => {
        const headerVisibility = () => {
            if (window.pageYOffset > 100) {
                setFade(`${styles.header} ${styles.shadow}`)
            } else {
                setFade(`${styles.header}`)
            }
        };

        const handleOutsideClick = (e: MouseEvent) => {
            if (navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
                setCurrentTab(null);
                setShowPanel(false)
            }
        };

        window.addEventListener('click', handleOutsideClick);


        window.addEventListener("scroll", headerVisibility);
        return () => {
            window.removeEventListener('click', handleOutsideClick);
            window.removeEventListener('scroll', headerVisibility);
        };

    }, [])

    const jumpToLanguageSelect = () => {
        if (router.pathname !== "/language")
            Router.push(`/language?from=${router.asPath}`)
    }

    return (
        <>
            <header className={fade}>
                <div onClick={() => {
                    Router.push('/')
                }} className={styles.logoImage} >
                   
                </div>
                <div className={styles.headerRight} ref={navbarRef}>
             
                </div>

                
            </header>
        </>
    );
};

export default Header;

