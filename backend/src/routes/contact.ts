import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * Submit a contact form
 * POST /api/contact
 * Expects JSON body: { name, email, company, message, service_interest }
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, company, message, service_interest } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email, and message are required' });
    }
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        company,
        message,
        service_interest,
      },
    });
    res.status(201).json(submission);
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

/**
 * Get all contact submissions
 * GET /api/contact
 */
router.get('/', async (req, res) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { created_at: 'desc' }
    });
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
});

/**
 * Update a contact submission by ID
 * PUT /api/contact/:id
 * Expects JSON body with fields to update (e.g., status)
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, company, message, service_interest, status } = req.body;
    const existing = await prisma.contactSubmission.findUnique({ where: { id: Number(id) } });
    if (!existing) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }
    const updated = await prisma.contactSubmission.update({
      where: { id: Number(id) },
      data: { name, email, company, message, service_interest, status },
    });
    res.json(updated);
  } catch (error) {
    console.error('Error updating contact submission:', error);
    res.status(500).json({ error: 'Failed to update contact submission' });
  }
});

export default router; 