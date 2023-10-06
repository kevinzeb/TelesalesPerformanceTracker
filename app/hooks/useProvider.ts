import { FeedbackOperatorUseCases } from '../../core/feedbackOperator/feedbackOperator.usecases';
import { TelesalesOperatorUseCases } from '../../core/operator/telesalesOperator.usecases';

const useProvider = () => {
  return {
    operator: new TelesalesOperatorUseCases(),
    feedback: new FeedbackOperatorUseCases()
  };
};

export default useProvider;
