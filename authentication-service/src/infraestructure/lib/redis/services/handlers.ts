import configureRedis from "../redis.conf";

interface RedisLogEvent {
  timestamp: string;
  service: string;
  database?: number;
  details?: unknown;
}

const createLogEvent = (details?: unknown): RedisLogEvent => ({
  timestamp: new Date().toISOString(),
  service: "Redis",
  database: configureRedis.options?.database,
  details,
});

export const handleError = (err: Error) => {
  console.error(
    "[Redis Error]",
    createLogEvent({
      message: err.message,
      stack: err.stack,
    })
  );
};

export const handleConnect = () => {
  console.info("[Redis Connected]", createLogEvent());
};

export const handleReady = () => {
  console.info("[Redis Ready]", createLogEvent());
};

export const handleEnd = () => {
  console.warn("[Redis Disconnected]", createLogEvent());
};
