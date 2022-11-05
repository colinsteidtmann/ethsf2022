import { useContract, useProvider, useSigner } from 'wagmi';
import { NFT_ABI, NFT_ADDRESS } from "../../lib/contract.js";
import { useRouter } from 'next/router';

export default function Auction() {
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

    const router = useRouter();
    const { tokenID } = router.query;

    return (
        <>
            <p>my token id is {tokenID}</p>
        </>
    );
}