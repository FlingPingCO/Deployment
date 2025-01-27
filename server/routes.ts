import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { profiles, notifications, resources, achievements } from "@db/schema";
import { eq, sql } from "drizzle-orm";
import { generateNotification } from "./services/ai-notification";

export function registerRoutes(app: Express): Server {
  // Profile routes
  app.get('/api/profile', async (req, res) => {
    try {
      const [profile] = await db
        .select()
        .from(profiles)
        .where(eq(profiles.pingPin, 'ADMIN123'))
        .limit(1);

      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  });

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
  app.post('/api/notifications/generate', async (req, res) => {
    try {
      const { type, context } = req.body;
      const message = await generateNotification(type, context);
      res.json({ message });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate notification' });
    }
  });

  app.post('/api/notifications', async (req, res) => {
    try {
      const { type, senderPingPin, context } = req.body;

      // TODO: In a real implementation, this would query the Bluetooth proximity
      // database to find recent contacts. For now, we'll just create a notification
      // that will be visible to the sender.

      // Generate AI message
      const content = await generateNotification(type, context);

      const notification = await db.insert(notifications).values({
        type,
        recipientPingPin: senderPingPin, // For now, just show to sender
        senderPingPin: 'SYSTEM', // Mark as system notification
        content: { message: content },
        read: false,
      }).returning();

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

  // Analytics routes
  app.get('/api/analytics/overview', async (req, res) => {
    try {
      const [userStats] = await db
        .select({
          totalUsers: sql<number>`count(*)`,
          activeUsers: sql<number>`count(*) filter (where updated_at > now() - interval '30 days')`,
        })
        .from(profiles);

      const [notificationStats] = await db
        .select({
          totalNotifications: sql<number>`count(*)`,
          recentNotifications: sql<number>`count(*) filter (where created_at > now() - interval '30 days')`,
        })
        .from(notifications);

      const [achievementStats] = await db
        .select({
          totalAchievements: sql<number>`count(*)`,
        })
        .from(achievements);

      res.json({
        users: {
          total: userStats.totalUsers,
          active: userStats.activeUsers,
          growth: ((userStats.activeUsers / userStats.totalUsers) * 100).toFixed(1),
        },
        notifications: {
          total: notificationStats.totalNotifications,
          recent: notificationStats.recentNotifications,
          growth: ((notificationStats.recentNotifications / notificationStats.totalNotifications) * 100).toFixed(1),
        },
        achievements: {
          total: achievementStats.totalAchievements,
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch analytics overview' });
    }
  });

  app.get('/api/analytics/trends', async (req, res) => {
    try {
      const notificationTrends = await db.execute(sql`
        SELECT date_trunc('day', created_at) as date,
               count(*) as count
        FROM notifications
        WHERE created_at > now() - interval '30 days'
        GROUP BY date_trunc('day', created_at)
        ORDER BY date ASC
      `);

      res.json({
        notifications: notificationTrends.rows,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch analytics trends' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}