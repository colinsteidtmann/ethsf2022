import { useContract, useProvider, useSigner } from 'wagmi';
import { AUCTION_ABI, AUCTION_ADDRESS } from "../../lib/contract.js";
import { useRouter } from 'next/router';
import BidForm from '../../components/CreateBid.js';

export default function Auction() {
    // Provider
    const provider = useProvider();
    // Signer
    const { data: signer, isError, isLoading } = useSigner();
    // Contract 
    const auction = useContract({
        address: AUCTION_ADDRESS,
        abi: AUCTION_ABI,
        signerOrProvider: signer || provider
    });

    const router = useRouter();
    const { tokenID } = router.query;

    async function info() {
        const started = await auction.started();
        console.log(started);
      }
    
    info();

    const nft_data = auction.nft()
    const readResult = useContractRead({
        address: auction?.address,
        abi: AUCTION_ABI,
        functionName: 'fetchNfts',
        onSuccess: (fetchedNfts) => {
            getDisplayNfts(fetchedNfts);
        }
    });

    if (auction) {
        return (<p>Hello</p>);
    }
    // if (false) {
    //     return (<BidForm></BidForm>);
    // }
}