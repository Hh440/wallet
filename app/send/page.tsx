'use client'

import { useState,useEffect } from "react"
import { Connection, Keypair, SystemProgram, Transaction, clusterApiUrl, LAMPORTS_PER_SOL,PublicKey }  from '@solana/web3.js';
import { useRouter } from "next/navigation";
import bs58 from 'bs58'


const send = ()=>{
    const [amount, setAmount] = useState('');
  const [receiverPublicKey, setReceiverPublicKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [privateKey, setPrivateKey] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedPrivateKey = sessionStorage.getItem('privateKey');
    if (!storedPrivateKey) {
      alert("No private key found. Redirecting to wallet page.");
      router.push('/wallet');  
    } else {
      setPrivateKey(storedPrivateKey);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privateKey || !receiverPublicKey || !amount) return;

    setIsLoading(true);

    try {
      
      const privateKeyUint8Array = bs58.decode(privateKey);
      const account = Keypair.fromSecretKey(privateKeyUint8Array);

      
      const receiverPubKey = new PublicKey(receiverPublicKey);

     
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

     
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: account.publicKey,
          toPubkey: receiverPubKey,
          lamports: Number(amount) * LAMPORTS_PER_SOL, // Convert SOL to lamports
        })
      );

      
      const signature = await connection.sendTransaction(transaction, [account]);

      
      await connection.confirmTransaction(signature);

      alert(`Transaction of ${amount} SOL to ${receiverPublicKey} has been processed successfully!`);
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
      setAmount('');
      setReceiverPublicKey('');
    }
  };

  if (!privateKey) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        No transaction can take place
      </div>
    );
  }
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-card rounded-lg shadow-lg justify-center items-center ">
      <h1 className="text-2xl font-bold mb-6 text-center">Send Solana Transaction</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div >Amount (SOL)</div>
          <div>
            <input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0"
              step="0.000000001"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div >Recipient Public Key</div>
          <div>
            <input
              id="publicKey"
              type="text"
              placeholder="Enter public key"
              value={receiverPublicKey}
              onChange={(e) => setReceiverPublicKey(e.target.value)}
              required
              pattern="[1-9A-HJ-NP-Za-km-z]{32,44}"
              title="Please enter a valid Solana public key"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Transaction'}
          </button>
        </div>
      </form>
    </div>
    )
}


export default send