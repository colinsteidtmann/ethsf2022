import { useContract, useProvider, useSigner, useContractReads } from 'wagmi';
import { AUCTION_ABI, AUCTION_ADDRESS } from "../../lib/contract.js";
import BidForm from '../../components/CreateBid.js';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import NFT from "../../components/NFT";

export default function Auction() {
    const [started, setStarted] = useState(false);
    const provider = useProvider();
    const { data: signer } = useSigner();
    // Contract 
    const auctionContract = {
        address: AUCTION_ADDRESS,
        abi: AUCTION_ABI,
        signerOrProvider: signer || provider
    };
    const contract = useContract({
        ...auctionContract
    });
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