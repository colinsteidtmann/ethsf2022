import { useContract, useProvider, useSigner, useContractReads } from 'wagmi';
import { AUCTION_ABI, AUCTION_ADDRESS } from "../../lib/contract.js";
import BidForm from '../../components/BidForm.js';
import Header from '../../components/Header.js';
import { useState } from 'react';
import StartAuction from '../../components/StartAuction.js';

export default function Auction() {
    const [auctionData, setAuctionData] = useState({});
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
            setStateData(data);
        }
    });
    const setStateData = (data) => {
        console.log(data);
        let [started] = data;
        setAuctionData({ "started": started });
    };
    // async function info() {
    //     console.log("auctionContract", contract);
    // }
    // info();
    if (!auctionData.started && contract) {
        return <StartAuction contract={contract} />;
    }
    else if (auctionData.started) {
        return (
            <>
                <div className="p-8">
                    <Header />
                    <BidForm contract={contract}></BidForm>
                </div>
            </>
        );
    } else {
        return (<div>Loading ...</div>);
    }


}