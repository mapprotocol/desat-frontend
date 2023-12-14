
import { createPutOn, getOrders, getTokenInfo, getTransferableInscription, listToken } from '@/api'
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react'
import styles from './index.module.css'
import { Tabs, Button, Dropdown, message, Space, Tooltip, Modal, Pagination } from 'antd';
import type { MenuProps } from 'antd';
import Image from 'next/image'

import Router, { useRouter } from 'next/router'
import { ListToken } from '@/components/ListToken';
import { BuyToken } from '@/components/buyToken';
import { Activity } from '@/components/Activity';
import { MyOrder } from '@/components/MyOrder';
import { ellipsizeString } from '@/utils/utils';
import { useBtcPrice } from '@/hooks/useBtcPrice';
import { Empty } from 'antd';
import { Spin } from 'antd';

type Props = {
    imageArray: number[]
}
let orderSort = 0
const dropArray = ["Price Low to High", "Price High to Low", "From Latest to Earliest", "From Earliest to Latest"]
export default function TokenTrade(

) {
    const router = useRouter()
    const [orders, setOrders] = useState([])
    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [drop, setDrop] = useState("Price: Low to High")
    const btcPrice = useBtcPrice()

    const [tokenInfo, setTokenInfo] = useState<any>({

    })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);

    };

    const showModal1 = (item:any) => {
        setIsModalOpen1(true);
        setOrder(item)
    };

    useEffect(() => {

        if (router.isReady) {
            getOrdersFunc()
            getTokenInfoFun()
        }
        window.unisat.requestAccounts()
    }, [router.isReady])


    const getTokenInfoFun = async () => {
        getTokenInfo({
            tick: router.query.tick,
        }).then(res => {
            setTokenInfo(res.data.tick_market_info)

        })
    }


    const getOrdersFunc = async () => {
        setLoading(true)
        await getOrders({
            tick: router.query.tick,
            limit: 20,
            sort: orderSort,
            offset: 1
        }).then(res => {
            setOrders(res.data.orders)
            setTotal(res.data.total)
            setLoading(false)

        })
    }
    const dropItems: MenuProps['items'] = [
        {
            label: 'Price Low to High',
            key: 0,
        },
        {
            label: 'Price High to Low',
            key: 1,
        },
        {
            label: 'From Latest to Earliest',
            key: 2,
        },
        {
            label: 'From Earliest to Latest',
            key: 3,

        },
    ];
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        setDrop(dropArray[Number(e.key)])
        orderSort = Number(e.key)
        getOrdersFunc()
    };




    const onChange = (key: string) => {
        console.log(key);

    };


    const items = [
        {
            key: '1',
            label: 'Listed',
            children: <div>
                <div className={styles.cardListTop}>
                    <div className={styles.freshLeft}>
                        <div className={styles.refresh} onClick={getOrdersFunc}>
                            <div className={styles.refreshIcon}>
                                <Image
                                    fill
                                    objectFit="contain"
                                    src="/images/refresh.png"
                                    alt="homepage" />
                            </div>
                        </div >
                        <Dropdown menu={{ items: dropItems, onClick: handleMenuClick }}>
                            <Button>
                                <Space>
                                    {drop}
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </div>
                    <Button type="primary" onClick={showModal}>
                        {"List my ARC-20"}
                    </Button>
                </div>
                <div className={styles.datas} >

                    {loading ? <Spin style={{ marginTop: '48px' }} /> :
                        <>
                            <div className={styles.cardList}>
                                {orders.map((item: any, index) => (
                                    <div onClick={() => showModal1(item)} key={index} className={styles.orderCard}>
                                        <div className={styles.cardTop}>
                                            <div className={styles.titleTop}>
                                                <span className={styles.cardTitle}>{item.tick}</span>
                                                <span className={styles.transfer}>{"Transfer"}</span>
                                            </div>
                                            <div className="text-2xl font-semibold" style={{ marginBottom: '8px' }}>{item.amount}</div>
                                            <div className="text-xs font-medium text-gray-400">{item.unit_price + " sats"}</div>
                                            <div className="text-xs font-medium">{"$ " + (btcPrice.usd * item.unit_price * item.amount * 0.00000001).toFixed(3)}</div>
                                        </div>
                                        <div className={styles.ordersId}>
                                            {ellipsizeString(item.action_id, 8, 8)}
                                        </div>
                                        <div className={styles.price}>
                                            {(item.unit_price * item.amount * 0.00000001)}
                                            <div className={styles.btcIcon}>
                                                <Image
                                                    fill
                                                    objectFit="contain"
                                                    src="/images/btc.png"
                                                    alt="homepage" />
                                            </div>
                                        </div>
                                        <div className={styles.buyButton}>
                                            {"buy"}
                                        </div>
                                    </div>
                                ))}</div>
                            <div className={styles.pagination}>
                                <Pagination showQuickJumper defaultCurrent={1} total={total} />
                            </div>
                        </>}
                </div>
            </div>,
        },
        {
            key: '2',
            label: 'Activity',
            children: <Activity btcPrice={btcPrice.usd} />,
        },
        {
            key: '3',
            label: 'My Orders',
            children: <MyOrder btcPrice={btcPrice.usd} />,
        },
    ];
    return (
        <div>
            {(tokenInfo && btcPrice) ? <div className={styles.tokenInfo} >
                <div className={styles.tokenName}>
                    {tokenInfo.icon_url && <Image
                        height={48}
                        width={48}

                        src={tokenInfo.icon_url}
                        alt="" />}
                    <div>  {tokenInfo.tick}</div>

                </div>
                <div className={styles.tokenRight}>
                    <div className={styles.infoTab}>
                        <div className={styles.tabTitle}>last price</div>
                        <div>{tokenInfo.last_price + ' sat'}</div>
                    </div>
                    <div className={styles.infoTab}>
                        <div className={styles.tabTitle}>24h %</div>
                        <div>{tokenInfo.increase_24h}</div>
                    </div>
                    <div className={styles.infoTab}>
                        <div className={styles.tabTitle}>Market Cap</div>
                        <div>{"$ " + (tokenInfo.market_cap * btcPrice.usd * 0.00000001).toFixed(3)}</div>
                    </div>

                    <div className={styles.infoTab}>
                        <div className={styles.tabTitle}>volume(24h)</div>
                        <div>{"$ " + (tokenInfo.volume_24h * btcPrice.usd * 0.00000001).toFixed(3)}</div>
                    </div>
                    <div className={styles.infoTab}>
                        <div className={styles.tabTitle}>Total Volume</div>
                        <div>{"$ " + (tokenInfo.volume_all * btcPrice.usd * 0.00000001).toFixed(3)}</div>
                    </div>
                </div>
            </div> : <></>}
            <div className={styles.body}>
                <Tabs defaultActiveKey="1" style={{ width: "100%" }} items={items} onChange={onChange} />
            </div>
            <Modal title="List Your Tokens" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <ListToken btcPrice={btcPrice.usd} />
            </Modal>

            <Modal width={960} open={isModalOpen1} onCancel={handleCancel1} closeIcon={null} footer={null}>
                <BuyToken order={order} tokenInfo={tokenInfo} btcPrice={btcPrice} />
            </Modal>
        </div>

    );
}
