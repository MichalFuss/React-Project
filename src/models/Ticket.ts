import type { CommentType } from "./comment";

export interface Ticket {
  id: number;
  subject: string;
  description: string;
  status_id: number;
  status_name: string;
  priority_id: number;
  priority_name: string;
  created_by: number;
  created_by_name: string;
  assigned_to?: number;
  assigned_to_name?: string;
  created_at: string;
  updated_at: string;
  comments?: Array<CommentType>;
  comments_count?: number;
}
export interface patchTicket {
  status_id: number;
  priority_id: number;
  assigned_to: number;
}
export interface newTicket {
  subject: string;
  description: string;
  priority_id: number;
}

