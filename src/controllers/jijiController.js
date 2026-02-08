const resourceService = require('../services/resourceService')

const askJiji = async (req, res) => {
  const { query } = req.body
  const user = req.user
  const supabaseAuth = req.supabaseAuth

  if (!query || query.length < 3) {
    return res.status(400).json({ error: "Invalid query - must be at least 3 characters" })
  }

  await resourceService.logQuery(supabaseAuth, user.id, query)

  const resource = await resourceService.searchResources(supabaseAuth, query)

  if (!resource) {
    return res.json({
      answer: "No content found — mock AI fallback answer for your query",
      resources: null
    })
  }

  res.json({
    answer: resource.answer,
    bullet_points: resource.key_points || [], 
    resources: {
      ppt: resource.ppt_url,
      video: resource.video_url
    }
  })
}

module.exports = { askJiji }