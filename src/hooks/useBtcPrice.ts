import axios from "axios"
import { useState, useEffect } from "react"




type price = {
  usd: number,
}

export const useBtcPrice = (): price => {
  const [bitcoinPrice, setBitcoinPrice] = useState<price>(
    {
      usd: 0,
    }
  )
  useEffect(() => {
    ; (async () => {
      try {
        const data = await axios.get<{ bitcoin: price }>(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        )

        const {
          bitcoin: { usd },
        } = data.data
        if (!usd)
          setBitcoinPrice({
            usd: 42000,
          })
        else
          setBitcoinPrice({
            usd: usd,
          })
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])
  return bitcoinPrice
}
