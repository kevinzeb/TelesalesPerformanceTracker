import { Card, Text, Title, Flex } from '@tremor/react';

import useProvider from '../../hooks/useProvider';

import dynamic from 'next/dynamic';

const DateRangePickerSpanish = dynamic(
  () => import('../../DateRangePickerSpanish'),
  {
    loading: () => <p>Loading...</p>
  }
);

const website = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 }
];

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 }
];

const app = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 }
];

const data = [
  {
    category: 'Website',
    stat: '10,234',
    data: website
  },
  {
    category: 'Online Shop',
    stat: '12,543',
    data: shop
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app
  }
];

export default async function IndexPage(props: any) {
  const provider = useProvider();

  const user = await provider.operator.getTelesalesOperator({
    id: props?.params?.id || ''
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card>
        <Title>{user?.name}</Title>
        <Flex
          justifyContent="start"
          alignItems="baseline"
          className="space-x-2"
        >
          <Text>Email:</Text>
          <Text>{user?.email}</Text>
        </Flex>
        <Flex
          justifyContent="start"
          alignItems="baseline"
          className="space-x-2"
        >
          <Text>ID:</Text>
          <Text>{user?.id}</Text>
        </Flex>
      </Card>
      <Card className="mt-6">
        <Text className="mb-4">
          Selecciona el intervalo de fechas a evaluar:
        </Text>

        <DateRangePickerSpanish operatorId={props?.params?.id || ''} />
      </Card>
    </main>
  );
}
