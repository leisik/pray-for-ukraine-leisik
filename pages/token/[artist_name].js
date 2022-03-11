import Head from 'next/head'
import Link from "next/link";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { onSnapshot, collection, getDoc, doc } from "firebase/firestore";
import db from "../../src/firebase";
import storage from 'local-storage-fallback';

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

export default function Details() {
    const router = useRouter();
    const [token, setToken] = useState([{ name: "Loading...", id: "initial" }]);
    const [loading, setLoading] = useState(true);
    const [bsv, setBSV] = useState();
    const [tokenId, setTokenId] = useState(storage.getItem('currentId'));

    useEffect(() => {
      const fetchData = async () => {
          const result = await CoinGeckoClient.coins.markets({
              vs_currency: "usd",
              ids: "bitcoin-cash-sv",
              order: "market_cap_desc",
              per_page: "100",
              page: "1",
              price_change_percentage: "24h",
          });
          setBSV(parseFloat(result.data['0'].current_price));
      };
      fetchData();
      const timerId = setInterval(fetchData, 5000);
      return () => clearInterval(timerId);
    },[]);

    useEffect(() => {
        onSnapshot(doc(db, 'artist-tokens', tokenId), (doc) => {
            setToken(doc.data());
            setLoading(false);
        })    
    },[]);
    
    return (
        <div className="min-h-screen w-full py-0 px-2 flex flex-col justify-center items-center bg-main-right font-mono">
      <Head>
        <title>Soundoshi helps Ukraine</title>
        <meta name="Non-profit project to help out our easter friends as much as we can " content="Soundoshi help Ukraine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className='w-full'>
        <Link href="/">
            <div className="hidden w-20 h-20 lg:block absolute top-4 left-4 cursor-pointer">
            <img src="/transparent_soundoshi.png" alt="Soundoshi Logo" />
            </div>
        </Link>
        <div className="block lg:hidden w-full flex justify-center items-center ">
          <img src="/new-logo.svg" alt="Soundoshi Logo" className='w-96 my-6'/>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center py-4 pb-10 px-0 mt-0 lg:mt-20 ">
          {loading ? 
            <div className='texy-3xl text-white'>Loading</div> :
            <div className='flex flex-col lg:flex-row w-full md:w-584px lg:w-1000px h-auto md:h-1028px lg:h-548px bg-main-right-light rounded-2xl p-4'>
                <div className='block lg:hidden w-full text-center text-white text-2xl mb-4'>{token.album_name} #{token.uniqueNumber}</div>
                <div className='w-full lg:w-512px h-full lg:h-512px'>
                    <img key={token.cover_image} src={token.cover_image} className='w-full h-full rounded-xl'/>
                </div>
                <div className='flex flex-col w-full lg:w-[calc(100%-512px)] py-4 lg:p-4 lg:pl-8 items-center justify-center'>
                    <div className="w-full flex">
                        <div className='hidden lg:block w-1/2 text-left text-white text-2xl mb-8'>{token.album_name} #{token.uniqueNumber}</div>
                        <div className='w-full lg:w-1/2 text-center lg:text-right text-white text-2xl mb-8'>{token.quantity} Editions</div>
                    </div>
                    <div className='h-auto lg:h-310px flex flex-col justify-center mb-8'>
                        <div key={token.cover_name} className='text-xl lg:text-2xl text-white text-center mb-4'>{token.artist_name} - {token.album_name}</div>
                        <div className='flex justify-center items-center text-md text-white text-justify'>Integer sagittis mi at tincidunt volutpat. Integer volutpat egestas congue. Curabitur sagittis efficitur urna sed facilisis. Donec posuere turpis vitae purus rhoncus finibus quis nec tortor. </div>
                    </div><div className='my-auto'></div>
                    <div className='w-64 flex justify-center'>
                        <div className='w-32 bg-main-right-dark rounded-xl text-2xl text-white text-center py-2 px-4 mr-4'>$ {token.price}</div>
                        <div className='flex justify-center w-32 bg-main-right-dark rounded-xl py-2 px-4'>
                            <img className="w-8 h-8 p-1 mr-2" src="https://firebasestorage.googleapis.com/v0/b/blockdojo-soundoshi.appspot.com/o/pray-for-ukraine%2Fbsv-logo.png?alt=media&token=8e859426-c3ff-4076-ac57-5883c710914e" />
                            <div className='w-32 text-2xl text-white'>{(token.price/bsv).toFixed(3)}</div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center border border-white text-white w-40 h-12 text-2xl rounded-2xl mt-8 lg:mt-4 cursor-pointer transition ease-in-out hover:bg-ukraine-yellow duration-150 hover:text-ukraine-blue hover:border-ukraine-blue hover:font-bold'>Buy</div>
                </div>
            </div>
          }
      </main>

      <footer className='text-center flex justify-center items-center text-white mb-4'>
        <div className=''>All right reserved. Designed & developed by Soundoshi Ltd</div>
      </footer>

    </div>
    )
}