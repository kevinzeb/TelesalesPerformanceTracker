import { PaginatedResponse } from '../helpers/entity/paginatedResponse.entity';
import { InputTelesalesOperatorFilters } from './InputTelesalesOperatorFilters.entity';
import { TelesalesOperator } from './telesalesOperator.entity';
import {
  ITelesalesOperatorRepository,
  TelesalesOperatorRepository
} from './telesalesOperator.repository';

/**
 * 🔖 Uses cases TelesalesOperator
 */
export class TelesalesOperatorUseCases {
  repository: ITelesalesOperatorRepository;

  constructor() {
    this.repository = new TelesalesOperatorRepository();
  }

  /** Get array telesales operators by filter.
   * @param {InputTelesalesOperatorFilters} filters - filters for get TelesalesOperators.
   * @return {Promise<PaginatedResponse<TelesalesOperator>>} TelesalesOperators.
   */
  async getTelesalesOperators(
    filters: InputTelesalesOperatorFilters
  ): Promise<PaginatedResponse<TelesalesOperator>> {
    return this.repository.getTelesalesOperators(filters);
  }

  /** Get telesales operator by id.
   * @param {InputTelesalesOperatorFilters} filters - filters for get TelesalesOperators.
   * @return {Promise<TelesalesOperator | null>} TelesalesOperator.
   */
  async getTelesalesOperator(
    filters: InputTelesalesOperatorFilters
  ): Promise<TelesalesOperator | null> {
    return this.repository.getTelesalesOperator(filters);
  }
}
