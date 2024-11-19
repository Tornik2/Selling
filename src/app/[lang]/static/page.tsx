import Link from 'next/link';
import { getItems } from '../utils/supabaseUtils';

export const revalidate = 60;

export default async function Posts() {
  const posts = await getItems('posts');

  if (!posts) {
    return <p>No posts found.</p>;
  }

  return posts.map((post) => (
    <p key={post.id}>
      <Link href={`/static/${post.id}`}>{post.title}</Link>
    </p>
  ));
}
