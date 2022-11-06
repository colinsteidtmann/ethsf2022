import { useContractReads } from 'wagmi';
import { AUCTION_ABI, AUCTION_ADDRESS } from "../../lib/contract.js";
import BidForm from '../../components/CreateBid.js';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import NFT from "../../components/NFT";

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
        <div className="p-8">
            <div className="flex flex-row-reverse mb-5">
            <ConnectButton />
            </div>
            <BidForm data={auctionContract}></BidForm>

        </div>
        </>
    );

}