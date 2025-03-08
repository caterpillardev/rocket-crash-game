import { JsonRpc } from "eosjs";
import crypto from "crypto";

const rpc = new JsonRpc("http://eos.greymass.com", { fetch });

const getPublicSeed = async (): Promise<string> => {
  try {
    const info = await rpc.get_info();
    const blockNumber = info.last_irreversible_block_num + 1;
    const block = await rpc.get_block(blockNumber || 1);
    return block.id;
  } catch (error) {
    console.error("Error getting public seed: ", error);
    return "";
  }
};

const getCrypto = async (cryptoEnc: string, mod: any): Promise<any> => {
 // integration with base chain
};

export { getCrypto, getPublicSeed };
