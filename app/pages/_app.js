import "../styles/globals.css";
import {
  useWallet,
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

function MyApp({ Component, pageProps }) {
  const wallets = [
    /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
    new PhantomWalletAdapter(),
  ];
  return(
  <ConnectionProvider endpoint="https://api.devnet.solana.com">
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <Component {...pageProps} />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
  )
}

export default MyApp;
