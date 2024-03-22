export interface NFTData {
  name: string;
  image_url: string;
  description: string;
}

export interface TransferEvent {
  event_type: "MINT" | "BURN" | "TRANSFER";
  from_address: string;
  to_address: string;
}
