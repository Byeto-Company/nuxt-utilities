import { useRuntimeConfig } from '#imports'

const useBaseUrl = () => {
    const config = useRuntimeConfig();
    return config.public.API_BASE_URL;
};

export default useBaseUrl;
