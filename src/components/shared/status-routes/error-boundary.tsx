import { motion } from "motion/react";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { useRouter } from "@tanstack/react-router";
import {
  containerAnimation,
  itemAnimation,
  iconAnimation,
  pulseAnimation,
  buttonAnimation,
  detailsAnimation,
  createStaggeredListItem,
  backgroundContainerAnimation,
  defaultBlobConfigs,
  createBlobAnimation,
  createParticleAnimation,
  rotateAnimation,
  expandAnimation,
  cardHoverAnimation,
} from "../../../lib/animations";

interface ErrorBoundaryProps {
  error: Error & {
    status?: number;
    statusText?: string;
    errorType?: string;
    traceback?: string;
    data?: any;
  };
  reset?: () => void;
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const router = useRouter();

  const handleGoHome = () => {
    router.navigate({ to: "/" });
  };

  const handleReset = () => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };

  console.error("ErrorBoundary caught an error:", error);

  // Extract error details from data object first, then fall back to error properties
  const errorMessage = error.data?.error_message || error.data?.message || error.message || "An unknown error occurred";
  const errorType = error.data?.error_type || error.errorType;
  const traceback = error.data?.traceback || error.traceback;
  const statusCode = error.status;
  const statusText = error.statusText;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-linear-to-br from-background via-background to-muted/20 p-4 overflow-auto">
      <motion.div
        {...containerAnimation}
        className="w-full max-w-2xl relative"
      >
        <Card className="border-destructive/50 shadow-2xl backdrop-blur-sm bg-background/95 overflow-hidden">
          <CardHeader className="space-y-6 text-center relative">
            <motion.div
              {...iconAnimation}
              animate={pulseAnimation}
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-destructive/20 to-destructive/5 shadow-lg backdrop-blur-sm ring-4 ring-destructive/10"
            >
              <AlertTriangle className="h-12 w-12 text-destructive drop-shadow-lg" />
            </motion.div>
            <motion.div {...itemAnimation}>
              <CardTitle className="text-3xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
                Oops! Something went wrong
              </CardTitle>
              <CardDescription className="mt-3 text-base leading-relaxed">
                We encountered an unexpected error. Don't worry, we're on it!
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-5">
            <motion.div
              {...detailsAnimation}
              transition={{ delay: 0.3 }}
              className="rounded-lg border bg-muted/50 p-5 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="mb-3 font-semibold text-destructive flex items-center gap-2">
                Error Details:
                {statusCode && (
                  <span className="ml-auto text-xs px-2 py-1 rounded-md bg-destructive/10 text-destructive">
                    {statusCode} {statusText}
                  </span>
                )}
              </h3>
              
              {errorType && (
                <div className="mb-3 flex items-center gap-2 text-xs">
                  <span className="font-semibold text-muted-foreground">Type:</span>
                  <span className="px-2 py-1 rounded-md bg-destructive/10 text-destructive font-mono">
                    {errorType}
                  </span>
                </div>
              )}
              
              <p className="font-mono text-sm text-muted-foreground wrap-break-word leading-relaxed">
                {errorMessage}
              </p>
              
              {traceback && (
                <motion.details 
                  className="mt-4"
                  {...cardHoverAnimation}
                >
                  <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors py-2 px-3 rounded-md hover:bg-muted/50">
                    📋 View API traceback
                  </summary>
                  <motion.pre
                    {...expandAnimation}
                    className="mt-3 overflow-auto rounded-md bg-background p-4 text-xs border shadow-inner max-h-96"
                  >
                    {traceback}
                  </motion.pre>
                </motion.details>
              )}
              
              {error.stack && (
                <motion.details 
                  className="mt-4"
                  {...cardHoverAnimation}
                >
                  <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors py-2 px-3 rounded-md hover:bg-muted/50">
                    📋 View stack trace
                  </summary>
                  <motion.pre
                    {...expandAnimation}
                    className="mt-3 overflow-auto rounded-md bg-background p-4 text-xs border shadow-inner max-h-96"
                  >
                    {error.stack}
                  </motion.pre>
                </motion.details>
              )}
            </motion.div>

            <motion.div
              {...detailsAnimation}
              transition={{ delay: 0.4 }}
              className="rounded-lg border bg-linear-to-br from-accent/40 to-accent/20 p-5 backdrop-blur-sm shadow-sm"
            >
              <h4 className="mb-3 font-semibold flex items-center gap-2">
                💡 What you can do:
              </h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {[
                  "Try refreshing the page",
                  "Go back to the home page",
                  "Contact support if the problem persists"
                ].map((text, index) => (
                  <motion.li
                    key={index}
                    {...createStaggeredListItem(index, 0.5)}
                    className="flex items-center gap-3 group"
                  >
                    <motion.span
                      className="h-2 w-2 rounded-full bg-primary"
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                    <span className="group-hover:text-foreground transition-colors">
                      {text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 sm:flex-row pt-6">
            <motion.div
              {...buttonAnimation}
              transition={{ delay: 0.6 }}
              className="w-full sm:flex-1"
            >
              <Button
                onClick={handleReset}
                variant="default"
                className="w-full gap-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <motion.div {...rotateAnimation}>
                  <RefreshCcw className="h-4 w-4" />
                </motion.div>
                Try Again
              </Button>
            </motion.div>
            <motion.div
              {...buttonAnimation}
              transition={{ delay: 0.7 }}
              className="w-full sm:flex-1"
            >
              <Button
                onClick={handleGoHome}
                variant="outline"
                className="w-full gap-2 hover:bg-muted/50 transition-all"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Professional animated background elements */}
      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-60"
        {...backgroundContainerAnimation}
      >
        {defaultBlobConfigs.map((config, i) => (
          <motion.div
            key={i}
            className={`absolute ${config.size} rounded-full blur-3xl`}
            style={{
              background: `radial-gradient(circle, hsl(var(--destructive) / 0.15) 0%, hsl(var(--destructive) / 0.05) 50%, transparent 100%)`,
              left: `${20 + i * 25}%`,
              top: `${15 + i * 20}%`,
            }}
            {...createBlobAnimation(config, i)}
          />
        ))}
        
        {/* Subtle floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute h-2 w-2 rounded-full bg-destructive/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            {...createParticleAnimation(i)}
          />
        ))}
      </motion.div>
    </div>
  );
}
