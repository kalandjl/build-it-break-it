"use client"
import User from "@/types/User"
import { useUser } from "@/util/useUser"
import { useParams, useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"


const UserProfile: FC<{data: User}> = ({ data }) => {

    console.log(data)

    return (
        <div id="user-profile"> 
            <h1 className="text-lg font-bold">
                {data.username}
            </h1>
            <h1>
                {data.email}
            </h1>
        </div>
    )
}

const Page = () => {

    const query = useParams()

    const { id } = query

    const [userObj, setUserObj] = useState<undefined | User>(undefined)
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState<undefined | unknown>(undefined)

    useEffect(() => {

        const token = window.localStorage.getItem("accessToken")

        if (!token) return setFetchError("You must be signed in to view other users")

        if (!id) return

        setLoading(true)

        const doAsync = async () => {

            const res = await fetch(`http://localhost:4000/api/auth/get-user`, {
                method: "POST",
                body: JSON.stringify({
                    id: id.toString()
                }),
                headers: {
                    // Include the token in the Authorization header
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            })

            const user = (await res.json()).user

            setUserObj(user)
        }   

        try {
            doAsync()
        } catch (e) {
            setFetchError(e)
        }

        setLoading(false)

    }, [])

    return (
        <>
            {
                loading 
                ?
                <>
                Loading user...
                </>
                : 
                    userObj
                    ?
                    <UserProfile data={userObj} />
                    :
                    
                        fetchError 
                        ? 
                        <>
                        {`Error fetching user: ${fetchError}`}
                        </>
                        :
                        <>
                        </>
            }
        </>
    )
}



export default Page