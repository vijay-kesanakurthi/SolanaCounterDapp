import Head from "next/head";
import AppWithProvider from "./components/counter";

export default function Home() {
  return (
    <>
      <Head>
        <title>Conter | Solana Dapp</title>
      </Head>
      <div className=" flex bg-cover bg-[url('https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/620bd6d655f2044afa28bff4_glassmorphism-p-1600.jpeg')] justify-center h-screen  items-center ">
        <AppWithProvider />
      </div>
    </>
  );
}
