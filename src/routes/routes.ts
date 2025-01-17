require('dotenv').config();

export const ROUTES = [
    {
        url: '/api/auth/admin/profile/fetchusers',
        auth: true,
        proxy: {
            target: `${process.env.AUTH_SERVICE_URL}/auth/admin/profile/fetchusers`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/auth/admin/profile/fetchmentor',
        auth: true,
        proxy: {
            target: `${process.env.AUTH_SERVICE_URL}/auth/admin/profile/fetchmentor`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/auth',
        auth: false,
        proxy: {
            target: `${process.env.AUTH_SERVICE_URL}/auth`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/user',
        auth:true,
        proxy:{
            target: `${process.env.USER_SERVICE_URL}/user`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/user',
        auth:false,
        proxy:{
            target: `${process.env.USER_SERVICE_URL}/user`,
            changeOrigin: true,
        }
    }
    
    
]