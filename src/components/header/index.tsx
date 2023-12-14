import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import styles from './index.module.css'
import Router from 'next/router';
import { useRouter } from 'next/router';
import { signIn, signInPrepare } from '@/api';
import { ellipsizeString } from '@/utils/utils';


const Header = (

) => {
    const [fade, setFade] = useState(styles.header)
    const [isOpen, setIsOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({
        address: ''
    })
    const router = useRouter();
    const [showPanel, setShowPanel] = useState(false);


    useEffect(() => {
        if (localStorage.getItem('accessToken') && new Date().getTime() > Number(localStorage.getItem('at_expires'))*1000 && localStorage.getItem('address') == unisat._selectedAddress) {
            setUserInfo({
                address: unisat._selectedAddress
            })
        }
        const headerVisibility = () => {
            if (window.pageYOffset > 100) {
                setFade(`${styles.header} ${styles.shadow}`)
            } else {
                setFade(`${styles.header}`)
            }
        };

        window.addEventListener("scroll", headerVisibility);
        return () => {
            window.removeEventListener('scroll', headerVisibility);
        };

    }, [])


    const signInFunc = async () => {
        // console.log(await window.unisat.signMessage("hello world"))
        if (userInfo.address)
            return
        signInPrepare({
            address: unisat._selectedAddress
        }).then(async res => {
            let signature = await window.unisat.signMessage(res.data.sign_message)
            let pubkey = await window.unisat.getPublicKey();
            signIn({
                address: unisat._selectedAddress,
                pubkey: pubkey,
                signature
            }).then(res => {
                localStorage.setItem('accessToken', res.data.access_token);
                localStorage.setItem('address', unisat._selectedAddress);

                localStorage.setItem('at_expires', res.data.at_expires);

                setUserInfo({
                    address: unisat._selectedAddress
                })
            })
        })
    }

    return (
        <div className={fade}>
            <div onClick={() => {
                Router.push('/')
            }} className={styles.logoImage} >
                <Image
                    fill
                    objectFit="contain"
                    src="/images/desat.png"
                    alt="" />

            </div>

            {/* <div onClick={()=>signInFunc }>{'singIn'}</div> */}
            <div className={styles.singIn} onClick={() => { signInFunc() }}>{userInfo.address ? ellipsizeString(userInfo.address, 8, 8)
                : 'signin'}</div>
        </div>
    );
};

export default Header;

