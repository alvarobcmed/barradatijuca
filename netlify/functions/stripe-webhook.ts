import { Handler } from '@netlify/functions';
import { handleWebhook } from '../../src/services/stripe/webhook';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method not allowed'
    };
  }

  try {
    const response = await handleWebhook(
      new Request(event.rawUrl, {
        method: event.httpMethod,
        headers: event.headers as any,
        body: event.body
      })
    );

    const responseData = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(responseData),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
}