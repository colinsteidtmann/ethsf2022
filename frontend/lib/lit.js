import LitJsSdk from "@lit-protocol/sdk-browser";
const client = new LitJsSdk.LitNodeClient();

// Checks if the user has at least 0.1 Network Token (i.e. 0.1 Avax)
const chain = "fuji";
const accessControlConditions = [
    {
        contractAddress: "",
        standardContractType: "",
        chain,
        method: "eth_getBalance",
        parameters: [":userAddress", "latest"],
        returnValueTest: {
            comparator: ">=",
            value: "100000000000000000", // 0.1 AVAX
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

        const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(text);

        const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
            accessControlConditions,
            symmetricKey,
            authSig,
            chain,
        });

        // Convert blob to base64 to pass as a string to Solidity
        const blobToBase64 = (blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            return new Promise(resolve => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
            });
        };

        return {
            encryptedString: await blobToBase64(encryptedString),
            encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
        };
    }

    // Decrypt encrypted string. Returns decrypted string
    async decryptText(encryptedDescription, encryptedSymmetricKey) {
        if (!this.litNodeClient) {
            await this.connect();
        }

        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });

        const symmetricKey = await this.litNodeClient.getEncryptionKey({
            accessControlConditions,
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