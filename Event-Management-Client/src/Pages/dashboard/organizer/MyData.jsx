import useAuth from "../../../Hooks/useAuth";
import useProducts from "../../../Hooks/useProducts";


const MyData = () => {
  const [products] = useProducts();
  const { user } = useAuth(); // Get the logged-in user from your useAuth hook

  const filteredProducts = products.filter(
    (product) => product.organizerEmail === user?.email
  );

  const handleUpdate = (productId) => {
    // Implement your update logic here
    console.log(`Update clicked for product with ID: ${productId}`);
  };

  return (
    <div className="flex flex-col items-center m-4">
      <div className="text-center text-xl font-bold mb-4">My added lists are here</div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Feedback</th>
            <th className="border px-4 py-2">Update</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((productData) => (
            <tr key={productData._id} className={productData?.status === 'denied' ? 'bg-red-200' : 'bg-white'}>
              <td className="border px-4 py-2">
                <img src={productData?.hallImage} alt={productData?.hallName} className="w-12 h-12 rounded-full" />
              </td>
              <td className="border px-4 py-2">{productData?.hallName}</td>
              <td className="border px-4 py-2">{productData?.availableDate}</td>
              <td className="border px-4 py-2">{productData?.price}</td>
              <td className="border px-4 py-2">{productData?.status}</td>
              <td className="border px-4 py-2">{productData?.feedback ? productData.feedback : "N/A"}</td>
              <td className="border px-4 py-2">
                {
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() => handleUpdate(productData._id)}
                  >
                    Update
                  </button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyData;
