// hooks/useUser.ts
"use client"

import User from '@/types/User'
import { useState, useEffect } from 'react'

interface UseUserReturn {
    user: User | null
    isLoading: boolean
    error: string | null
}

export const useUser = (): UseUserReturn => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUser = async () => {

            // Get the token from localStorage
            const token = window.localStorage.getItem('accessToken')

            // If no token is found, the user is not logged in
            if (!token) {
                setIsLoading(false)
                return
            }

            try {
                const response = await fetch('http://localhost:4000/api/auth/me', {
                    headers: {
                        // Include the token in the Authorization header
                        'Authorization': `Bearer ${token}`
                    }
                })

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch user data')
                }

                setUser(data.user)

            } catch (err: any) {
                setError(err.message)
                // If there's an error (e.g., token expired), clear the token
                console.error(err)
                // localStorage.removeItem('accessToken')
            } finally {
                setIsLoading(false)
            }
        }

        fetchUser()
    }, []) // The empty dependency array means this runs once when the component mounts

    return { user, isLoading, error }
}