import { useState } from "react";
import Header from "./Header";
export default function StartAuction({ nftContract, contract }) {
    const [durationMins, setDuration] = useState(0);
    async function onStart() {
        let durationSecs = durationMins * 60;
        await nftContract.approve(contract.address, "1");
        await contract.start(durationSecs);
    }

    return (
        <div>
            <Header />
            <label>num minutes:</label>
            <input type="text" onChange={e => { setDuration(e.target.value); }} />
            <button onClick={onStart}>Start Auction</button>
        </div>
    );
}