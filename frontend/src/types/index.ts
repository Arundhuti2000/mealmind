export interface ParsedItem {
  name: string;
  quantity: number;
  unit?: string | null;
  category: string;
}

export interface ReceiptProcessedResponse {
  receipt_id: string;
  items_added: number;
  items: ParsedItem[];
}

export type Theme = "dark" | "light";
