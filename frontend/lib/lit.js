import LitJsSdk from "@lit-protocol/sdk-browser";
import { AUCTION_ABI, AUCTION_ADDRESS } from "./contract";
const client = new LitJsSdk.LitNodeClient();

// Checks if the auction has ended
const chain = "mumbai";
const evmContractConditions = [
    {
        contractAddress: AUCTION_ADDRESS,
        functionName: "endAt",
        functionParams: [],
        functionAbi: AUCTION_ABI,
        chain,
        returnValueTest: {
            key: "",
            comparator: "<=",
            value: Math.floor(new Date().getTime() / 1000)
        },
    },
];

// Lit Protocol Client
class Lit {
    litNodeClient;

    // Connect to lit network
    async connect() {
        await client.connect();
        this.litNodeClient = client;
    }

    // Encrypt string. Returns symmetric key and encryptedString.
    async encryptText(text) {
        if (!this.litNodeClient) {
            await this.connect();
        }

        // Prove web3 user owns their crypto address
        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });

        // const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(text);

        // const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
        //     evmContractConditions,
        //     symmetricKey,
        //     authSig,
        //     chain,
        // });

        // // Convert blob to base64 to pass as a string to Solidity
        // const blobToBase64 = (blob) => {
        //     const reader = new FileReader();
        //     reader.readAsDataURL(blob);
        //     return new Promise(resolve => {
        //         reader.onloadend = () => {
        //             resolve(reader.result);
        //         };
        //     });
        // };

        // return {
        //     encryptedString: await blobToBase64(encryptedString),
        //     encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
        // };
        return { encryptedString: "3", encryptedSymmetricKey: "ads" };
    }

    // Decrypt encrypted string. Returns decrypted string
    async decryptText(encryptedDescription, encryptedSymmetricKey) {
        if (!this.litNodeClient) {
            await this.connect();
        }

        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });

        const symmetricKey = await this.litNodeClient.getEncryptionKey({
            evmContractConditions,
            toDecrypt: encryptedSymmetricKey,
            chain,
            authSig
        });



        // Convert base64 to blob to pass in the litSDK decrypt function
        const encryptedDescriptionBlob = await (await fetch(encryptedDescription)).blob();
        console.log(encryptedDescriptionBlob);

        const decryptedDescription = await LitJsSdk.decryptString(
            encryptedDescriptionBlob,
            symmetricKey
        );
        return decryptedDescription;
    }
}

export default new Lit();