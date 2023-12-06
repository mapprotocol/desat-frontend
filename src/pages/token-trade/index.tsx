
import { getOrders } from '@/api'
import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
} from 'next'
import { useEffect, useState } from 'react'
type Props = {
    imageArray: number[]
}

export default function GetMap(

) {
    const [orders,setOrders] = useState([])
    useEffect(() => {
        getOrders({
            tick: 'test'
        }).then(res => {

        })
        // getAccount()
    }, [])

    return (
        <div className="bg-gray-800 text-white min-h-screen">
            <div className="container mx-auto py-4">
                {/* Header and navigation will go here */}
                <div className="mb-4">
                    {/* Content and cards will go here */}
                    <div className="bg-gray-900 p-4 rounded-lg">
                        <div className="grid grid-cols-4 gap-4">
                            {orders.map((item, index) => (
                                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-medium">sats</span>
                                        <button className="text-xs text-blue-500">Transfer</button>
                                    </div>
                                    <div className="text-2xl font-semibold">{item.amount}</div>
                                    <div className="text-xs font-medium text-gray-400">{item.price}</div>
                                    <div className="text-xs font-medium">{item.usdPrice}</div>
                                    <div className="text-xs font-medium">{item.hash}</div>
                                    <div className="text-xs font-medium">{item.btcValue}</div>
                                    <div className="flex justify-between items-center mt-2">
                                        <button className="bg-blue-500 text-xs text-white py-1 px-2 rounded">Buy</button>
                                        <button className="text-xs text-blue-500">Abolish</button>
                                        <button className="text-xs text-blue-500">Revise</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Pagination will go here */}
                        <div className="flex justify-center items-center mt-4">
                            <button className="text-xs text-white bg-gray-700 hover:bg-gray-600 py-1 px-2 rounded-l">
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            {[1, 2, 3, 4, 5].map((number) => (
                                <button key={number} className={`text-xs text-white bg-gray-700 hover:bg-gray-600 py-1 px-2 ${number === 1 ? 'rounded-none' : ''}`}>
                                    {number}
                                </button>
                            ))}
                            <button className="text-xs text-white bg-gray-700 hover:bg-gray-600 py-1 px-2 rounded-r">
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
