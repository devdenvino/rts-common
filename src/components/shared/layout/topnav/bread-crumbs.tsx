import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/custom/breadcrumb';
import { Link, useMatches } from '@tanstack/react-router';
import React from 'react';

interface CrumbData {
  to?: string;
  label?: string;
}

interface MatchStaticData {
  crumb?: CrumbData;
  activeCrumb?: string;
}

interface RouteMatch {
  id: string;
  staticData: MatchStaticData;
}

const getBreadCrumb = (matches: RouteMatch[]) => {
  const crumbs = matches.map((match: RouteMatch) => {
    return (
      match.staticData.crumb && (
        <>
          <BreadcrumbItem key={match.id}>
            {match.staticData.crumb?.to ? (
              <>
                <Link
                  to={match.staticData.crumb?.to}
                  className='transition-colors hover:text-foreground'
                >
                  {match.staticData.crumb?.label}
                </Link>
              </>
            ) : (
              <div style={{ cursor: 'default' }}>
                {match.staticData.crumb?.label}
              </div>
            )}
          </BreadcrumbItem>
        </>
      )
    );
  });
  if (
    matches.length > 0 &&
    matches[matches.length - 1].staticData?.activeCrumb
  ) {
    const lastMatch = matches[matches.length - 1];
    crumbs.push(
      <div style={{ cursor: 'default' }}>
        {lastMatch.staticData?.activeCrumb}
      </div>
    );
  }
  return crumbs.filter((crumb: React.ReactElement | false | undefined) => crumb !== undefined && crumb !== false);
};

export function Breadcrumbs() {
  const matches = useMatches() as RouteMatch[];
  const breadCrumbs = getBreadCrumb(matches);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadCrumbs.length > 0 && (
          <>
            <BreadcrumbItem>
              <Link
                to={'/'}
                className='transition-colors hover:text-foreground'
              >
                Home
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {breadCrumbs.map((crumb: React.ReactNode, ix: number) => (
              <React.Fragment key={ix}>
                {crumb}
                {ix < breadCrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
