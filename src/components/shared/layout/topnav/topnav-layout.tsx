import { useAuth } from 'react-oidc-context';
import { AnonymousHeader, AutheticatedHeader } from '.';
import Footer from '../footer';
import type { AppLayoutProps } from '../app-layout';

export interface TopNavLayoutProps extends AppLayoutProps {}

export default function TopNavLayout({
  children,
  sidebarProps,
  showBreadcrumbs = true,
  ...props
}: TopNavLayoutProps) {
  const auth = useAuth();
  
  // Combine sidebarProps and other props if needed, or pass separately used props
  // AutheticatedHeader takes TopNavBarProps which extends Sidebar + IAppSwitcher
  
  return (
    <div className='flex flex-col h-screen bg-white dark:bg-black text-gray-900 dark:text-white'>
      <div className='sticky top-0 z-50 bg-white dark:bg-black'>
        {auth.isAuthenticated ? (
          <AutheticatedHeader showBreadcrumbs={showBreadcrumbs} {...sidebarProps} {...props} />
        ) : (
          <AnonymousHeader {...sidebarProps} />
        )}
      </div>
      <div className='flex-1 overflow-y-auto md:mr-2 md:ml-2'>
        <div className='flex flex-col gap-4 p-4'>{children}</div>
      </div>
      <div className='sticky bottom-0 z-50 bg-white dark:bg-black'>
        <Footer />
      </div>
    </div>
  );
}
