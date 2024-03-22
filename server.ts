import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import { NFTData, NFTActivity } from "./types";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
dotenv.config();

//https://mighty-beach-50714-fb208d5a2695.herokuapp.com/api/nft/ethereum/0xed5af388653567af2f388e6224dc7c4b3241c544/4666
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

      const activityResponse = await axios.get<NFTActivity>(
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
