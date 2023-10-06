import { PaginatedResponse } from '../helpers/entity/paginatedResponse.entity';
import { InputTelesalesOperatorFilters } from './InputTelesalesOperatorFilters.entity';
import { TelesalesOperator } from './telesalesOperator.entity';
import axios from 'axios';

export interface ITelesalesOperatorRepository {
  getTelesalesOperators(
    filters: InputTelesalesOperatorFilters
  ): Promise<PaginatedResponse<TelesalesOperator>>;

  getTelesalesOperator(
    filters: InputTelesalesOperatorFilters
  ): Promise<TelesalesOperator | null>;
}

export class TelesalesOperatorRepository
  implements ITelesalesOperatorRepository
{
  async getTelesalesOperators(
    filters: InputTelesalesOperatorFilters
  ): Promise<PaginatedResponse<TelesalesOperator>> {
    const response = await axios.get(
      'https://dn52td20lb.execute-api.us-east-1.amazonaws.com/users'
    );
    const data = response.data;

    const items = data
      .map((item: any) => ({
        email: item.email,
        id: item.id,
        name: item.username || 'Not Found'
      }))
      .filter((item: any) => {
        return item.name
          .toLowerCase()
          .includes(filters?.name?.toLowerCase() || '');
      });

    return {
      items,
      total: items.length,
      page: 0,
      size: items.length
    };
  }

  async getTelesalesOperator(
    filters: InputTelesalesOperatorFilters
  ): Promise<TelesalesOperator | null> {
    const response = await axios.get(
      'https://dn52td20lb.execute-api.us-east-1.amazonaws.com/users'
    );
    const data = response.data;
    console.log(data);

    const items = data
      .map((item: any) => ({
        email: item.email,
        id: item.id,
        name: item.username || 'Not Found'
      }))
      .find((item: any) => {
        return item.id === Number(filters.id);
      });

    return items || null;
  }
}
