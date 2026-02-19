export interface TrakteerSupport {
  supporter_name: string;
  support_message: string;
  quantity: number;
  amount: number;
  unit_name: string;
  status: string;
  updated_at: string;
  payment_method: string;
  order_id: string;
}

export interface TrakteerResponse {
  status: string;
  status_code: number;
  result: {
    data: TrakteerSupport[];
  };
  message?: string;
}
