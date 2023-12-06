
import { getTokens, getTotalInfo } from '@/api'
import { useEffect, useState } from 'react'
import Router from 'next/router';
import styles from './index.module.css'
import Image from 'next/image'
type Props = {
  imageArray: number[]
}

export default function HomePage(

) {
  const [total, setTotal] = useState({
    support_token_count: 0,
    transaction_count: 0,
    turnover_24: "0",
    turnover_all: "0",
  })

  const [tokens, setTokens] = useState([])

  useEffect(() => {
    getTotalInfo().then(res => {
      setTotal(res.data)
    })

    getTokens({
      sort: 0,
      offset: 0,
      limit: 10
    }).then(res => {
      setTokens(res.data.list)

    })
    // getAccount()
  }, [])


  const jumpTokenTrade = (token) => {

    Router.push(`/token-trade?tick=${token.token}`)
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

  return (
    <>
      <div >

        <div className={styles.top}>
          <div className="max-w-7xl mx-auto">

            <div className={styles.banner}>
              <div className={styles.bannerLeft}>
                <h1 className={styles.title}>Explore <text style={{ color: '#0052d9' }}>Desats</text>: Unlock the Next Crypto Treasure Trove</h1>
                <div className={styles.buttons}>
                  <button className="desatButton">Marketplace</button>
                  <button className="desatWhiteButton">Marketplace</button>
                </div>
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
                <p className="text-3xl font-semibold">{total.turnover_24}</p>
                <p className={styles.cardSubTilte}>Total 24-hour turnover of the platform</p>
              </div>
              <div className={styles.card}>
                <p className="text-3xl font-semibold">{total.turnover_all}</p>
                <p className={styles.cardSubTilte}>Total historical turnover of the platform</p>
              </div>
              <div className={styles.card}>
                <p className="text-3xl font-semibold">{total.support_token_count}</p>
                <p className={styles.cardSubTilte}>Number of tokens supported</p>
              </div>
              <div className={styles.card}>
                <p className="text-3xl font-semibold">{total.transaction_count}</p>
                <p className={styles.cardSubTilte}>Total number of successful transactions</p>
              </div>
            </section>
          </div>
        </div>

        <div className={styles.tokenList}>

          <main className="max-w-7xl mx-auto">
            <section className="bg-white p-6 rounded-lg shadow mb-12">
              <h2 className="text-2xl font-bold mb-4">ARC20 List</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">#</th>
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Last Price</th>
                      <th className="text-left p-4">24h %</th>
                      <th className="text-left p-4">Market Cap</th>
                      <th className="text-left p-4">Volume (24h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Repeat for each token */}
                    {tokens.map((item, index) => (
                      <tr
                        onClick={() => { jumpTokenTrade(item) }}
                        className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`} key={index}>
                        <td className="p-4">{index + 1}</td>
                        <td className="p-4 flex items-center">
                          <i className="fas fa-coins mr-2"></i>
                          {item.token} / USDT
                        </td>
                        <td className="p-4">{item.last_price} sats</td>
                        <td className="p-4">92.1%</td>
                        <td className="p-4">{item.market_cap}s</td>
                        <td className="p-4">{item.volume_24} s</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center mt-4">
                <nav className="flex">
                  {/* Pagination */}
                  <a href="#" className="px-3 py-1 mx-1 bg-gray-200 text-gray-800 rounded">1</a>
                  <a href="#" className="px-3 py-1 mx-1 bg-gray-200 text-gray-800 rounded">2</a>
                  <a href="#" className="px-3 py-1 mx-1 bg-gray-200 text-gray-800 rounded">3</a>
                  <a href="#" className="px-3 py-1 mx-1 bg-gray-200 text-gray-800 rounded">4</a>
                  <a href="#" className="px-3 py-1 mx-1 bg-gray-200 text-gray-800 rounded">5</a>
                </nav>
              </div>
            </section>
          </main>
        </div>

      </div>
    </>
  )
}
