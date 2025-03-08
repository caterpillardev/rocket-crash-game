import { Request, Response } from "express";
import Transaction from "models/Transaction";
import User from "models/User";
import { TOKEN_ABI, TOKEN_ADDRESS } from "utils/contract";
import Web3 from "web3";

export const deposit = async (req: Request, res: Response) => {
  const { amount, address, txHash } = req.body;

  try {
    const user = await User.findOne({ crypto: address });

    if (!user) {
      console.error("User not found, maybe database did an deposit?");
      res.status(500).send({ error: "User not found." });
    } else {
      const updatedUser = await User.findOneAndUpdate(
        { crypto: address },
        { $inc: { wallet: Number(amount), totalDeposited: amount } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(500).send({ error: "Failed to update user." });
      }

      const newTransaction = new Transaction({
        user: updatedUser._id,
        tranType: 1,
        walletAddress: address,
        txid: txHash,
        amount: Number(amount),
      });
      await newTransaction.save();

      if (updatedUser) {
        res.status(201).json({ amount: updatedUser.wallet });
      }
    }
  } catch (error) {}
};

export const approve = async (req: Request, res: Response) => {
  const { amount, address } = req.body;

  const web3 = new Web3(
    "https://sepolia.infura.io/v3/086e858fa7354bfb8598a3d8c1623302"
  );

  const tokenContract = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);
  const backendAccount = web3.eth.accounts.privateKeyToAccount(
    `0x${process.env.ACCOUNT_PRIVATE_KEY}`
  );

  try {
    const user = await User.findOne({ crypto: address });

    if (user) {
      if (user.wallet > amount) {
        const txData = tokenContract.methods
          .approve(address, amount * 1000000000000000000)
          .encodeABI();

        const txObj = {
          from: backendAccount.address,
          to: TOKEN_ADDRESS,
          data: txData,
        };

        let gas = await web3.eth.estimateGas(txObj);
        const gasPrice = await web3.eth.getGasPrice();
        console.log(`gas ${gas}`);
        console.log(`gasprice ${gasPrice}`);
        const sTx = await web3.eth.accounts.signTransaction(
          { ...txObj, gas, gasPrice },
          backendAccount.privateKey
        );
        await web3.eth.sendSignedTransaction(sTx.rawTransaction);

        const txData1 = tokenContract.methods
          .transfer(address, amount * 1000000000000000000)
          .encodeABI();

        const txObj1 = {
          from: backendAccount.address,
          to: TOKEN_ADDRESS,
          data: txData1,
        };

        gas = await web3.eth.estimateGas(txObj1);
        const sTx1 = await web3.eth.accounts.signTransaction(
          { ...txObj1, gas, gasPrice },
          backendAccount.privateKey
        );
        const rest = await web3.eth.sendSignedTransaction(sTx1.rawTransaction);

        console.log("confirm withdraw");

        const updatedUser = await User.findOneAndUpdate(
          { crypto: address },
          { $inc: { wallet: -Number(amount), totalWithdraw: amount } },
          { new: true }
        );

        if (!updatedUser) {
          return res.status(500).send({ error: "Failed to update user." });
        }

        const newTransaction = new Transaction({
          user: updatedUser._id,
          tranType: 2,
          walletAddress: address,
          txid: rest.transactionHash,
          amount: Number(amount),
        });
        await newTransaction.save();

        res.status(201).send({ success: true });
      }
    }
  } catch (error) {
    console.log("Find user error:", error);
  }
};

export const getCrashRank = async (req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ crash: -1 });
    res.status(201).json(users);
  } catch (error) {
    console.log("Error", error);
  }
};

export const getMineRank = async (req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ mine: -1 });
    res.status(201).json(users);
  } catch (error) {
    console.log("Error", error);
  }
};

export const getFlipRank = async (req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ coinflip: -1 });
    res.status(201).json(users);
  } catch (error) {
    console.log("Error", error);
  }
};
