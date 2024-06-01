const allowedOrigins = [
  'http://localhost:5173'
]

export const corsMiddleware = () => {
  return (req, res, next) => {
    const origin = req.header('Origin')

    if (allowedOrigins.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
    }

    res.header('Access-Control-Allow-Methods', 'POST,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200)
    }

    next()
  }
}
