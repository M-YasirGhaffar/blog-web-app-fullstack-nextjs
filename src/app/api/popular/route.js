import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const POST_PER_PAGE = 5; // Change this to the number of posts you want to send

  const query = {
    take: POST_PER_PAGE,
    orderBy: { views: 'desc' }, // Order by views in descending order
  };

  try {
    const [posts, totalPosts] = await prisma.$transaction([
      prisma.post.findMany({
        ...query,
        include: { user: true }, 
      }),
      prisma.post.count(), // Count all posts
    ]);
    return new NextResponse(JSON.stringify({ posts, totalPosts }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};