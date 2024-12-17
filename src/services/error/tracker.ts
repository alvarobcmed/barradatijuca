import { captureException } from './capture';

export interface ErrorDetails {
  code: string;
  message: string;
  timestamp: number;
  context?: Record<string, any>;
}

export class ErrorTracker {
  private static instance: ErrorTracker;
  private errors: ErrorDetails[] = [];
  private readonly MAX_ERRORS = 100;

  private constructor() {}

  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  trackError(error: Error, context?: Record<string, any>) {
    const errorDetails: ErrorDetails = {
      code: error.name,
      message: error.message,
      timestamp: Date.now(),
      context
    };

    this.errors.unshift(errorDetails);
    
    // Keep only last MAX_ERRORS
    if (this.errors.length > this.MAX_ERRORS) {
      this.errors = this.errors.slice(0, this.MAX_ERRORS);
    }

    // Save to localStorage for persistence
    this.persistErrors();

    // Capture for monitoring
    captureException(error, context);

    return errorDetails;
  }

  getErrors(): ErrorDetails[] {
    return this.errors;
  }

  clearErrors() {
    this.errors = [];
    this.persistErrors();
  }

  private persistErrors() {
    try {
      localStorage.setItem('error_log', JSON.stringify(this.errors));
    } catch (e) {
      console.error('Failed to persist errors:', e);
    }
  }

  private loadPersistedErrors() {
    try {
      const saved = localStorage.getItem('error_log');
      if (saved) {
        this.errors = JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load persisted errors:', e);
    }
  }
}

export const errorTracker = ErrorTracker.getInstance();