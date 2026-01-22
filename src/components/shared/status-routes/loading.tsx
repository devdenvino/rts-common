import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

/**
 * Professional loading component with animations
 * Used during app initialization, authentication, and MFE transitions
 */
export function Loading({ 
  message = "Loading...", 
  fullScreen = true 
}: LoadingProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20"
    : "flex items-center justify-center min-h-[400px]";

  return (
    <div className={containerClasses}>
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-20"
            style={{
              background: `radial-gradient(circle, ${
                i === 0
                  ? "hsl(var(--primary))"
                  : i === 1
                    ? "hsl(var(--secondary))"
                    : "hsl(var(--accent))"
              }, transparent)`,
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Loading card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="relative z-10"
      >
        <Card className="p-8 shadow-2xl border-2 bg-card/95 backdrop-blur-sm min-w-[300px]">
          <div className="flex flex-col items-center gap-6">
            {/* Spinning loader icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Loader2 className="w-12 h-12 text-primary" />
            </motion.div>

            {/* Loading text with pulse animation */}
            <motion.div
              className="text-center space-y-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <h3 className="text-xl font-semibold text-foreground">
                {message}
              </h3>
              <p className="text-sm text-muted-foreground">
                Please wait a moment
              </p>
            </motion.div>

            {/* Animated progress dots */}
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

/**
 * Inline loading spinner for smaller loading states
 */
export function LoadingSpinner({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      className="inline-block"
    >
      <Loader2 className={`${sizeClasses[size]} text-primary`} />
    </motion.div>
  );
}

/**
 * Simple loading overlay for transitions
 */
export function LoadingOverlay({ message = "Loading..." }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </motion.div>
  );
}
