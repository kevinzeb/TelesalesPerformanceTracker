import { Title } from '@tremor/react';
import TranscriptionComponent from './TranscriptionComponent';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title className="text-center ">Evaluador de calidad llamadas</Title>
      <TranscriptionComponent />
    </main>
  );
}
