import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { profiles, notifications, resources } from "@db/schema";
import { eq } from "drizzle-orm";
import { setupSessionAuth } from "./auth";

export function registerRoutes(app: Express): Server {
  // Setup session management
  setupSessionAuth(app);

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'healthy' });
  });

  // Profile management
  app.post('/api/profiles', async (req, res) => {
    try {
      const profile = await db.insert(profiles).values({
        ...req.body,
        pingPin: `PP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        createdAt: new Date(),
      }).returning();
      res.json(profile[0]);
    } catch (error) {
      console.error('Failed to create profile:', error);
      res.status(500).json({ error: 'Failed to create profile' });
    }
  });

  // Get current user's profile
  app.get('/api/profile', async (req, res) => {
    if (!req.session.pingPin) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    try {
      const [profile] = await db
        .select()
        .from(profiles)
        .where(eq(profiles.pingPin, req.session.pingPin))
        .limit(1);

      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }

      res.json(profile);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  });

  // Notification system
  app.post('/api/notifications', async (req, res) => {
    if (!req.session.pingPin) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    try {
      const notification = await db.insert(notifications).values({
        ...req.body,
        senderPingPin: req.session.pingPin,
        createdAt: new Date(),
      }).returning();
      res.json(notification[0]);
    } catch (error) {
      console.error('Failed to create notification:', error);
      res.status(500).json({ error: 'Failed to create notification' });
    }
  });

  app.get('/api/notifications/:pingPin', async (req, res) => {
    try {
      const userNotifications = await db
        .select()
        .from(notifications)
        .where(eq(notifications.recipientPingPin, req.params.pingPin))
        .orderBy(notifications.createdAt);

      res.json(userNotifications);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  });

  // Health resources
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