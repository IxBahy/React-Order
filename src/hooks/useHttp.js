import { useState, useCallback } from "react";
const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (configrations, preprocessorFunction) => {
        setIsLoading(true)
        try {
            const response = await fetch(
                configrations.url,
                {
                    method: configrations.method ? configrations.method : 'GET',
                    headers: configrations.headers ? configrations.headers : {},
                    body: configrations.body ? JSON.stringify(configrations.body) : null,
                }
            )
            if (!response.ok) {
                throw new Error('request failed')
            }

            const data = await response.json()
            preprocessorFunction(data)
        } catch (e) {
            setError(e.message || 'something went wrong')
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 700);

    }, [])


    return {
        error,
        isLoading,
        sendRequest
    };
}

export default useHttp