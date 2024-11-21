import Link from 'next/link';
import { getAllItems } from '../utils/supabaseUtils';

export const revalidate = 60;

export default async function Posts() {
  const posts = await getAllItems('posts');

  if (!posts) {
    return <p>No posts found.</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <p key={post.id}>
          <Link href={`/static/${post.id}`}>{post.title}</Link>
        </p>
      ))}
    </div>
  );
}
