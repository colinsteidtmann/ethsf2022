import { useContractReads } from 'wagmi';
import { AUCTION_ABI, AUCTION_ADDRESS } from "../../lib/contract.js";
import BidForm from '../../components/CreateBid.js';
import { useState } from 'react';

export default function Auction() {
    const [started, setStarted] = useState(false);
    // Contract 
    const auctionContract = {
        address: AUCTION_ADDRESS,
        abi: AUCTION_ABI,
    };
    const readResult = useContractReads({
        contracts: [
            {
                ...auctionContract,
                functionName: 'started',
            }
        ],
        onSuccess: (data) => {
            showData(data);
        }
    });

    const showData = (data) => {
        console.log(data);
    };

    return (
        <>
            <p>Hello</p>
        </>
    );

}