import { Connection, PublicKey, Transaction, SystemProgram, clusterApiUrl } from "@solana/web3.js";
import { Buffer } from 'buffer';
import { Signature } from "../interfaces/Signature";

window.Buffer = Buffer;

const GAME_WALLET_ADDRESS = "Fv9LLZMgfX8dFniFZp1cn6JpRZwHHfKTR1nEiQbJMWLu";

export const processPayment = async (): Promise<Signature | null> => {
    if (!(window as any).solana) {
        alert("Phantom wallet not found. Please install it.");
        return null;
    }

    try {
        const provider = (window as any).solana;
        await provider.connect();
        const publicKey = provider.publicKey;
        console.log("Wallet connected:", publicKey.toString());

        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        const { blockhash } = await connection.getLatestBlockhash("finalized");

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(GAME_WALLET_ADDRESS),
                lamports: 0.01 * 10 ** 9,
            })
        );

        transaction.recentBlockhash = blockhash;
        transaction.feePayer = publicKey;

        const signedTransaction = await provider.signTransaction(transaction);

        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        await connection.confirmTransaction(signature, "confirmed");

        console.log("Transaction successful:", signature);
        const publicKeyAsString = publicKey.toString();
        const sinturedTransaction = {signature, publicKeyAsString};
        await provider.disconnect();
        console.log("Wallet disconnected after transaction");
        
        return sinturedTransaction;
    } catch (error) {
        console.error("Transaction failed:", error);
        await (window as any).solana.disconnect();
        return null;
    }
};
