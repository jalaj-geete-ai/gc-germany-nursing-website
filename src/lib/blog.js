import { db } from './supabase';

// List published posts (newest first) for the /blog index.
export async function fetchPosts() {
  const { data, error } = await db
    .from('blog_posts')
    .select('slug, title, excerpt, category, author, icon, accent, read_minutes, published_at')
    .eq('published', true)
    .order('published_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

// Fetch a single published post by slug for /blog/:slug.
export async function fetchPost(slug) {
  const { data, error } = await db
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  if (error) throw error;
  return data;
}
