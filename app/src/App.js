import React, { useEffect, useState } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import _ from "lodash";
import CandyMachine from "./CandyMachine";
import background from "./assets/background.jpeg"

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const checkWalletConnection = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");

          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            `Connected with public key: ${response.publicKey.toString()}`
          );

          setWalletAddress(response.publicKey.toString());
        }
      } else {
        console.log("Solana is not on your browser, get a Phantom Wallet! 👻");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log(
        `Connected with public key: ${response.publicKey.toString()}`
      );
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderConnectButton = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Claim your NFT
    </button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkWalletConnection();
    };

    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">

      <div className="container" style={{backgroundImage: "url("+background+")"}}>
        <div className="header-container">

          {_.isNull(walletAddress) && renderConnectButton()}
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
