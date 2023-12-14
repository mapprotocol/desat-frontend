
import * as React from 'react';
import styles from './index.module.css'
import Image from 'next/image'
import { cancelListToken, createBid, createBidPrepare, createModifyPrice, createPutOff, createPutOn, getTransferableInscription, listToken, placeOrder, updateListToken } from '@/api';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, List, Card, Input, Slider, InputNumber, Row, Col, Descriptions, message } from 'antd';



export const BuyToken = ({ order, tokenInfo, btcPrice }) => {
    const router = useRouter()
    const [selectedId, setSelectedId] = React.useState(null);
    const myOrder = (order.seller == unisat._selectedAddress ? true : false)
    const [gasData, setGasData] = React.useState({});

    const [total, setTotal] = React.useState(0)

    const [inputValue, setInputValue] = React.useState(0);



    useEffect(() => {
        createBidPrepare({
            action_id: order.action_id,
            address: unisat._selectedAddress
        }).then(res => {

            setGasData(res.data)

        })

    }, [order])


    const createBidfun = async () => {
        const pubkey = await window.unisat.getPublicKey();

        createBid({
            action_id: gasData.action_id,
            bid_price: order.unit_price,
            fee_rate: selectedId == 3 ? inputValue : gasCard[selectedId].content,
            buyer: unisat._selectedAddress,
            pubkey: pubkey

        }).then(async res => {

            const toSignInputs: any[] = []
            res.data.bid_sign_indexed.forEach((item: { index: any; sign_hash_type: number }) => {
                toSignInputs.push({
                    index: item.index,
                    publicKey: pubkey,
                    sighashTypes: [1]
                })
            })
            console.log(res.data.psbt_bid, toSignInputs)
            const signedPsbt = await unisat.signPsbt(
                res.data.psbt_bid,
                {
                    autoFinalized: false,
                    toSignInputs: toSignInputs
                });

            placeOrder({
                bid_id: res.data.bid_id,
                psbt: signedPsbt
            }).then(res => {
                message.success('Success!')
                setTimeout(() => {
                    router.reload()

                }, 1000)

            })
        })




    }

    const handleSelectItem = (item: any, id: any) => {
        setSelectedId(id);
    };

    const createModifyPriceFun = async () => {
        const pubkey = await window.unisat.getPublicKey();

        createModifyPrice({
            action_id: gasData.action_id,
            unit_price: 1,
        }).then(async res => {

            const toSignInputs: any[] = []
            res.data.sign_indexes.forEach((item: { index: any; sign_hash_type: number }) => {
                toSignInputs.push({
                    index: item.index,
                    publicKey: pubkey,
                    sighashTypes: [item.sighash_type]
                })
            })
            console.log(res.data.psbt, toSignInputs)
            const signedPsbt = await unisat.signPsbt(
                res.data.psbt,
                {
                    autoFinalized: false,
                    toSignInputs: toSignInputs
                });

            updateListToken({
                action_id: gasData.action_id,
                psbt: signedPsbt
            }).then(res => {
                message.success('Success!')
                setTimeout(() => {
                    router.reload()

                }, 1000)

            })
        })




    }

    const createPutOffFun = async () => {
        const pubkey = await window.unisat.getPublicKey();

        createPutOff({
            action_id: gasData.action_id,
            fee_rate: selectedId == 3 ? inputValue : gasCard[selectedId].content,
        }).then(async res => {

            const toSignInputs: any[] = []
            res.data.sign_indexes.forEach((item: { index: any; sign_hash_type: number }) => {
                toSignInputs.push({
                    index: item.index,
                    publicKey: pubkey,
                    sighashTypes: [1]
                })
            })
            console.log(res.data.psbt, toSignInputs)
            const signedPsbt = await unisat.signPsbt(
                res.data.psbt,
                {
                    autoFinalized: false,
                    toSignInputs: toSignInputs
                });

            cancelListToken({
                action_id: gasData.action_id,
                psbt: signedPsbt
            }).then(res => {

                message.success('Success!')
                setTimeout(() => {
                    router.reload()

                }, 1000)
            })
        })
    }
    const onChange = (newValue: number) => {
        setInputValue(newValue);
    };

    const gasCard = [
        {
            title: 'Slow',
            content: gasData.low_fee_rate
        },
        {
            title: 'Average',
            content: gasData.middle_fee_rate
        },
        {
            title: 'Fast',
            content: gasData.high_fee_rate
        },
        {
            title: 'Custom',
            content: <Row>
                <Col span={12}>
                    <Slider
                        min={1}
                        max={gasData.high_fee_rate}
                        onChange={onChange}
                        value={typeof inputValue === 'number' ? inputValue : 0}
                    />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={1}
                        max={gasData.high_fee_rate}
                        style={{ margin: '0 16px' }}
                        value={inputValue}
                        onChange={onChange}
                    />
                </Col>
            </Row>
        },
    ];

    const items = [
        {
            label: "Name",
            span: { xl: 4, xxl: 2 },
            children: order.tick,
        },
        {
            label: 'Seller',
            span: { xl: 4, xxl: 4 },
            children: order.seller,
        },
        {
            label: 'Action Id',
            span: { xl: 4, xxl: 4 },
            children: order.action_id,
        },
        {
            label: 'Amount',
            span: { xl: 2, xxl: 2 },
            children: order.amount.toLocaleString('en-US'),
        },
       
        {
            label: 'Unit Price',
            span: { xl: 2, xxl: 2 },
            children: order.unit_price,
        },
        {
            label: 'Total Value(sats)',
            span: { xl: 2, xxl: 2 },
            children: order.amount * order.unit_price + " sats",
        },
        {
            label: 'Total Value($)',
            span: { xl: 2, xxl: 2 },
            children: "$ " + (order.amount * order.unit_price * btcPrice.usd * 0.00000001).toFixed(3),
        },
        {
            label: 'Service Fee(sats)',
            span: { xl: 2, xxl: 2 },

            children: order.amount * order.unit_price * gasData.service_fee_rate + " sats",
        },
        {
            label: 'Service Fee($)',
            span: { xl: 2, xxl: 2 },

            children: "$ " + (order.amount * order.unit_price * btcPrice.usd * 0.00000001 * gasData.service_fee_rate).toFixed(3),
        },
        {
            label: 'Total(sats)',
            span: { xl: 2, xxl: 2 },
            children: order.amount * order.unit_price + order.amount * order.unit_price * gasData.service_fee_rate + " sats",
        },
        {
            label: 'Total($)',
            span: { xl: 2, xxl: 2 },
            children: "$ " + (order.amount * order.unit_price * btcPrice.usd * 0.00000001 * gasData.service_fee_rate + order.amount * order.unit_price * btcPrice.usd * 0.00000001).toFixed(3),
        },


    ];
    return (
        <>
            <div className={styles.listToken}>
                <Descriptions
                    title="Order Info"
                    bordered
                    column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                    items={items}
                />

                <div>
                    <div className={styles.title}>Transaction Fees</div>
                    <List
                        grid={{ gutter: 16, column: 2 }}
                        dataSource={gasCard}
                        renderItem={(item, index) => (
                            <List.Item
                                style={{
                                    width: index == 3 ? '100%' : 'initial',

                                }}
                                onClick={() => handleSelectItem(item, index)}>
                                <Card
                                    style={{

                                        borderColor: selectedId === index ? '#0054FC' : '',
                                        padding: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.5s',
                                        borderRadius: '12px',
                                        marginBottom: '12px'
                                    }}

                                    title={item.title}>{index == 3 ? item.content : item.content + " sat/vB"}</Card>
                            </List.Item>
                        )}
                    />
                </div>

                <div className={styles.buttons}>
                    {myOrder ?
                        <><Button disabled={selectedId === null} style={{ width: '96px', marginTop: '24px' }} onClick={
                            createPutOffFun
                        } type="primary" >CANCEL</Button>
                            <Button disabled={selectedId === null} style={{ width: '96px', marginTop: '24px' }} onClick={
                                createModifyPriceFun
                            } type="primary" >UPDATE</Button>
                        </> : <Button disabled={selectedId === null} style={{ width: '96px', marginTop: '24px' }} onClick={
                            createBidfun
                        } type="primary" >BUY</Button>}
                </div>
            </div>
        </ >
    )

}

