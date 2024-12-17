interface ErrorContext {
  userId?: string;
  action?: string;
  [key: string]: any;
}

export function captureException(error: Error, context?: ErrorContext) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error captured:', {
      error,
      context,
      stack: error.stack
    });
    return;
  }

  // In production, send to monitoring service
  const errorData = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent
  };

  // Send to monitoring endpoint
  fetch('https://api.stry.live/monitoring/error', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(errorData)
  }).catch(err => {
    console.error('Failed to send error to monitoring:', err);
  });
}