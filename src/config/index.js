const dotenv = require('dotenv');
const z = require('zod');
dotenv.config();

const configValidationSchema = z.object({
  mode: z.enum(['development', 'production']).default('development'),
  port: z.string().regex(/^\d+$/).transform(Number).default(3000),
  mongodbUri: z.string().url(),
  jwtSecret: z.string().min(32),
});

const config = configValidationSchema.parse({
  mode: process.env.NODE_ENV,
  port: process.env.PORT,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
});

module.exports = config;