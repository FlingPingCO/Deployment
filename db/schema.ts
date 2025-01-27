import { pgTable, text, serial, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Anonymous user profiles
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  pingPin: text("ping_pin").unique().notNull(),
  healthStatus: jsonb("health_status"),
  preferences: jsonb("preferences"),
  tutorialComplete: boolean("tutorial_complete").default(false),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Anonymous notifications
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  senderPingPin: text("sender_ping_pin").notNull(),
  recipientPingPin: text("recipient_ping_pin").notNull(),
  type: text("type").notNull(), // exposure, test_result, etc.
  content: jsonb("content"),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Health resources and educational content
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Achievement tracking
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  profileId: text("profile_id").notNull(),
  type: text("type").notNull(),
  earnedAt: timestamp("earned_at").defaultNow(),
});

export const insertProfileSchema = createInsertSchema(profiles);
export const selectProfileSchema = createSelectSchema(profiles);
export const insertNotificationSchema = createInsertSchema(notifications);
export const selectNotificationSchema = createSelectSchema(notifications);

export type Profile = typeof profiles.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type Resource = typeof resources.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;