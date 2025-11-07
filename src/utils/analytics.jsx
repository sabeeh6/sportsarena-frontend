import ReactGA from 'react-ga4';

// Initialize GA4
export const initGA = () => {
  const GA_MEASUREMENT_ID = "G-CXCDSHS6N2";
  
  if (!GA_MEASUREMENT_ID) {
    console.warn('GA Measurement ID not found');
    return;
  }

  ReactGA.initialize(GA_MEASUREMENT_ID, {
    gaOptions: {
      send_page_view: false, // Manual page view tracking
    },
    gtagOptions: {
      anonymize_ip: true, // GDPR compliance
      cookie_flags: 'SameSite=None;Secure',
    },
  });

  console.log('Google Analytics initialized');
};
// Track Page Views
export const trackPageView = (path, title) => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title,
  });
};
// Track Events (Button clicks, etc.)
export const trackEvent = (category, action, label = '', value = 0) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};
// Track Button Clicks
export const trackButtonClick = (buttonName, location) => {
  trackEvent('Button', 'Click', `${buttonName} - ${location}`);
};
// Track Form Submissions
export const trackFormSubmit = (formName, success = true) => {
  trackEvent('Form', success ? 'Submit Success' : 'Submit Failed', formName);
};
// Track Custom Events
export const trackCustomEvent = (eventName, params = {}) => {
  ReactGA.event(eventName, params);
};
// Track Scroll Depth
export const trackScrollDepth = (percentage) => {
  trackEvent('Scroll', 'Depth', `${percentage}%`, percentage);
};
// Track File Downloads
export const trackDownload = (fileName, fileType) => {
  trackEvent('Download', 'File', `${fileName} (${fileType})`);
};
// Track Outbound Links
export const trackOutboundLink = (url) => {
  trackEvent('Outbound Link', 'Click', url);
};
// Track Search
export const trackSearch = (searchTerm) => {
  trackEvent('Search', 'Query', searchTerm);
};
// Track Video
export const trackVideo = (action, videoName) => {
  trackEvent('Video', action, videoName);
};
// Track Errors
export const trackError = (errorMessage, errorType = 'JavaScript Error') => {
  trackEvent('Error', errorType, errorMessage);
};
// Track User Timing
export const trackTiming = (category, variable, value, label) => {
  ReactGA.timing({
    category,
    variable,
    value,
    label,
  });
};
// Set User Properties
export const setUserProperties = (userId, properties = {}) => {
  ReactGA.set({
    userId,
    ...properties,
  });
};