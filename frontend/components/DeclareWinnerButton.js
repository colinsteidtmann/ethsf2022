import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { BigNumber } from "ethers";


export default function DeclareWinnerButton({ contract }) {

    let highestBidder;
    let highestBid = -1;

    async function onDecrypt() {
        // get values from contract
        let bidders = contract.bidders;
        let bids = contract.bids;
        let decryptedAmount;
        for (let i = 0; i < bidders.length; i++) {
            const { encryptedAmount, encryptedSymmetricKey } = encryptedbids[bidders[i]];
            decryptedAmount = await lit.decryptText(encryptedAmount, encryptedSymmetricKey);
            if (decryptedAmount > highestBid) {
                highestBid = decryptedAmount;
                highestBidder = bidders[i]
            }
            // set contract.highestBid = highestBid and contract.highestBidder = highestBidder
        }
        // try {

        // } catch (error) {
        //     if (error.errorCode === "incorrect_access_control_conditions") {
        //         decryptedDescription = noAuthError;
        //     } else {
        //         decryptedDescription = otherError;
        //     }
        // }
        // setDescription(decryptedDescription);
    };

    return (
        <div>
            <button type="button" onClick={onDecrypt} className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Announce Winner!</button>
        </div>

    );
}