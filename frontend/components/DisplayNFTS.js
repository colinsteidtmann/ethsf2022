import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { NFT_ABI } from "../lib/contract";
import NFT from "./NFT";

// Displays Grid of NFTs
export default function DisplayNFTs({ contract }) {
    const [nfts, setNFTs] = useState([]);
    const readResult = useContractRead({
        address: contract?.address,
        abi: NFT_ABI,
        functionName: 'fetchNfts',
        onSuccess: (fetchedNfts) => {
            getDisplayNfts(fetchedNfts);
        }
    });

    const getDisplayNfts = (fetchedNfts) => {
        const _nfts = [];
        let nft = {};
        for (let idx = fetchedNfts.length - 1; idx > -1; idx--) {
            const { name, imageUrl, description } = fetchedNfts[idx];
            nft = { name, imageUrl, description };
            _nfts.push(nft);
        }

        setNFTs(_nfts);
    };

    if (readResult.error) {
        return (
            <div>{error}</div>
        );
    } else if (readResult.isFetching || readResult.isLoading) {
        return <div>Loading ...</div>;
    }
    return (

        <div className="my-5 grid grid-cols-2 auto-rows-auto gap-10 justify-items-center">
            <h2 className="font-medium leading-tight text-3xl col-span-2 text-center">Gallery</h2>
            {nfts.map((nft, index) => <NFT key={index} data={nft} />)}
        </div>
    );
}