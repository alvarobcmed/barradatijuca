import { Stripe } from 'stripe';

const stripe = new Stripe('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', {
  apiVersion: '2023-10-16',
});

export async function configureEmailSettings() {
  try {
    // Configure branding settings
    await stripe.accounts.update('acct_1QWgfZBQdvoI5uL0', {
      settings: {
        branding: {
          logo: 'https://stry.live/logo.png',
          icon: 'https://stry.live/favicon.png',
          primary_color: '#6B0F6C',
          secondary_color: '#FF0A7B'
        },
        emails: {
          enabled: true,
          from_name: 'Stry Live',
          from_address: 'contato@stry.live',
          reply_to: 'suporte@stry.live',
          footer: {
            social_links: {
              twitter: 'https://twitter.com/strylive',
              facebook: 'https://facebook.com/strylive',
              instagram: 'https://instagram.com/strylive'
            },
            business_name: 'Stry Live',
            business_address: {
              line1: 'Rua Exemplo, 123',
              line2: 'Sala 45',
              city: 'São Paulo',
              state: 'SP',
              postal_code: '01234-567',
              country: 'BR'
            }
          }
        }
      }
    });

    // Configure email templates
    await stripe.accounts.update('acct_1QWgfZBQdvoI5uL0', {
      settings: {
        payments: {
          statement_descriptor: 'STRY LIVE',
          statement_descriptor_kana: null,
          statement_descriptor_kanji: null
        }
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Error configuring email settings:', error);
    throw error;
  }
}

export async function verifyEmailDomain() {
  try {
    // Verify domain ownership
    const verification = await stripe.accounts.createLoginLink('acct_1QWgfZBQdvoI5uL0', {
      collect: 'eventually_due'
    });

    return {
      success: true,
      verificationUrl: verification.url
    };
  } catch (error) {
    console.error('Error verifying email domain:', error);
    throw error;
  }
}