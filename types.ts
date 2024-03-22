export interface NFTData {
  name: string;
  image_url: string;
  description: string;
  collection: CollectionData;
}

export interface CollectionData {
  name: string;
  image_url: string;
}

export interface NFTActivity {
  transfers: TransferEvent[];
}

export interface TransferEvent {
  event_type: "MINT" | "BURN" | "TRANSFER" | "SALE";
  from_address: string;
  to_address: string;
  timestamp: string;
}
