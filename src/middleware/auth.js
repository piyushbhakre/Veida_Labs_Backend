const { createClient } = require('@supabase/supabase-js')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized - No token provided" })
  }

  const token = authHeader.replace('Bearer ', '')

  const supabaseAuth = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
    {
      global: {
        headers: {
          Authorization: authHeader
        }
      }
    }
  )

  const { data: { user }, error } = await supabaseAuth.auth.getUser(token)
  
  if (error || !user) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }

  req.user = user
  req.supabaseAuth = supabaseAuth
  next()
}

module.exports = authMiddleware