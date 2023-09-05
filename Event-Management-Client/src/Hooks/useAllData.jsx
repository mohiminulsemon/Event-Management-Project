import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';


const useAllData = () => {
    const { user, loading } = useAuth();


    console.log("Client Email from useAllProducts: ", user?.email);


    const { refetch, data: productsPage = [] } = useQuery({
        queryKey: ['allProducts', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`https://event-management-server.vercel.app/selectedProducts/${user.email}`)
            return res.json();
        },
    })


    console.log(productsPage);


    return [productsPage, refetch]

};


export default useAllData;
