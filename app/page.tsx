'use client'
import { generateMnemonic } from 'bip39';
import { useState } from 'react';
import nodePolyfulls from 'vite-plugin-node-polyfills'
import SOLWALLET from './solwallet/page';
import DropDown from './components/DropDwon';

export default function Home() {

  const [mnemonic,setMnemonic]= useState<string[]>([]);
  const [wallet,setWallet]=useState([])

  const [currentIndex,setCurrentIndex]= useState(0)

  const handleMnemonic=()=>{
    const mnemonicPhrase = generateMnemonic();
    
    const mnemonicWords = mnemonicPhrase.split(' ');
    setMnemonic(mnemonicWords);
  }







  return (
    <div className="w-full max-w-3xl mx-auto border p-4 rounded-lg ">
    <div className="border-b pb-4 mb-4">
      <h2 className="text-2xl font-bold">Blockchain Wallet Generator</h2>
    </div>
    <div className="space-y-6">
      <div className="space-y-4">
        <button onClick={handleMnemonic} className="w-full bg-blue-500 text-white py-2 px-4 rounded">
          Generate Mnemonic
        </button>
        {mnemonic.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Mnemonic:</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {mnemonic.map((word, index) => (
                <div 
                  key={index} 
                  className="p-2 border border-gray-300 rounded bg-white shadow-sm text-center "
                >
                  <span className="text-sm font-medium">{word}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {
        mnemonic && 
        <DropDown mnemonic={mnemonic}/>
      }



     </div>
   </div>
  );
}
