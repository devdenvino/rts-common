import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Link, useMatches } from "@tanstack/react-router"

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

function RouterBreadcrumb() {
  const matches = useMatches()

  const breadcrumbs = matches
    .filter((match) => match.id !== '__root__' && match.pathname !== '/')
    .flatMap((match) => {
      const context = match.context as any
      const staticData = match.staticData as any
      let breadcrumbDef =
        context?.breadcrumb || staticData?.breadcrumb || staticData?.title

      if (typeof breadcrumbDef === 'function') {
        breadcrumbDef = breadcrumbDef(match.params, match.loaderData)
      }

      if (Array.isArray(breadcrumbDef)) {
        return breadcrumbDef.map((item) => ({
          label: item.label,
          to: item.to,
          params: item.params,
        }))
      }

      let label = breadcrumbDef

      if (!label) {
        const routeIdParts = match.routeId.split('/')
        const lastPart = routeIdParts[routeIdParts.length - 1]

        if (lastPart.startsWith('$')) {
          const paramName = lastPart.slice(1)
          label = match.params[paramName as keyof typeof match.params]
        }

        if (!label) {
          const parts = match.pathname.replace(/\/$/, '').split('/')
          const lastPathPart = parts[parts.length - 1]
          label = lastPathPart
            ? lastPathPart.charAt(0).toUpperCase() + lastPathPart.slice(1)
            : 'Page'
        }
      }

      return [
        {
          label,
          to: match.pathname,
          params: match.params,
        },
      ]
    })

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.length > 0 && <BreadcrumbSeparator />}

        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1
          const isExternal = typeof item.to === 'string' && (item.to.startsWith('http') || item.to.startsWith('//'))

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast || !item.to ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : isExternal ? (
                  <BreadcrumbLink href={item.to}>
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.to} params={item.params}>
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  RouterBreadcrumb,
}
