
import AuthRedirect from '@/components/AuthRedirect'

export default function Home() {
  return (
    <>
      <AuthRedirect />
      <h1 className="text-3xl font-bold underline">Root Page</h1>
    </>
  );
}
