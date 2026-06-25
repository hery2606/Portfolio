import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'api-chat-proxy',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/chat' && req.method === 'POST') {
              const apiKey = env.CEREBRAS_API_KEY;
              if (!apiKey) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'CEREBRAS_API_KEY is not defined in .env' }));
                return;
              }

              // Membaca body request
              let body = '';
              req.on('data', chunk => {
                body += chunk;
              });

              req.on('end', async () => {
                try {
                  const { messages } = JSON.parse(body);

                  // Panggil API Cerebras
                  const upstreamResponse = await fetch('https://api.cerebras.ai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${apiKey}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      messages,
                      model: 'gpt-oss-120b',
                      max_tokens: 1024,
                      temperature: 0.35,
                      stream: true,
                    }),
                  });

                  if (!upstreamResponse.ok) {
                    res.statusCode = upstreamResponse.status;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Upstream error' }));
                    return;
                  }

                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'text/event-stream');
                  res.setHeader('Cache-Control', 'no-cache');
                  res.setHeader('Connection', 'keep-alive');

                  // Stream respons hulu ke browser
                  const reader = upstreamResponse.body.getReader();
                  const decoder = new TextDecoder();
                  while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    res.write(decoder.decode(value, { stream: true }));
                  }
                  res.end();
                } catch (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: err.message }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    envPrefix: ['VITE_', 'REACT_APP_'],
    build: {
      outDir: 'build',
      sourcemap: false,
    },
  };
});
