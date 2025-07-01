import { Connection, Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";

const conn = new Connection("http://127.0.0.1:8899");

async function main() {
    const kp = new Keypair();
    const dataAccount = new Keypair();
    const signature = await conn.requestAirdrop(kp.publicKey, 3000_000_000);
    await conn.confirmTransaction(signature);

    const instruction = SystemProgram.createAccount({
        fromPubkey: kp.publicKey,
        newAccountPubkey: dataAccount.publicKey,
        lamports: 1000_000_000,
        space: 8,
        programId: SystemProgram.programId
    })

    const tx = new Transaction().add(instruction)
    tx.feePayer = kp.publicKey;
    tx.recentBlockhash = (await conn.getLatestBlockhash()).blockhash;
    tx.sign(kp)

    await conn.sendTransaction(tx, [kp, dataAccount]);

    console.log(dataAccount.publicKey.toBase58());

}

main()

