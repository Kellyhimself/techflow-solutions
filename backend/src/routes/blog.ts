import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * Get all published blog posts
 * GET /api/blog
 */
router.get('/', async (req, res) => {
  try {
    // Fetch all published blog posts, ordered by published_at descending
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { published_at: 'desc' }
    });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

/**
 * Create a new blog post
 * POST /api/blog
 * Expects JSON body: { title, slug, content, excerpt (optional), published (optional), author_id (optional) }
 */
router.post('/', async (req, res) => {
  try {
    const { title, slug, content, excerpt, published, author_id } = req.body;

    // Basic input validation
    if (!title || !slug || !content) {
      return res.status(400).json({ error: 'title, slug, and content are required' });
    }

    // Create the blog post in the database
    const newPost = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        published: published ?? false,
        author_id,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

/**
 * Get a single blog post by slug
 * GET /api/blog/:slug
 */
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

/**
 * Update a blog post by ID
 * PUT /api/blog/:id
 * Expects JSON body with fields to update
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, content, excerpt, published, author_id } = req.body;

    // Check if post exists
    const existing = await prisma.blogPost.findUnique({ where: { id: Number(id) } });
    if (!existing) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Update the blog post
    const updated = await prisma.blogPost.update({
      where: { id: Number(id) },
      data: { title, slug, content, excerpt, published, author_id },
    });
    res.json(updated);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

/**
 * Delete a blog post by ID
 * DELETE /api/blog/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Check if post exists
    const existing = await prisma.blogPost.findUnique({ where: { id: Number(id) } });
    if (!existing) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    await prisma.blogPost.delete({ where: { id: Number(id) } });
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

export default router; 