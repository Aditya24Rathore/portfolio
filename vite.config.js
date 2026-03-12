import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fetchLeetCodeStats } from './api/_leetcode-core.js'

function leetcodeDevApi() {
  return {
    name: 'leetcode-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/leetcode', async (req, res) => {
        const url = new URL(req.url, 'http://localhost')
        const username = url.searchParams.get('username')
        if (!username || !/^[\w-]{1,30}$/.test(username)) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify({ error: 'Invalid username' }))
        }
        try {
          const data = await fetchLeetCodeStats(username)
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(data))
        } catch {
          res.writeHead(502, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Failed to fetch LeetCode data' }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), leetcodeDevApi()],
})
