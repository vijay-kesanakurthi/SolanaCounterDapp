use anchor_lang::prelude::*;
// use solana_program::entrypoint::ProgramResult;
// use std::mem::size_of;
// use anchor_lang::solana_program::log::{
//     solana_log_compute_units
// }

declare_id!("7JtjNes6gDbHHiE3fg47jPvz7VV3gBhBXyAwCtsz6pDA");


#[program]
mod counter {
    use super::*;
    pub fn create(ctx: Context<Create>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.count = 0;
        Ok(())
    }
    pub fn increment(ctx: Context<Increment>) ->Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.count += 1;
        Ok(())
    }
    pub fn decrement(ctx: Context<Decrement>) ->Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.count -= 1;
        Ok(())
    }
}

// Transaction instructions
#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 16 + 16)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}

// Transaction instructions
#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}
#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

// An account that goes inside a transaction instruction
#[account]
pub struct BaseAccount {
    pub count: i64,
}