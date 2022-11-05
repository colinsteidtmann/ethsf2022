import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import {
    chain,
    configureChains,
    createClient,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

// Avalanche chain details for wagmi client
// const avalancheChain = {
//     id: 43_113,
//     name: 'Avalanche Fuji',
//     network: 'avalanche fuji',
//     nativeCurrency: {
//         decimals: 18,
//         name: 'Avalanche',
//         symbol: 'AVAX',
//     },
//     rpcUrls: {
//         default: process.env.NEXT_PUBLIC_RPC_URL,
//     },
//     blockExplorers: {
//         default: { name: 'SnowTrace', url: 'https://testnet.snowtrace.io' },
//     },
//     testnet: true,
// };

// Providers forwards our requests to the blockchain
export const { chains, provider } = configureChains(
    [chain.polygonMumbai, chain.polygon],
    [
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_API_KEY }),
        jsonRpcProvider({
            rpc: (chain) => {
                if (chain.id !== chain.polygonMumbai) return null;
                return { http: chain.rpcUrls.default };
            },
        }),
    ]
);

// Rainbow kit wallet connector
const { connectors } = getDefaultWallets({
    appName: 'ETH SF 2022',
    chains
});

// Wagmi API client
export const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
});