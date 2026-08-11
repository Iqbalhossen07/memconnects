import prisma from "@/lib/prisma";
import EditBlogForm from "./EditBlogForm";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const blog = await prisma.blogs.findUnique({
    where: { id: parseInt(resolvedParams.id) },
  });

  if (!blog) {
    notFound();
  }

  return <EditBlogForm blog={blog} />;
}
