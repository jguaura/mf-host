import { lazy } from 'react';

const Button = lazy(() => import('remote/Button'));
const Box = lazy(() => import('remote/Box'));

const remoteModules = ['remote/Button', 'remote/Box', 'remote/handleRemoteModules']

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-3 p-24 bg-gray-300`}
    >
      <h1 className='text-2xl font-semibold text-black'>Host app</h1>
      <Box>
        <Button label="Botoncilo" />
      </Box>
    </main>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const handleRemoteModules = (await import('remote/handleRemoteModules'))?.default;

  if (handleRemoteModules) {
    return handleRemoteModules(remoteModules, ctx);
  }

  return {
    props: {}
  };
};