import Link from "next/link";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Our Blog - Mem Connects",
  description: "Read the latest news, articles, and guides from Mem Connects on studying in the UK, university life, and application tips.",
};

export default async function BlogsPage() {
  const blogsData = await prisma.blogs.findMany({
    orderBy: { created_at: "desc" },
  });

  return (
    <main>
      <section className="page-header-bg py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">Our Blog</h1>
          <p className="mt-3 text-lg text-white/90 max-w-2xl mx-auto">Latest News, Tips, and Insights for Your Study Abroad Journey</p>
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
                  <span className="text-sm font-medium text-white">Blog</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section id="blog" className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1 rounded-full mb-3">OUR BLOG</span>
            <h2 className="text-4xl font-bold text-gray-800">Latest News <span className="gradient-text">& Articles</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogsData.length > 0 ? (
              blogsData.map((post) => {
                const imagePath = post.image ? `/uploads/blogs/${post.image}` : 'https://placehold.co/600x400/f0f0f0/ccc?text=No+Image';
                return (
                  <div key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <Link href={`/blogs/${post.id}`}>
                        <img 
                          src={imagePath} 
                          alt={post.name} 
                          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500" 
                          onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/f0f0f0/ccc?text=No+Image'; }}
                        />
                      </Link>
                      <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{post.category || 'Blog'}</span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span><i className="far fa-calendar-alt mr-1.5"></i>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-orange-600 transition-colors">
                        <Link href={`/blogs/${post.id}`}>{post.name}</Link>
                      </h3>
                      <Link href={`/blogs/${post.id}`} className="font-semibold text-orange-600 text-sm hover:text-orange-800 group-inner flex items-center">
                        Read More <i className="fas fa-arrow-right ml-1 text-xs transition-transform group-inner-hover:translate-x-1"></i>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="col-span-full text-center text-gray-500">No recent blog posts found.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
