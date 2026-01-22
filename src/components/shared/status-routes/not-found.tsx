import { motion } from "motion/react";
import { FileQuestion, Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { useRouter } from "@tanstack/react-router";
import {
  containerAnimation,
  itemAnimation,
  iconAnimation,
  floatAnimation,
  buttonAnimation,
  detailsAnimation,
  createStaggeredListItem,
  digitAnimation,
  expandAnimation,
  withDelay,
} from "../../../lib/animations";

interface NotFoundProps {
  data?: unknown;
}

export function NotFound({ data }: NotFoundProps) {
  const router = useRouter();

  const handleGoHome = () => {
    router.navigate({ to: "/" });
  };

  const handleGoBack = () => {
    router.history.back();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4 overflow-auto">
      <motion.div
        {...containerAnimation}
        className="w-full max-w-2xl relative"
      >
        <Card className="shadow-2xl backdrop-blur-sm bg-background/95 overflow-hidden">
          <CardHeader className="space-y-6 text-center relative">
            <motion.div
              {...iconAnimation}
              animate={floatAnimation}
              className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg backdrop-blur-sm ring-4 ring-primary/10"
            >
              <FileQuestion className="h-12 w-12 text-primary drop-shadow-lg" />
            </motion.div>

            <motion.div {...itemAnimation}>
              <CardTitle className="text-8xl font-bold tracking-tight">
                <motion.span
                  {...digitAnimation.left}
                  {...withDelay(0.3)}
                  className="inline-block"
                >
                  4
                </motion.span>
                <motion.span
                  {...digitAnimation.center}
                  {...withDelay(0.4)}
                  className="inline-block text-primary"
                >
                  0
                </motion.span>
                <motion.span
                  {...digitAnimation.right}
                  {...withDelay(0.5)}
                  className="inline-block"
                >
                  4
                </motion.span>
              </CardTitle>

              <CardDescription className="mt-4 text-lg leading-relaxed">
                Page Not Found
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-5">
            <motion.div
              {...detailsAnimation}
              {...withDelay(0.3)}
              className="text-center"
            >
              <p className="text-muted-foreground leading-relaxed">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </motion.div>

            <motion.div
              {...detailsAnimation}
              {...withDelay(0.4)}
              className="rounded-lg border bg-gradient-to-br from-accent/40 to-accent/20 p-5 backdrop-blur-sm shadow-sm"
            >
              <div className="flex items-start gap-3">
                <Search className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-3 flex-1">
                  <h4 className="font-semibold flex items-center gap-2">
                    💡 What you can try:
                  </h4>
                  <ul className="space-y-2.5 text-sm text-muted-foreground">
                    {[
                      "Check the URL for typos",
                      "Return to the previous page",
                      "Start fresh from the home page"
                    ].map((text, index) => (
                      <motion.li
                        key={index}
                        {...createStaggeredListItem(index, 0.6)}
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
                </div>
              </div>
            </motion.div>

            {data !== undefined && data !== null && (
              <motion.div
                {...detailsAnimation}
                {...withDelay(0.5)}
                className="rounded-lg border bg-muted/50 p-5 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <details>
                  <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 px-3 rounded-md hover:bg-muted/50">
                    📋 Additional information
                  </summary>
                  <motion.pre
                    {...expandAnimation}
                    className="mt-3 overflow-auto rounded-md bg-background p-4 text-xs border shadow-inner"
                  >
                    {JSON.stringify(data, null, 2)}
                  </motion.pre>
                </details>
              </motion.div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-3 sm:flex-row pt-6">
            <motion.div
              {...buttonAnimation}
              {...withDelay(0.6)}
              className="w-full sm:flex-1"
            >
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="w-full gap-2 hover:bg-muted/50 transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </motion.div>
            <motion.div
              {...buttonAnimation}
              {...withDelay(0.7)}
              className="w-full sm:flex-1"
            >
              <Button
                onClick={handleGoHome}
                variant="default"
                className="w-full gap-2 shadow-lg hover:shadow-xl transition-shadow"
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      >
        {[
          { size: "h-[500px] w-[500px]", duration: 20, delay: 0, left: 20, top: 15 },
          { size: "h-[400px] w-[400px]", duration: 25, delay: 2, left: 45, top: 35 },
          { size: "h-[450px] w-[450px]", duration: 22, delay: 4, left: 70, top: 55 },
        ].map((config, i) => (
          <motion.div
            key={i}
            className={`absolute ${config.size} rounded-full blur-3xl`}
            style={{
              background: `radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.05) 50%, transparent 100%)`,
              left: `${config.left}%`,
              top: `${config.top}%`,
            }}
            animate={{
              x: [0, 50 + i * 20, -30, 0],
              y: [0, -40 + i * 15, 50, 0],
              scale: [1, 1.15, 0.95, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: config.duration,
              delay: config.delay,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1] as const,
            }}
          />
        ))}
        
        {/* Subtle floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute h-2 w-2 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
