import { UserModel, WalletModel } from ".";
import { Currency, Status } from ".";

export async function setupUser(registeredUser: UserModel) {

  // Using multiples calls as 'createMany' method does not exist on my package
  const wallet1 = await fetch('/api/wallet', {
    method: 'POST',
    body: JSON.stringify({ currencyId: 1, userId: registeredUser.id, amount: 1000 })
  });
  await fetch('/api/wallet', {
    method: 'POST',
    body: JSON.stringify({ currencyId: 2, userId: registeredUser.id, amount: 0 })
  });
  await fetch('/api/wallet', {
    method: 'POST',
    body: JSON.stringify({ currencyId: 3, userId: registeredUser.id, amount: 0 })
  });

  const walletResponse: WalletModel = await wallet1.json();

  const transactionData = {
    receivedById: registeredUser.id,
    statusId: Status.Received,
    walletId: walletResponse.id,
    rate: 1,
    amount: 1000,
    sentCurrencyId: Currency.USD,
    receivedCurrencyId: Currency.USD,
  }

  fetch('/api/transactions', {
    method: 'POST',
    body: JSON.stringify(transactionData)
  });
}