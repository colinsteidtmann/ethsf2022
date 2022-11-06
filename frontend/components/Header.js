import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
    return (
        <div className="flex flex-row-reverse mb-5">
            <ConnectButton />
        </div>
    );
}