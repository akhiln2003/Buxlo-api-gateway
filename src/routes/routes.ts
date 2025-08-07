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
        url: '/api/payment',
        auth:true,
        proxy:{
            target: `${process.env.PAYMENT_SERVICE_URL}/payment`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/chat',
        auth:true,
        proxy:{
            target: `${process.env.CHAT_SERVICE_URL}/chat`,
            changeOrigin: true,
        }
    },
     {
        url: '/api/notification',
        auth:true,
        proxy:{
            target: `${process.env.NOTIFICATION_SERVICE_URL}/notification`,
            changeOrigin: true,
        }
    },
    {
        url: '/api/booking',
        auth:true,
        proxy:{
            target: `${process.env.BOOKING_SERVICE_URL}/booking`,
            changeOrigin: true,
        }
    }
    
    
]