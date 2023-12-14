
import { getTokens, getTotalInfo } from '@/api'
import { useEffect, useState } from 'react'
import Router from 'next/router';
import styles from './index.module.css'
import Image from 'next/image'
import { Button, Space, Spin, Table } from 'antd';
import { useBtcPrice } from '@/hooks/useBtcPrice';

let sort = 0
type Props = {
  imageArray: number[]
}

export default function HomePage(

) {
  const [total, setTotal] = useState({
    support_token_count: 0,
    total_success_tx_count: 0,
    turnover_24h: 0,
    turnover_all: 0,
  })
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const btcPrice = useBtcPrice()
  const [tokens, setTokens] = useState([])

  useEffect(() => {
    getTotalInfo().then(res => {
      setTotal(res.data)
    })

  }, [])

  useEffect(() => {
    // 在组件加载和页码变化时调用API
    getTokenFun(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);


  const getTokenFun = (page, pageSize) => {
    setLoading(true);

    const offset = page;
    getTokens({
      sort: sort,
      offset: offset,
      limit: pageSize,
      is_desc:true
    }).then(res => {
      setTokens(res.data.tick_market_infos);
      setPagination(prev => ({
        ...prev,
        current: page,
        pageSize,
        total: res.data.total,
      }));
      setLoading(false);
    });
  };

  const jumpTokenTrade = (token) => {

    Router.push(`/token-trade?tick=${token.tick}`)
  }
  // const getAccount = async () => {
  //   try {
  //     let res = await window.unisat.getAccounts();
  //     console.log(res)
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  // const connect = () => {
  //   if (typeof window.okxwallet !== 'undefined') {
  //     console.log('UniSat Wallet is installed!');
  //     window.okxwallet.bitcoin.connect()
  //   }

  // }

  const columns: any = [
    // {
    //   title: '#',
    //   dataIndex: 'action_id',
    // },
    {
      title: 'name',
      dataIndex: 'tick',
      render: (tick: any, item: any) => <div className={styles.tokenName}>
        <Image
          height={32}
          width={32}
          src={item.icon_url}
          alt="" />{
          item.tick + "/ USDT"}</div>,
    },
    {
      title: 'last price',
      dataIndex: 'last_price',
      render: (last_price: any) => <div>
        {last_price + " sats"}</div>,
    },
    {
      title: '24 %',
      dataIndex: 'increase_24h',
      render: (increase_24h: any) => <div>
        {increase_24h}</div>,
    },
    {
      title: 'market_cap',
      dataIndex: 'market_cap',
      render: (market_cap: any) => <div>
        {(market_cap * btcPrice.usd * 0.00000001).toFixed(3)}</div>,
    },
    {
      title: 'volume 24h',
      dataIndex: 'volume_24h',
      render: (volume_24h: any) => <div>
        {(volume_24h * btcPrice.usd * 0.00000001).toFixed(3)}</div>,
    },


  ];

  const onChange = (pagination, filters, sorter, extra) => {
    getTokenFun(pagination.current, pagination.pageSize);

  };

  return (
    <>
      <div >

        <div className={styles.top}>
          <div className="max-w-7xl mx-auto">

            <div className={styles.banner}>
              <div className={styles.bannerLeft}>
                <h1 className={styles.title}>Explore <text style={{ color: '#0052d9' }}>Desats</text>: Unlock the Next Crypto Treasure Trove</h1>
                {/* <div className={styles.buttons}>
                  <button className="desatButton">Marketplace</button>
                  <button className="desatWhiteButton">Marketplace</button>
                </div> */}
              </div>

              <div className={styles.topImage}>
                <Image
                  fill
                  objectFit="contain"
                  src="/images/homepage.png"
                  alt="homepage" />
              </div>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className={styles.card}>
                <p className="text-3xl font-semibold">{"$ " + (total.turnover_24h * btcPrice.usd * 0.00000001).toFixed(3)}</p>
                <p className={styles.cardSubTilte}>Total 24-hour turnover of the platform</p>
              </div>
              <div className={styles.card}>
                <p className="text-3xl font-semibold">{"$ " + total.turnover_all * btcPrice.usd * 0.00000001}</p>
                <p className={styles.cardSubTilte}>Total historical turnover of the platform</p>
              </div>
              <div className={styles.card}>
                <p className="text-3xl font-semibold">{total.support_token_count}</p>
                <p className={styles.cardSubTilte}>Number of tokens supported</p>
              </div>
              <div className={styles.card}>
                <p className="text-3xl font-semibold">{total.total_success_tx_count}</p>
                <p className={styles.cardSubTilte}>Total number of successful transactions</p>
              </div>
            </section>
          </div>
        </div>

        <div className={styles.tokenList}>

          <main className="max-w-7xl mx-auto">
            <div className={styles.title}>ARC20 List</div>

            <Space style={{ marginBottom: 48, marginTop: 48 }}>
              <Button onClick={() => {
                sort = 0
                setPagination({
                  current: 1,
                  pageSize: 10,
                  total: 0
                })
                getTokenFun(1, pagination.pageSize);

              }}>Earnings Yield</Button>
              <Button onClick={() => {
                sort = 1
                setPagination({
                  current: 1,
                  pageSize: 10,
                  total: 0
                })
                getTokenFun(1, pagination.pageSize);

              }}>24-hour Turnover</Button>
              <Button onClick={() => {
                sort = 2
                setPagination({
                  current: 1,
                  pageSize: 10,
                  total: 0
                })
                getTokenFun(1, pagination.pageSize);

              }}>Recently Released Tokens</Button>
            </Space>
            {<Table
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    jumpTokenTrade(record)
                  }
                }
              }
              }
              columns={columns}
              loading={loading}
              pagination={pagination}
              dataSource={tokens} onChange={onChange} />}

          </main>
        </div>

      </div>
    </>
  )
}
