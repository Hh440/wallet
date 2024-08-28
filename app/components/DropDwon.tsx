
import { useState } from "react";
import SOLWALLET from "../solwallet/page";
import ETHWALLET from "../ethwallet/page";

const DropDown = ({mnemonic}:{mnemonic:string[]})=>{

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const handleWalletSelect = (walletType: string) => {
      if (walletType === "SOL") {
        console.log("SOL Wallet selected");
        setSelectedWallet("SOL");
      } else if (walletType === "ETH") {
        console.log("ETH Wallet selected");
        setSelectedWallet("ETH");
      }
      setIsDropdownOpen(false); // Close the dropdown after selecting a wallet
    };
    
    return (
        <div className="w-full inline-block ">
        <div
          className="flex items-center gap-2 cursor-pointer border border-gray-300 rounded px-4 py-2"
          onClick={toggleDropdown}
        >
          <WalletIcon className="h-4 w-4" />
          <span>Select Wallet</span>
          <ChevronDownIcon className="h-4 w-4" />
        </div>
        {isDropdownOpen && (
          <div className="absolute  w-[200px] bg-white border border-gray-300 rounded shadow-lg ">
            <div
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleWalletSelect("SOL")}
            >
              <div className="flex items-center gap-2">
                <CloudSunIcon className="h-5 w-5" />
                <span>SOL Wallet</span>
              </div>
            </div>
            <div className="my-1 h-px bg-gray-200"></div>
            <div
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleWalletSelect("ETH")}
            >
              <div className="flex items-center gap-2">
                <EclipseIcon className="h-5 w-5" />
                <span>ETH Wallet</span>
              </div>
            </div>
          </div>
        )}
        {selectedWallet === "SOL" && <SOLWALLET mnemonic={mnemonic} />}
        {selectedWallet === "ETH" && <ETHWALLET mnemonic={mnemonic} />}
      </div>
    )
}


function ChevronDownIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    )
  }
  
  function CloudSunIcon(props :any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="M20 12h2" />
        <path d="m19.07 4.93-1.41 1.41" />
        <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
        <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
      </svg>
    )
  }
  
  function EclipseIcon(props :any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a7 7 0 1 0 10 10" />
      </svg>
    )
  }
  
  function WalletIcon(props :any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
      </svg>
    )
  }
export default DropDown;