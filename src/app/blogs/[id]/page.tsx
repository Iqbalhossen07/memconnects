import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

// Using async params for Next.js 15
export default async function BlogDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blogId = parseInt(id);

  if (isNaN(blogId)) {
    notFound();
  }

  const post = await prisma.blogs.findUnique({
    where: { id: blogId },
  });

  if (!post) {
    notFound();
  }

  const recentPosts = await prisma.blogs.findMany({
    where: { NOT: { id: blogId } },
    orderBy: { created_at: "desc" },
    take: 4,
  });

  const mainImagePath = post.featured_image ? `/uploads/blogs/${post.featured_image}` : undefined;

  return (
    <main>
      <section className="page-header-bg py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">{post.title}</h1>
          <nav className="flex justify-center mt-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white">
                  <i className="fas fa-home mr-2.5"></i> Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <i className="fas fa-chevron-right text-white/50 mx-2 text-xs"></i>
                  <Link href="/blogs" className="text-sm font-medium text-white/80 hover:text-white">Blog</Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <i className="fas fa-chevron-right text-white/50 mx-2 text-xs"></i>
                  <span className="ml-1 text-sm font-medium text-white md:ml-2 truncate max-w-xs">{post.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <article className="prose lg:prose-xl max-w-none">
                  <img src={mainImagePath} alt={post.title} className="w-full h-auto rounded-2xl shadow-lg mb-8" />

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="bg-orange-100 text-orange-600 font-semibold px-3 py-1 rounded-full mr-4">{post.category || 'Blog'}</span>
                  <span><i className="far fa-calendar-alt mr-2"></i>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span className="mx-2">|</span>
                  <span><i className="far fa-user mr-2"></i>By {post.author || 'Admin'}</span>
                </div>

                <h1 className="text-3xl font-bold mb-6">{post.title}</h1>

                <div 
                  className="whitespace-pre-wrap text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-gray-50 p-6 rounded-2xl border">
                  <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {recentPosts.map(recent => {
                      const img = recent.featured_image ? `/uploads/blogs/${recent.featured_image}` : 'https://placehold.co/100x70/f0f0f0/ccc?text=Image';
                      return (
                        <Link key={recent.id} href={`/blogs/${recent.id}`} className="flex items-center group space-x-4">
                          <img src={img} alt={recent.title} className="w-20 h-16 object-cover rounded-lg flex-shrink-0" 
                          />
                          <div>
                            <h4 className="font-semibold text-sm leading-tight group-hover:text-orange-600 transition-colors">{recent.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">{new Date(recent.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
