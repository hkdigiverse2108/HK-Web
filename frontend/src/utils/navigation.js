// Navigation utility to support clean HTML5 path routing with legacy hash fallback

export function normalizePath(input) {
  if (!input) return '/';
  let path = input.trim();
  
  // If preview mode, leave hash intact
  if (path.startsWith('#preview')) return path;

  // Convert hash to clean path
  if (path.startsWith('#')) {
    path = path.replace('#', '');
  }

  // Ensure leading slash
  if (!path.startsWith('/') && !path.startsWith('http')) {
    path = '/' + path;
  }

  return path;
}

export function navigateTo(targetPath) {
  const cleanPath = normalizePath(targetPath);
  
  if (cleanPath.startsWith('#preview')) {
    window.location.hash = cleanPath;
  } else {
    if (window.location.pathname !== cleanPath) {
      window.history.pushState(null, '', cleanPath);
      window.dispatchEvent(new Event('popstate'));
    }
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
}
