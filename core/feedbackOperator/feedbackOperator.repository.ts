import { headers } from 'next/headers';
import { FeedbackOperatorCall } from './feedbackOperator.entity';
import axios from 'axios';

export interface IFeedbackOperatorRepository {
  getFeedbackOperator(filters: string): Promise<FeedbackOperatorCall | null>;
  getFeedbackOperatorChatId(id: string): Promise<FeedbackOperatorCall | null>;
  getFeedbackOperatorChat(
    userId: string,
    from?: Date,
    to?: Date
  ): Promise<FeedbackOperatorCall | null>;
}

export class FeedbackOperatorRepository implements IFeedbackOperatorRepository {
  async getFeedbackOperator(
    transcriptCall: string
  ): Promise<FeedbackOperatorCall | null> {
    try {
      const response = await axios.get(
        `https://dn52td20lb.execute-api.us-east-1.amazonaws.com/call-feedback/${transcriptCall}`
      );

      const data = response.data;

      return data || null;
    } catch (error) {
      return {
        feedback: [
          {
            feedback_message: 'No encontramos informacion con estos parametros',
            conversation_id: 'No id'
          }
        ],
        operator_id: ''
      };
    }
  }

  async getFeedbackOperatorChatId(
    id: string
  ): Promise<FeedbackOperatorCall | null> {
    try {
      const response = await axios.get(
        `https://dn52td20lb.execute-api.us-east-1.amazonaws.com/chat-feedback/${id}`
      );

      const data = response.data;

      return data || null;
    } catch (error) {
      return {
        feedback: [
          {
            feedback_message: 'No encontramos informacion con estos parametros',
            conversation_id: 'No id'
          }
        ],
        operator_id: ''
      };
    }
  }

  async getFeedbackOperatorChat(
    userId: string,
    from: Date,
    to: Date
  ): Promise<FeedbackOperatorCall | null> {
    try {
      const response = await axios.get(
        `https://dn52td20lb.execute-api.us-east-1.amazonaws.com/feedback/${userId}?start_date=${from.toISOString()}&end_date=${to.toISOString()}`
      );

      const data = response.data;

      return data || null;
    } catch (error) {
      return {
        feedback: [
          {
            feedback_message: 'No encontramos informacion con estos parametros',
            conversation_id: 'No id'
          }
        ],
        operator_id: ''
      };
    }
  }
}
