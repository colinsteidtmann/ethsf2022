import DisplayNFTs from '../components/DisplayNFTS.js';
import { useContract, useProvider, useSigner } from 'wagmi';
import { NFT_ABI, NFT_ADDRESS } from "../lib/contract.js";


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

    if (true) {
        return (<DisplayNFTs contract={contract} />);
    }
}