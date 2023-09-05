import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';


const useProducts = () => {
    const { user } = useAuth();


    console.log("Client Email: ", user?.email);


    const { refetch, data: products = [] } = useQuery({
        queryKey: ['getProducts', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://event-management-server.vercel.app/products/organizer?organizerEmail=${user?.email}`)
            return res.json();
        },
    })


    console.log(products);


    return [products, refetch]
};


export default useProducts;
