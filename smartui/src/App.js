import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";

const getEthereumObject = () => window.ethereum;
function App() {
  const [currentAccount, setCurrentAccount] = useState();
  const [message, setMessage] = useState();
  const [greetings, setGreetings] = useState();
  const [txHash, setTxHash] = useState();
  const contractAddress = "0xB23B076998121b72403a02fe0949F572AB6d9166";
  const contractABI = abi.abi;

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();

      if (!ethereum) {
        setMessage("Please install metamask");
        return null;
      }

      console.log(ethereum);
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account.toString());
        return account;
      } else {
        setMessage("No account");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkAccount = async () => {
    try {
      const ethereum = getEthereumObject();

      if (!ethereum) {
        setMessage("Please install metamask");
        return null;
      }

      console.log(ethereum);
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      console.log(accounts);

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account.toString());
        return account;
      } else {
        setMessage("No account");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGreetings = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const helloWorldContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let greeting = await helloWorldContract.getTotal();
        setGreetings(greeting.toNumber());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMessage = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const helloWorldContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let message = await helloWorldContract.getMessage();
        setMessage(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendGreeting = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const helloWorldContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let greeting = await helloWorldContract.sayHello();
        console.log(greeting.hash);
        setTxHash(`Mining... ${greeting.hash} `);

        await greeting.wait();
        setTxHash(`Mined ${greeting.hash} `);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAccount().then((account) => {
      if (account !== null) {
        setCurrentAccount(account);
      }
    });
  }, []);
  return (
    <div className="App">
      <h1>Sign in</h1>
      <h3>{message}</h3>
      {currentAccount ? (
        <>
          <h3>Welcome to our feedback dApp!</h3>
          <h3>{currentAccount}</h3>
          <h3>{greetings}</h3>
          <button onClick={() => getGreetings()}>Get greetings</button>
          <button onClick={() => sendGreeting()}>Send greetings</button>
          <h3>{txHash}</h3>
        </>
      ) : (
        <button onClick={() => connectWallet()}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
