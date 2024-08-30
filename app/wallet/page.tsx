'use client'
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useSearchParams,useRouter } from 'next/navigation';
import { useState,useEffect } from 'react';
import { ArrowDownIcon, ArrowUpIcon, Code, CopyIcon, RefreshCwIcon } from "lucide-react"
import bs58 from 'bs58'



const wallet =()=>{
    const searchParams = useSearchParams();
    const privateKey = searchParams.get('privateKey');
    const router = useRouter()
   
    const [balance, setBalance] = useState<number | null>(null);
    const [publicKey, setPublicKey] = useState<string | null>(null);

    


  
    if (!privateKey ) {
      return <div>Error: Private key is missing or invalid.</div>;
    }



    const privateKeyUint8Array = bs58.decode(privateKey);
   

    useEffect(() => {
        const getWalletBalance = async () => {
          try {
            const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
            console.log("Connection object is", connection);
    
            const myWallet = Keypair.fromSecretKey(privateKeyUint8Array);
            
    
            const walletBalance = await connection.getBalance(
              new PublicKey(myWallet.publicKey)
            );
    
            
            setBalance(walletBalance / LAMPORTS_PER_SOL);
            setPublicKey(myWallet.publicKey.toBase58())
          } catch (error) {
            console.error('Failed to get wallet balance:', error);
          
          }
        };
    
        getWalletBalance();
      }, [privateKeyUint8Array]);
    

      const handleRefresh = ()=>{

      }

      const handlesend = ()=>{

        sessionStorage.setItem('privateKey', privateKey);

        router.push('/send')



      }
      const handleRecieve = ()=>{

      }


  
    

  
    return (
      <div className='flex items-center justify-center min-h-screen p-4'>
       <div className='w-full max-w-md'>
        <div className='w-full bg-white shadow rounded-lg'>
            <div className='p-4 border-b'>
                <h2 className='text-2xl font-bold text-center'>Solana Wallet</h2>
                <p className='text-center text-sm text-muted-foreground'>View and manage your SOL balance</p>
            </div>
            <div className='p-4'>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className='text-sm font-medium text-muted-foreground'>Current Balance</p>
                        <h2 className='text-3xl font-bold'>{balance} SOL</h2>
                    </div>
                    <div className='flex items-center'>
                        <div className='border p-2 rounded cursor-pointer'
                        onClick={handleRefresh}
                        >
                            <RefreshCwIcon className='h-4 w-4'/>
                            <span className='sr-only'>Refresh balance</span>                            
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-4 flex justify-center border-1'>
                <div className='flex-1 mr-2 bg-blue-500 text-white p-2 rounded cursor-pointer flex items-center justify-center'
                onClick={handlesend}
                >
                    <ArrowUpIcon className='mr-2 h-4 w-4'/>
                    Send
                </div>
                <div className='flex-1 ml-2 bg-blue-500 text-white p-2 rounded cursoe-pointer flex items-center justify-center'
                onClick={handleRecieve}
                >
                    <ArrowDownIcon className='mr-2 h-4 w-4'/>
                    Receive
                </div>
            </div>
        </div>

        <div className='mt-4 text-center'>
            <p className='text-sm text-muted-foreground'>Wallet Address</p>
            <div className='flex items-center justify-center mt-1'>
             <code className='bg-muted px-2 py-1 rounded text-sm'>{publicKey}</code>
                <div 
                className='ml-2 cursor-pointer'
                onClick={()=>{
                    console.log('Copy wallet addresss')
                }}
                >
                    <CopyIcon className='h-4 w-4'/>
                    <span className='sr-only'>Copy wallet address</span>

                </div>

            </div>

        </div>

       </div>
      </div>
    );
}

export  default wallet;