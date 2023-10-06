import { FeedbackOperatorCall } from './feedbackOperator.entity';
import {
  FeedbackOperatorRepository,
  IFeedbackOperatorRepository
} from './feedbackOperator.repository';

/**
 * 🔖 Uses cases FeedbackOperator
 */
export class FeedbackOperatorUseCases {
  repository: IFeedbackOperatorRepository;

  constructor() {
    this.repository = new FeedbackOperatorRepository();
  }
  async getFeedbackOperator(
    transcriptCall: string
  ): Promise<FeedbackOperatorCall | null> {
    return this.repository.getFeedbackOperator(transcriptCall);
  }
  async getFeedbackOperatorChatId(
    id: string
  ): Promise<FeedbackOperatorCall | null> {
    return this.repository.getFeedbackOperatorChatId(id);
  }
  async getFeedbackOperatorChat(
    userId: string,
    from?: Date,
    to?: Date
  ): Promise<FeedbackOperatorCall | null> {
    return this.repository.getFeedbackOperatorChat(userId, from, to);
  }
}
