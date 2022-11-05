import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { NFT_ABI, NFT_ADDRESS } from "../lib/contract.js";
import { useContract, useProvider, useSigner } from 'wagmi';
// import MintNFTForm from '../components/MintNFTForm.js';
// import DisplayNFTs from '../components/DisplayNFTS.js';


export default function Home() {
  // Provider
  const provider = useProvider();
  // Signer
  const { data: signer, isError, isLoading } = useSigner();
  // Contract 
  // const contract = useContract({
  //   address: NFT_ADDRESS,
  //   abi: NFT_ABI,
  //   signerOrProvider: signer || provider
  // });

  // Test function for experimenting
  async function info() {
    // const symbol = await contract.symbol();
    // const nfts = await contract.fetchNfts();
    // console.log(symbol);
    // console.log(nfts);
  }

  info();


  if (true) {
    return (
      <div className="p-8">
        <div className="flex flex-row-reverse mb-5">
          <ConnectButton />
        </div>
        <div className="">
          <h3 class="text-6xl leading-tight mb-4 pb-4 border-b text-center">Hello</h3>
        </div>
      </div>

    );
  } else {
    return (<div>Loading ...</div>);
  }
}