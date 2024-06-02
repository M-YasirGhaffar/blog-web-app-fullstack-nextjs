import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const searchTerm = searchParams.get("searchTerm").toLowerCase();
  const searchWords = searchTerm.split(' ');

  try {
    const posts = await prisma.post.findMany({
      include: { user: true }, // Include the related user
    });

    const regex = new RegExp(searchWords.join('|'), 'i');

    const filteredPosts = posts
      .filter(post => 
        regex.test(post.title.toLowerCase()) || 
        regex.test(post.desc.toLowerCase()) ||
        regex.test(post.user.name.toLowerCase())
      )
      .map(post => ({
        ...post,
        matchCount: searchWords.reduce((count, word) => 
          count + (post.title.toLowerCase().includes(word) ? 1 : 0) + 
                  (post.desc.toLowerCase().includes(word) ? 1 : 0) +
                  (post.user.name.toLowerCase().includes(word) ? 1 : 0), 
          0
        )
      }))
      .sort((a, b) => b.matchCount - a.matchCount);

    return new NextResponse(JSON.stringify({ posts: filteredPosts }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};