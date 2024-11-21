import { getItemById, getItemIds } from '../../utils/supabaseUtils';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
  const postIds = await getItemIds('posts');

  return (
    postIds?.map((id) => ({
      id: id.toString(),
    })) ?? []
  );
}

export default async function Post({
  params: { id },
}: {
  params: { id: string };
}) {
  const post = await getItemById('posts', id);

  if (!post) {
    notFound();
  }

  return <pre>{JSON.stringify(post, null, 2)}</pre>;
}
