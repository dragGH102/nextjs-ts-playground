import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostData } from '@/lib/shared-types';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPostIds(): any {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => ({
    // important: this is the format expected by
    // getStaticPaths which is calling this from
    // [id].tsx
    params: {
      // remove 'md' extension to get file name (to use it as ID)
      id: fileName.replace(/\.md$/, ''),
    },
  }));
}

export function getSortedPostsData(): Array<PostData> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    // Combine data with id
    return {
      id,
      ...matterResult.data,
    };
  }) as Array<PostData>;

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id: string): Promise<PostData> {
  // get post file path
  const fullPath = path.join(postsDirectory, `${id}.md`);

  // get post content
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // associate post id with its own content
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
