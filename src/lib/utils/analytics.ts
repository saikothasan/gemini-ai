// Simple analytics tracking
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (process.env.NODE_ENV === 'production') {
    try {
      console.log('Analytics event:', eventName, properties);
      // Add your analytics implementation here
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }
}