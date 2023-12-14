
import * as React from 'react';
import styles from './index.module.css'
import Image from 'next/image'
import { createBid, createBidPrepare, createPutOn, getActivity, getTransferableInscription, listToken, placeOrder } from '@/api';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Table, Tag } from 'antd';
import { ellipsizeString, formatDate } from '@/utils/utils';

const status = ["All", "Listed", "Sold", "Unlisted", "Updated"]
const color = ["blue", "processing", "success", "error", "warning"]


export const MyOrder = ({ btcPrice }) => {
    const router = useRouter()
    const [activity, setActivity] = React.useState<any>();



    const columns: any = [
        {
            title: 'Action Id',
            dataIndex: 'action_id',
        },
        {
            title: 'Event',
            dataIndex: 'event',
            render: (event: any) => <>{
                <Tag bordered={false} color={color[event]}>
                    {status[event]}</Tag>}</>,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            render: (amount: any) => <>{amount.toLocaleString('en-US')}</>,
        },
        {
            title: 'Unit Price',
            dataIndex: 'unit_price',
            render: (unit_price: any) => <>{unit_price + " sat"}</>,
        },
        {
            title: 'Total cost',
            dataIndex: '',
            render: (_: any, item) => <>{"$ " + item.unit_price * item.amount * btcPrice * 0.00000001}</>,
        },
        {
            title: 'Seller',
            dataIndex: 'seller',
            render: (address: string) => <>{ellipsizeString(address, 8, 8)}</>,

        },
        {
            title: 'Buyer',
            dataIndex: 'buyer',
            render: (address: string) => <>{ellipsizeString(address, 8, 8)}</>,

        },
        {
            title: 'Date',
            dataIndex: 'timestamp',
            render: (timestamp: any) => <>{formatDate(timestamp * 1000)}</>,
        },
    ];



    useEffect(() => {

        getActivity({
            tick: router.query.tick,
            offset: 1,
            address: unisat._selectedAddress,
            limit: 20
        }).then(res => {
            setActivity(res.data.order_events)

        })
    }, [])




    return (
        <>
            <Table columns={columns} dataSource={activity} />
        </ >
    )

}

