import { fetchLeetCodeStats } from './_leetcode-core.js'

export default async function handler(req, res) {
  const username = req.query.username
  if (!username || !/^[\w-]{1,30}$/.test(username)) {
    return res.status(400).json({ error: 'Invalid username' })
  }

  try {
    const result = await fetchLeetCodeStats(username)
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
    return res.status(200).json(result)
  } catch (err) {
    const status = err.message === 'User not found' ? 404 : 502
    return res.status(status).json({ error: err.message })
  }
}
