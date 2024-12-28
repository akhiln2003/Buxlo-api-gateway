require('dotenv').config();

export const ROUTES = [
    {
        url: '/api/auth',
        auth: false,
        proxy: {
            target: `${process.env.AUTH_SERVICE_URL}/auth`,
            changeOrigin: true,
        }
    },
    
    
    
   
]