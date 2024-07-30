import React from 'react';
import Link from 'next/link';

const blogPosts = [
  { id: 1, title: 'Blog Post 1', image: '/images/post1.jpg' },
  { id: 2, title: 'Blog Post 2', image: '/images/post2.jpg' },
  { id: 3, title: 'Blog Post 3', image: '/images/post3.jpg' },
  // Add more blog posts as needed
];

export default function Blog() {
  return (
    <div className="blog-container">
      <aside>
        <ul>
          {blogPosts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.id}`}>
                <img src={post.image} alt={post.title} />
                <span>{post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main>
        {blogPosts.map((post) => (
          <img key={post.id} src={post.image} alt={post.title} />
        ))}
      </main>
    </div>
  );
}