import { HDNodeWallet, Mnemonic,Wallet } from "ethers";
import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { EyeOffIcon,EyeIcon } from "lucide-react";
import { Sedgwick_Ave_Display } from "next/font/google";
const ETHWALLET = ({mnemonic}:{mnemonic:string[]})=>{

    const [wall,setWallet]= useState<Array<{name:string,publickey:string,privateKey:string}>>([]);
    const [currentIndex,setCurrentIndex]= useState(0)
    const [showPrivateKey, setShowPrivateKey] = useState<{ [key: string]: boolean }>({})


    const handleETH = async()=>{
        const mnmemociPhrase =  mnemonic.join(' ')
        const seed= await mnemonicToSeed(mnmemociPhrase)
        const derivedPath = `m/44'/60'/${currentIndex}'/0'`
        const hdnode= HDNodeWallet.fromSeed(seed)
        const child= hdnode.derivePath(derivedPath)
        const privateKey= child.privateKey
        const wallet = new Wallet(privateKey)


        const new_wallet= {
            name:`Wallet${currentIndex}`,
            publickey:wallet.address.toString(),
            privateKey:privateKey.toString()

        }

        setCurrentIndex(currentIndex+1)
        setWallet([...wall,new_wallet])

    }


    const togglePrivateKey = (walletName:string) => {
        setShowPrivateKey(prev => ({ ...prev, [walletName]: !prev[walletName] }))
      }


    return (
        <div className="mt-4">
             <button onClick={handleETH} className="w-full p-2 bg-green-500 text-white rounded">Generate Ether Wallets</button>

            {
                wall.length>0 && (
                    <div className="space-y-4">
                        <h3 className="font-semibold ">Generated Wallet:</h3>
                        {
                            wall.map((wallet,index)=>(
                                <div key={index} className="p-4 border shadow-sm">
                                    <h4 className="font-semibold">{wallet.name}</h4>
                                    <p className="text-sm"><span className="font-medium">Public Key:</span>{wallet.publickey}</p>
                                    <div className="flex items-center space-x-2 w-full">
                                        <p className="text-sm"><span className="font-medium">Private Key:</span></p>
                                        <input

                                        type={showPrivateKey[wallet.name] ? 'text':'password'}
                                        value={wallet.privateKey}
                                        readOnly
                                        className="felx-grow border rounded p-1"
                                        />

                                        <button
                                        className="p-2 border rounded bg-gray-200"
                                        onClick={()=>{togglePrivateKey(wallet.name)}}
                
                                        >
                                            {showPrivateKey[wallet.name] ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                            
                                        </button>


                                    </div>
                                </div>
                            ))
                        }

                    </div>
                )
            }

           
        </div>
    )
}


export default ETHWALLET