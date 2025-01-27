import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { profiles, notifications, resources } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'healthy' });
  });

  // Beta version simplified endpoints
  app.get('/api/profile', async (req, res) => {
    // For beta, return a demo profile
    res.json({
      id: 1,
      pingPin: "PP-DEMO-1234",
      healthStatus: { status: "healthy" },
      preferences: {},
      isAdmin: false,
    });
  });

  // Simplified notifications endpoint for beta
  app.get('/api/notifications/:pingPin', async (req, res) => {
    // Return demo notifications
    res.json([
      {
        id: 1,
        type: "info",
        content: {
          message: "Welcome to FlingPing Beta! This is a demo notification."
        },
        createdAt: new Date(),
      }
    ]);
  });

  // Health resources - this can stay as is since it's public
  app.get('/api/resources', async (req, res) => {
    try {
      const allResources = await db.select().from(resources);
      res.json(allResources);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
      res.status(500).json({ error: 'Failed to fetch resources' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}