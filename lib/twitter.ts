// lib/twitter.ts
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

export const twitterOAuth = new OAuth({
  consumer: {
    key: process.env.X_API_KEY!,
    secret: process.env.X_API_SECRET_KEY!,
  },
  signature_method: 'HMAC-SHA1',
  hash_function(baseString, key) {
    return crypto.createHmac('sha1', key).update(baseString).digest('base64');
  },
});
