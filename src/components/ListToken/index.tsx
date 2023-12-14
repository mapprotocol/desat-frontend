
import * as React from 'react';
import styles from './index.module.css'
import Image from 'next/image'
import { createPutOn, getTransferableInscription, listToken } from '@/api';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Input, List, Tag, message } from 'antd';



export const ListToken = ({ btcPrice }) => {
    const router = useRouter()
    const [selectedId, setSelectedId] = React.useState(null);

    const [tokenList, setTokenList] = React.useState([])
    const [total, setTotal] = React.useState(0)
    const [value, setValue] = React.useState("");
    const [disabled, setDisable] = React.useState(false);
    const [cost, setCost] = React.useState(0);



    useEffect(() => {
        if (router.isReady) {
            getTransferableInscriptionFunc()
        }
        unisat.requestAccounts()
    }, [router.isReady])

    const getTransferableInscriptionFunc = async () => {
        await getTransferableInscription({
            tick: router.query.tick.toUpperCase(),
            address: unisat._selectedAddress
        }).then(res => {
            setTokenList(res.data)
            let _total = 0
            res.data.forEach(item => {
                if (item.is_locked == false) {
                    _total += item.amount
                }
            });
            setTotal(_total)
        })
    }
    const handleSelectItem = (item: any, id: any) => {
        if (item.is_locked)
            return
        setSelectedId(selectedId === id ? null : id);
    };

    const handleInputChange = (e) => {
        // 使用正则表达式限制只能输入数字
        const newValue = e.target.value.replace(/[^0-9]/g, '');
        setValue(newValue);


        const newTotal = newValue ? parseInt(newValue, 10) * tokenList[selectedId].amount * btcPrice * 0.00000001 : 0;
        setCost(newTotal);
    };
    const listOrder = async () => {
        if(disabled) return
        try {
            setDisable(true)
            let atomicalInfo = tokenList[selectedId]
            const pubkey = await window.unisat.getPublicKey();
            // const putOnResponse = await createPutOn({
            //     tick: router.query.tick.toUpperCase(),
            //     atomical_id: atomicalInfo.atomical_id,
            //     tx_id: atomicalInfo.tx_id,
            //     vout: atomicalInfo.vout,
            //     amount: 10000,
            //     unit_price: 2,
            //     seller: unisat._selectedAddress,
            //     pubkey: pubkey
            // });
            const putOnResponse = await createPutOn({
                tick: router.query.tick.toUpperCase(),
                atomical_id: atomicalInfo.atomical_id,
                tx_id: atomicalInfo.tx_id,
                vout: atomicalInfo.vout,
                amount: atomicalInfo.amount,
                unit_price: Number(value),
                seller: unisat._selectedAddress,
                pubkey: pubkey
            });
            const toSignInputs: any[] = []
            putOnResponse.data.sign_indexes.forEach((item: { index: any; sign_hash_type: number }) => {
                toSignInputs.push({
                    index: item.index,
                    publicKey: pubkey,
                    sighashTypes: [131]
                })
            })

            const signedPsbt = await unisat.signPsbt(
                putOnResponse.data.psbt,
                {
                    autoFinalized: false,
                    toSignInputs: toSignInputs
                });

            console.log(signedPsbt)

            await listToken({
                action_id: putOnResponse.data.action_id,
                psbt: signedPsbt
            }).then(res => {
                message.success('List Success!')
                setTimeout(() => {
                    router.reload()

                }, 1000)
            });
            setDisable(false)

        } catch (error) {
            setDisable(false)

            console.error(error);
        }
    }
    return (
        <>
            <div className={styles.listToken}>
                <div className={styles.transferable}>
                    {"Available : "}<text style={{ color: '#0054FC' }}>{total}</text> {""}
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={tokenList}
                    renderItem={(item, index) => (
                        <List.Item
                            style={{
                                backgroundColor: selectedId === index ? '#e6f7ff' : '',
                                padding: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.5s',
                                borderRadius: '12px',
                                marginBottom: '12px'
                            }}
                            onClick={() => handleSelectItem(item, index)}
                        >
                            <List.Item.Meta
                                title={<>{item.tx_id} {item.is_locked && <Tag bordered={false} color={"error"}>
                                    {"locked"}</Tag>}</>}
                                description={`Amount: ${item.amount}`}
                            />
                        </List.Item>
                    )}
                />
                {selectedId !== null &&
                    <>
                        <div className={styles.title}> Unit Price</div>
                        <Input placeholder="unit price" value={value} onChange={handleInputChange} />
                        <div className={styles.total}
                        > {"Total: $ " + cost}</div>
                    </>}
                <Button style={{ width: '100%', marginTop: '24px' }} disabled={cost == 0} type="primary" onClick={listOrder}>LIST</Button>
            </div>
        </ >
    )

}