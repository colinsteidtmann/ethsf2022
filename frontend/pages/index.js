import { NFT_ABI, NFT_ADDRESS } from "../lib/contract.js";
import { useContract, useProvider, useSigner } from 'wagmi';
import MintNFTForm from '../components/MintNFTForm.js';
import DisplayNFTs from '../components/DisplayNFTS.js';
import Header from "../components/Header.js";


export default function Home() {
  // Provider
  const provider = useProvider();
  // Signer
  const { data: signer, isError, isLoading } = useSigner();
  // Contract 
  const contract = useContract({
    address: NFT_ADDRESS,
    abi: NFT_ABI,
    signerOrProvider: signer || provider
  });

  // Test function for experimenting
  async function info() {
    const symbol = await contract.symbol();
    const nfts = await contract.fetchNfts();
  }
  info();

  console.log(contract);
  if (contract) {
    return (
      <div className="p-8">
        <Header />
        <div className="">
          <h3 class="text-6xl leading-tight mb-4 pb-4 text-center">VickVick.</h3>
          <MintNFTForm contract={contract} />
          <br></br>
          <h2 className="font-small leading-tight text-2xl col-span-2 text-center">See current auctions</h2>
          <DisplayNFTs contract={contract} />

          <h4 class="my-5 font-medium leading-tight text-xl text-center">Contract Address - <a className="underline text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4" target="_blank" rel="noreferrer" href={`https://testnet.snowtrace.io/address/${NFT_ADDRESS}`}>{NFT_ADDRESS}</a></h4>
          <a className="text-center" target="_blank" rel="noreferrer" href="https://github.com/colinsteidtmann/calhacks/tree/main/contracts"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" className="w-10 h-10" /></a>
        </div>
      </div>

    );
  } else {
    return (<div>Loading ...</div>);
  }
}