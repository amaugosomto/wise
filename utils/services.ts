import { UserModel, WalletModel } from ".";
import { Currency, Status } from ".";

export async function setupUser(registeredUser: UserModel) {

  // Using multiples calls as 'createMany' method does not exist on my package
  const wallet1 = await fetch('/api/wallet', {
    method: 'POST',
    body: JSON.stringify({ currencyId: 1, userId: registeredUser.id, amount: 1000 })
  });
  const wallet2 = await fetch('/api/wallet', {
    method: 'POST',
    body: JSON.stringify({ currencyId: 2, userId: registeredUser.id, amount: 0 })
  });
  const wallet3 = await fetch('/api/wallet', {
    method: 'POST',
    body: JSON.stringify({ currencyId: 3, userId: registeredUser.id, amount: 0 })
  });

  const walletResponse: WalletModel = await wallet1.json();

  const transactionData = {
    userId: registeredUser.id,
    statusId: Status.Received,
    walletId: walletResponse.id,
    rate: 1,
    amount: 1000,
    currencyId: Currency.USD
  }

  fetch('/api/transactions', {
    method: 'POST',
    body: JSON.stringify(transactionData)
  });
}