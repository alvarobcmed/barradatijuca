import { useAuth } from '../contexts/AuthContext';

type Permission = 'manage_stories' | 'manage_settings' | 'manage_users' | 'view_analytics';

export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = (permission: Permission): boolean => {
    // In development, grant all permissions
    if (process.env.NODE_ENV === 'development') {
      return true;
    }

    if (!user) return false;

    // For production, check user claims
    return true; // Temporarily grant all permissions until Firebase Custom Claims are set up
  };

  const can = {
    manageStories: hasPermission('manage_stories'),
    manageSettings: hasPermission('manage_settings'),
    manageUsers: hasPermission('manage_users'),
    viewAnalytics: hasPermission('view_analytics')
  };

  return { can, hasPermission };
}