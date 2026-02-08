const logQuery = async (supabaseAuth, userId, query) => {
  const { error } = await supabaseAuth
    .from('queries')
    .insert({ 
      user_id: userId, 
      query: query 
    })

  if (error) {
    console.error('Query insert error:', error)
  }
}

const searchResources = async (supabaseAuth, query) => {
  const { data, error } = await supabaseAuth
    .from('resources')
    .select('*')
    .ilike('topic', `%${query}%`)
    .limit(1)

  if (error) {
    console.error('Resource fetch error:', error)
    return null
  }

  return data && data.length > 0 ? data[0] : null
}

module.exports = { logQuery, searchResources }