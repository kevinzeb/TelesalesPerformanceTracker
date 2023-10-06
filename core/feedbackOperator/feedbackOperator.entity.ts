export interface FeedbackCall {
  feedback_message: string;
  conversation_id: string;
}

export interface FeedbackOperatorCall {
  feedback: FeedbackCall[];
  operator_id: string;
}
