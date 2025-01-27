import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { profiles, notifications, resources } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Profile routes
  app.post('/api/profiles', async (req, res) => {
    try {
      const profile = await db.insert(profiles).values(req.body).returning();
      res.json(profile[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create profile' });
    }
  });

  app.get('/api/profiles/:pingPin', async (req, res) => {
    try {
      const [profile] = await db
        .select()
        .from(profiles)
        .where(eq(profiles.pingPin, req.params.pingPin))
        .limit(1);
      
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  });

  // Notification routes
  app.post('/api/notifications', async (req, res) => {
    try {
      const notification = await db.insert(notifications).values(req.body).returning();
      res.json(notification[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send notification' });
    }
  });

  app.get('/api/notifications/:pingPin', async (req, res) => {
    try {
      const userNotifications = await db
        .select()
        .from(notifications)
        .where(eq(notifications.recipientPingPin, req.params.pingPin));
      
      res.json(userNotifications);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  });

  // Resources routes
  app.get('/api/resources', async (req, res) => {
    try {
      const allResources = await db.select().from(resources);
      res.json(allResources);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch resources' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
