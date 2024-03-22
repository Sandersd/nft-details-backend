import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import { NFTData, TransferEvent } from "./types";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
dotenv.config();

app.get(
  "/api/nft/:chain/:contractAddress/:tokenId",
  async (req: Request, res: Response) => {
    const { chain, contractAddress, tokenId } = req.params;
    try {
      const nftResponse = await axios.get<NFTData>(
        `https://api.simplehash.com/api/v0/nfts/${chain}/${contractAddress}/${tokenId}`,
        {
          headers: {
            accept: "application/json",
            "X-API-KEY": process.env.SIMPLE_HASH_API_KEY,
          },
        }
      );
      const nftData = nftResponse.data;

      const activityResponse = await axios.get<TransferEvent[]>(
        `https://api.simplehash.com/api/v0/nfts/transfers/${chain}/${contractAddress}/${tokenId}`,
        {
          headers: {
            accept: "application/json",
            "X-API-KEY": process.env.SIMPLE_HASH_API_KEY,
          },
        }
      );
      const nftActivity = activityResponse.data;

      res.json({ nftData, nftActivity });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch NFT data", error });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
