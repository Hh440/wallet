'use client'
import { mnemonicToSeed } from "bip39"
import { useState } from "react"
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair, PublicKey } from "@solana/web3.js";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import bs58 from "bs58"


const SOLWALLET=({mnemonic}:{mnemonic:string[]})=>{

    const[currentIndex,setCuurrentIndex]=useState(0)
    const[wallet ,setWallet]= useState<Array<{name:string,publickey:string,privateKey:string}>>([])
    const [showPrivateKey, setShowPrivateKey] = useState<{ [key: string]: boolean }>({})
    const router = useRouter()

    const handleSOL = ()=>{

        const mnemonicPhrase = mnemonic.join(' ')

        const seed =  mnemonicToSeed(mnemonicPhrase)
        const path= `m/44'/501'/${currentIndex}'/0'`;
        const derivedseed = derivePath(path,seed.toString("hex")).key
        const secret = nacl.sign.keyPair.fromSeed(derivedseed).secretKey   

        const keyPair= Keypair.fromSecretKey(secret)
       

        const newWallet = {
            name:`wallet ${currentIndex+1}`,
            publickey:keyPair.publicKey.toString("hex"),
            privateKey:bs58.encode(keyPair.secretKey)
        }

        console.log(newWallet)

        setCuurrentIndex(currentIndex+1)
        setWallet([...wallet,newWallet])



    }

    const togglePrivateKey = (walletName:string) => {
        setShowPrivateKey(prev => ({ ...prev, [walletName]: !prev[walletName] }))
      }

      



     
      

    return (
        <div className="mt-4">
             <button onClick={handleSOL} className="w-full p-2 bg-green-500 text-white rounded">Generate Solana Wallets</button>

            {
                wallet.length>0 && (
                    <div className="space-y-4">
                        <h3 className="font-semibold ">Generated Wallet:</h3>
                        {
                            wallet.map((wallet,index)=>(

                             <Link href={{
                                pathname:'/wallet',
                                query:{
                                    privateKey:wallet.privateKey,
                                    publicKey:wallet.publickey

                                },
                             }}>
                                <div key={index} className="p-4 border shadow-sm">
                                    <h4 className="font-semibold">{wallet.name}</h4>
                                    <p className="text-sm"><span className="font-medium">Public Key:</span>{wallet.publickey}</p>
                                    <div className="flex items-center space-x-2 w-full">
                                        <p className="text-sm"><span className="font-medium">Private Key:</span></p>
                                        <input

                                        type={showPrivateKey[wallet.name] ? 'text':'password'}
                                        value={wallet.privateKey}
                                        readOnly
                                        className="flex-grow border rounded p-1"
                                        />

                                        <button
                                        className="p-2 border rounded bg-gray-200"
                                        onClick={()=>{togglePrivateKey(wallet.name)}}
                
                                        >
                                            {showPrivateKey[wallet.name] ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                            
                                        </button>


                                    </div>
                                </div>
                                </Link> 
                            ))

                           
                        }

                    </div>
                )
            }

           
        </div>
    )

}

export default SOLWALLET