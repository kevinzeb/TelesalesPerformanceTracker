'use client';

import { useEffect, useState } from 'react';
import useProvider from './useProvider';
import { PaginatedResponse } from '../../core/helpers/entity/paginatedResponse.entity';
import { TelesalesOperator } from '../../core/operator/telesalesOperator.entity';

const useTelesalesOperators = () => {
  const provider = useProvider();
  const [operators, setOperators] =
    useState<PaginatedResponse<TelesalesOperator> | null>(null);

  useEffect(() => {
    const init = async () => {
      const operators = await provider.operator.getTelesalesOperators({});
      setOperators(operators);
    };

    init();
  });
  return {
    operators
  };
};

export default useTelesalesOperators;
