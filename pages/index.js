import Head from 'next/head'
import Artists from '../components/artists'

export default function Home() {
  return (
    <div className="min-h-screen w-full py-0 px-2 flex flex-col justify-center items-center bg-main-right font-mono">
      <Head>
        <title>Soundoshi helps Ukraine</title>
        <meta name="Non-profit project to help out our easter friends as much as we can " content="Soundoshi help Ukraine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className='w-full'>
        <div className="hidden w-20 h-20 sm:block absolute top-4 left-4 ">
          <img src="/transparent_soundoshi.png" alt="Soundoshi Logo" />
        </div>
        <div className="block sm:hidden w-full flex justify-center items-center ">
          <img src="/new-logo.svg" alt="Soundoshi Logo" className='w-96 my-6'/>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center py-4 pb-10 px-0 mt-0 sm:mt-20 ">
        <div className="text-3xl font-bold text-white text-center">
          We are here to help Ukraine!
        </div>

        <div className="flex w-full h-full flex-col items-center mt-4 mb-8 sm:mb-12">
          {/* <div className="w-9/12 sm:w-640px h-72 sm:h-425px bg-ukraine-flag bg-cover bg-center rounded-xl mb-4" /> */}
          <img className="w-11/12 sm:w-640px h-3/6 sm:h-425px bg-cover bg-center rounded-xl mb-4" src="https://firebasestorage.googleapis.com/v0/b/blockdojo-soundoshi.appspot.com/o/pray-for-ukraine%2Fukraine-flag-png-large.jpg?alt=media&token=40b97648-4c22-40e6-9d77-4146ce9cb779"></img>
          <div className='flex justify-center items-center text-white text-xl sm:text-2xl mb-2 sm:mb-4'>
            <div className='mr-4'>2511.44 USD</div>
            <div className='text-sm'>●</div>
            <div className='ml-4'>632 members</div>
          </div>
          <div className='flex justify-center items-center border border-white text-white w-40 h-12 text-2xl rounded-2xl mt-6 sm:mt-0 mt-4 cursor-pointer hover:opacity-60'>Donate</div>
        </div>
        
        <div className='text-2xl sm: text-3xl text-white'>They are helping with us</div>
        <div className='w-full'><Artists /></div>
      </main>

      <footer className='text-center flex justify-center items-center text-white mb-4'>
        <div className=''>All right reserved. Designed & developed by Soundoshi Ltd</div>
      </footer>

    </div>
  )
}
