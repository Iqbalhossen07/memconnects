import prisma from "@/lib/prisma";
import EditTestimonialForm from "./EditTestimonialForm";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const testimonial = await prisma.testimonials.findUnique({
    where: { id: parseInt(resolvedParams.id) },
  });

  if (!testimonial) {
    notFound();
  }

  return <EditTestimonialForm testimonial={testimonial} />;
}
