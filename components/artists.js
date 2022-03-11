import Link from "next/link";
// import { artistsList } from "./artistsList"
import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../src/firebase";
import storage from 'local-storage-fallback';

export default function Artists() {
  const [toks, setToks] = useState([{ name: "Loading...", id: "initial" }]);
  useEffect(
    () =>
      onSnapshot(collection(db, "artist-tokens"), (snapshot) =>
        setToks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
    return(
        <div className="flex flex-col items-center justify-center">
            {toks.map(art =>
                <Link href={'/token/' + art.id}>
                    <div onClick={()=> {storage.setItem("currentId", art.id)}} className='flex w-11/12 sm:w-full p-4 my-3 bg-main-right-light rounded-2xl cursor-pointer'>
                        <div className='w-125px h-125px sm:w-200px sm:h-200px overflow-hidden cursor-pointer'>
                            <div className='rounded-xl hover:scale-110 transition ease-out duration-500'>
                                <img src={art.cover_image} className='w-full h-full rounded-xl'/>
                            </div>
                        </div>
                        <div className='flex flex-col w-[calc(100%-125px)] sm:w-[calc(100%-200px)] items-center justify-center'>
                            <div className='hidden sm:block text-2xl text-white break-all'>{art.artist_name} - {art.album_name}</div>
                            <div className="flex flex-col sm:hidden w-full text-lg text-white">
                                <div className="text-center">{art.album_name}</div>
                                <div className="text-center text-gray-300">{art.artist_name}</div>
                            </div>
                            <div className='flex justify-center items-center border border-white text-white w-32 sm:w-40 h-10 sm:h-12 text-xl sm:text-2xl rounded-2xl mt-4 cursor-pointer transition ease-in-out hover:bg-ukraine-yellow duration-150 hover:text-ukraine-blue hover:border-ukraine-blue hover:font-bold'>Buy</div>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
}