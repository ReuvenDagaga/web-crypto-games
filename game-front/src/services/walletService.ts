import { Connection, PublicKey, Transaction, SystemProgram, clusterApiUrl } from "@solana/web3.js";
import { Buffer } from 'buffer';

window.Buffer = Buffer;

const GAME_WALLET_ADDRESS = "Fv9LLZMgfX8dFniFZp1cn6JpRZwHHfKTR1nEiQbJMWLu";

export const processPayment = async (): Promise<string | null> => {
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

        // משיכת הבלוק האחרון (blockhash)
        const { blockhash } = await connection.getLatestBlockhash("finalized");

        // יצירת הטרנזקציה והוספת הבלוק האחרון
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(GAME_WALLET_ADDRESS),
                lamports: 0.01 * 10 ** 9,
            })
        );

        transaction.recentBlockhash = blockhash;
        transaction.feePayer = publicKey;

        // בקשת אישור העסקה מהמשתמש
        const signedTransaction = await provider.signTransaction(transaction);

        // שליחת הטרנזקציה לרשת
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        await connection.confirmTransaction(signature, "confirmed");

        console.log("Transaction successful:", signature);

        await provider.disconnect();
        console.log("Wallet disconnected after transaction");

        return signature;
    } catch (error) {
        console.error("Transaction failed:", error);
        await (window as any).solana.disconnect();
        return null;
    }
};
