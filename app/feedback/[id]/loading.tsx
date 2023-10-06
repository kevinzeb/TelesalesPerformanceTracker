import { Title, Text, Card, Flex } from '@tremor/react';

export default async function Loading() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card>
        <Title>Loading...</Title>
        <Flex
          justifyContent="start"
          alignItems="baseline"
          className="space-x-2"
        >
          <Text>Email:</Text>
          <Text>Loading...</Text>
        </Flex>
        <Flex
          justifyContent="start"
          alignItems="baseline"
          className="space-x-2"
        >
          <Text>ID:</Text>
          <Text>Loading...</Text>
        </Flex>
      </Card>
      <Card className="mt-6">
        <Text className="mb-4">
          Selecciona el intervalo de fechas a evaluar:
        </Text>
      </Card>
    </main>
  );
}
