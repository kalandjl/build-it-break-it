"use client"
import { FormEvent, useState } from "react"

const Home = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const response = await fetch(`http://localhost:4000/api/auth/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        email: email,
                        password: password,
                        username: username
                    }
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "An error occurred during login")
            }

            setSuccess(true)
            console.log("Login Succeeded:", data)

        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email-input" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="email-input" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="username"
                        id="username-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="password-input" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                        disabled={isLoading}
                    />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
                
                {success && <p className="text-sm text-green-600">User creation successful!</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Creating user...' : 'Sign Up'}
                </button>
            </form>
        </div>
    )
}

export default Home