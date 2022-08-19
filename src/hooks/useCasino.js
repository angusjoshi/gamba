import { useEffect, useState } from "react";
import Web3 from "web3";
const useCasino = (abi, address) => {
    const [casino, setCasino] = useState(null);

    useEffect(() => {
        const web3 = new Web3(window.ethereum);
        const newcasino = new web3.eth.Contract(abi, address);
        setCasino(newcasino);
    }, [window.ethereum, abi, address]);

    return casino;
}
export default useCasino;