import { useEffect, useState } from "react";


// Form to Mint NFT w/encrypted description
export default function BidForm({ contract }) {

    const [form, setForm] = useState({
        bidAmount: ""
    });

    // Form Submit Handler
    async function onBid() {
        const { bidAmount } = form;
        console.log("amount" + bidAmount);
        const { encryptedBid, encryptedSymmetricKey } = await lit.encryptText(bidAmount);
        await contract.bid(encryptedBid, encryptedSymmetricKey);
        setForm({bidAmount});
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                    <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Bid</h5>
                    <br></br>
                    {inputs.map(({ label, input }) =>
                        <div key={label} class="form-group mb-3">
                            <label key={label} className="form-label inline-block mb-2 text-gray-700">{label}</label>
                            <input
                                type="text"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                                placeholder=""
                                value={form[input]}
                                onChange={e => {
                                    setForm({
                                        ...form,
                                        [input]: e.target.value
                                    });
                                }}
                            />
                        </div>

                    )}

                    <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={onMint}>Mint</button>
                </div>
            </div>

        </>
    );
}