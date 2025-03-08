import crypto from "crypto";
import { getCrypto, getPublicSeed } from "./get-seed";
import { Chance } from "chance";

const generatePrivateSeedHashPair = async (): Promise<{
  seed: string;
  hash: string;
}> => {
  try {
    const seed = await generatePrivateSeed();
    const hash = await buildPrivateHash(seed);
    return { seed, hash };
  } catch (error) {
    console.log("Error generating private seed hash pair", error);
    return { seed: "", hash: "" };
  }
};

const generatePrivateSeed = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(256, (error, buffer) => {
      if (error) {
        reject(error);
      } else {
        resolve(buffer.toString("hex"));
      }
    });
  });
};

const buildPrivateHash = async (seed: string): Promise<string> => {
  try {
    const hash = crypto.createHash("sha256").update(seed).digest("hex");
    return hash;
  } catch (error) {
    console.log("Error building private hash", error);
    return "";
  }
};

const generateCrashRandom = async (
  privateSeed: string
): Promise<{ publicSeed: string; crashPoint: number }> => {
  try {
    const publicSeed = await getPublicSeed();
    const crashPoint = await generateCrashPoint(privateSeed, publicSeed);
    // confirmValidation(publicSeed, crashPoint);
    return { publicSeed, crashPoint };
  } catch (error) {
    console.log("Error generating crash random" + error);
    return { publicSeed: "", crashPoint: 0 };
  }
};

const generateCrashPoint = (seed: string, salt: string): number => {
  const hash = crypto.createHmac("sha256", seed).update(salt).digest("hex");

  const hs = Math.floor(100 / (0.05 * 100));

  if (isCrashHashDivisible(hash, hs)) {
    return 109;
  }

  const h = parseInt(hash.slice(0, 52 / 4), 16);
  const e = Math.pow(2, 52);

  return Math.floor((100 * e - h) / (e - h));
};

const isCrashHashDivisible = (hash: string, mod: number): boolean => {
  let val = 0;

  const o = hash.length % 4;

  for (let i = o > 0 ? o - 4 : 0; i < hash.length; i += 4) {
    val = ((val << 16) + parseInt(hash.substring(i, i + 4), 16)) % mod;
  }

  return val === 0;
};

const generateCoinflipRandom = async (
  gameId: string,
  privateSeed: string
): Promise<{ publicSeed: string; module: number }> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get a new public seed from blockchain
      const publicSeed = await getPublicSeed();

      // Construct a new chance instance with
      // privateSeed-roundId-publicSeed pair
      const chance = new Chance(`${privateSeed}-${gameId}-${publicSeed}`);

      // Generate a random, repeatable module to determine round result
      const module = chance.floating({ min: 0, max: 60, fixed: 7 });

      // Resolve promise and return data
      resolve({ publicSeed, module });
    } catch (error) {
      reject(error);
    }
  });
};

export {
  generateCrashRandom,
  generatePrivateSeedHashPair,
  generateCoinflipRandom,
};
