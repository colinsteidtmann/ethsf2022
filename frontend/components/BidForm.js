import { useState } from "react";
import lit from "../lib/lit";

// Form to Mint NFT w/encrypted description
export default function BidForm({ contract }) {

    const [bidAmount, setbidAmount] = useState("");

    // Form Submit Handler
    async function onBid() {
        console.log("amount" + bidAmount);
        const { encryptedString, encryptedSymmetricKey } = await lit.encryptText(bidAmount);
        await contract.bid(encryptedString, encryptedSymmetricKey);
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