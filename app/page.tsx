import { Card, Title, Text } from '@tremor/react';

import Search from './search';

import UsersTable from './table';
import useProvider from './hooks/useProvider';
import { DateRangePickerSpanish } from './DateRangePickerSpanish';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const provider = useProvider();

  const data = await provider.operator.getTelesalesOperators({
    name: search
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Operadores de Televenta</Title>
      <Text>Una lista de operadores de televenta con cuenta en intercom.</Text>
      <Search initValue={search} />
      {/* <DateRangePickerSpanish /> */}
      {data?.items?.length === 0 ? (
        <Card className="mt-6">
          <Text>No encontramos resultados.</Text>
        </Card>
      ) : (
        <Card className="mt-6">
          <UsersTable users={data?.items || []} />
        </Card>
      )}
    </main>
  );
}
