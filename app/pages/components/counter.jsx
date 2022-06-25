import { useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Program, web3 } from "@project-serum/anchor";
import { AnchorProvider } from "@project-serum/anchor";
import idl from "./idl.json";

import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");

const wallets = [
  new PhantomWalletAdapter(),
];

const { SystemProgram, Keypair } = web3;

const baseAccount = Keypair.generate();
const opts = {
  preflightCommitment: "processed",
};
const programID = new PublicKey(idl.metadata.address);

function App() {
  const [value, setValue] = useState(null);
  const wallet = useWallet();

  async function getProvider() {
 
    const network = " https://api.devnet.solana.com";
    const connection = new Connection(network, opts.preflightCommitment);

    const provider = new AnchorProvider(
      connection,
      wallet,
      opts.preflightCommitment
    );
    return provider;
  }

  async function createCounter() {
    const provider = await getProvider();
    const program = new Program(
      JSON.parse(JSON.stringify(idl)),
      programID,
      provider
    );
    console.log(program);
    try {
      await program.rpc.create({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });

      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );
      console.log("account: ", account);
      setValue(account.count.toString());
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  async function increment() {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      await program.rpc.increment({
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      });

      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );

      setValue(account.count.toString());
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }
  async function decrement() {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      await program.rpc.decrement({
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      });

      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );

      setValue(account.count.toString());
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  if (!wallet.connected) {
    return (
      <div className="flex mx-10 border-gray-100  border w-xl bg-white bg-opacity-10 backdrop-blur-lg rounded drop-shadow-lg  hover:bg-opacity-40 ">
        <WalletMultiButton className="hover:bg-white " />
      </div>
    );
  } else {
    return (
      <div className="mx-10 font-bold border-gray-100  border w-xl bg-white bg-opacity-10 backdrop-blur-lg rounded drop-shadow-lg ">
        <div className="flex space-x-20 m-20 justify-center items-center text-white">
          {!value && (
            <button
              onClick={createCounter}
              className="w-[10rem] p-3 bg-indigo-800 hover:bg-indigo-700 rounded-lg text-white"
            >
              Create Counter
            </button>
          )}
          {value && (
            <div className="flex flex-col space-y-4">
              <button
                onClick={increment}
                className=" backdrop-blur-lg bg-opacity-40 drop-shadow-lg bg-black hover:bg-white hover:bg-opacity-20  rounded-lg text-white p-3"
              >
                Increment
              </button>
              <button
                onClick={decrement}
                className=" backdrop-blur-lg bg-opacity-40 drop-shadow-lg bg-black 0 text-white hover:bg-white hover:bg-opacity-20  rounded-lg p-3"
              >
                Decrement
              </button>
            </div>
          )}

          {value && value >= Number(0) ? (
            <h2 className="text-6xl ">{value}</h2>
          ) : (
            <h3>Please create the counter.</h3>
          )}
        </div>
      </div>
    );
  }
}


export default App;
