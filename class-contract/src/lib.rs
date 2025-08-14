use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::{self, ProgramResult}, program::invoke_signed, pubkey::Pubkey, system_instruction::create_account
};

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    account_info: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    // create a new pda onchain
    // pda, userAcc and  Systemprogram
    let iter = &mut account_info.iter();
    let pda = next_account_info(iter)?;
    let user_acc = next_account_info(iter)?;
    let system_program = next_account_info(iter)?;

    let seeds = &[user_acc.key.as_ref(), b"user"];

    let ix = create_account(
        user_acc.key,
        pda.key,
        1000000000,
        8,
        program_id
    );

    invoke_signed(&ix, account_info, &[seeds]);

    Ok(())

}
