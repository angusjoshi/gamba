import { useEffect, useState } from "react";

const useAccounts = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const getAccounts = async () => {
            const newAccounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
            setAccounts(newAccounts);
        }
        
        getAccounts().catch(console.error);

    }, [window.ethereum]);

    return accounts;
}
export default useAccounts;