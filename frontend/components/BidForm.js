import { useState } from "react";
import lit from "../lib/lit";
import { utils } from "ethers";

// Form to Mint NFT w/encrypted description
export default function BidForm({ contract }) {

    const [bidAmount, setbidAmount] = useState("");

    // Form Submit Handler
    async function onBid() {
        console.log("amount" + bidAmount);
        const { encryptedString, encryptedSymmetricKey } = await lit.encryptText(bidAmount);
        const options = { value: utils.parseEther("0.001") };
        await contract.bid(encryptedString, encryptedSymmetricKey, options);
        setbidAmount("");
    }
    console.log(contract);

    return (
        <>
            <div>
                <input type="text" onChange={e => { setbidAmount(e.target.value); }} />
                <button onClick={onBid}>Place Bid</button>
            </div>
        </>
    );
}