import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * Get all published case studies
 * GET /api/case-studies
 */
router.get('/', async (req, res) => {
  try {
    const studies = await prisma.caseStudy.findMany({
      where: { published: true },
      orderBy: { created_at: 'desc' }
    });
    res.json(studies);
  } catch (error) {
    console.error('Error fetching case studies:', error);
    res.status(500).json({ error: 'Failed to fetch case studies' });
  }
});

/**
 * Get a single case study by slug
 * GET /api/case-studies/:slug
 */
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const study = await prisma.caseStudy.findUnique({ where: { slug } });
    if (!study) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    res.json(study);
  } catch (error) {
    console.error('Error fetching case study:', error);
    res.status(500).json({ error: 'Failed to fetch case study' });
  }
});

/**
 * Create a new case study
 * POST /api/case-studies
 * Expects JSON body: { title, slug, description, client_name, industry, technologies, results, published }
 */
router.post('/', async (req, res) => {
  try {
    const { title, slug, description, client_name, industry, technologies, results, published } = req.body;
    if (!title || !slug || !description) {
      return res.status(400).json({ error: 'title, slug, and description are required' });
    }
    const newStudy = await prisma.caseStudy.create({
      data: {
        title,
        slug,
        description,
        client_name,
        industry,
        technologies,
        results,
        published: published ?? false,
      },
    });
    res.status(201).json(newStudy);
  } catch (error) {
    console.error('Error creating case study:', error);
    res.status(500).json({ error: 'Failed to create case study' });
  }
});

/**
 * Update a case study by ID
 * PUT /api/case-studies/:id
 * Expects JSON body with fields to update
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, description, client_name, industry, technologies, results, published } = req.body;
    const existing = await prisma.caseStudy.findUnique({ where: { id: Number(id) } });
    if (!existing) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    const updated = await prisma.caseStudy.update({
      where: { id: Number(id) },
      data: { title, slug, description, client_name, industry, technologies, results, published },
    });
    res.json(updated);
  } catch (error) {
    console.error('Error updating case study:', error);
    res.status(500).json({ error: 'Failed to update case study' });
  }
});

/**
 * Delete a case study by ID
 * DELETE /api/case-studies/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.caseStudy.findUnique({ where: { id: Number(id) } });
    if (!existing) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    await prisma.caseStudy.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting case study:', error);
    res.status(500).json({ error: 'Failed to delete case study' });
  }
});

export default router; 