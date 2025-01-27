import session from "express-session";
import createMemoryStore from "memorystore";
import { type Express } from "express";

// Extend the session type definition
declare module 'express-session' {
  interface SessionData {
    views: number;
    userId?: number;
  }
}

export function setupSessionAuth(app: Express) {
  const MemoryStore = createMemoryStore(session);
  const sessionSettings: session.SessionOptions = {
    secret: process.env.REPL_ID || "flingping-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: app.get("env") === "production",
      sameSite: "lax"
    },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    })
  };

  if (app.get("env") === "production") {
    app.set("trust proxy", 1);
  }

  app.use(session(sessionSettings));
}