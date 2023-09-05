import axios from "axios";
import useAllData from "../../../Hooks/useAllData";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const SelectedData = () => {
  const [productsPage, refetch] = useAllData();

  const total = productsPage.reduce(
    (sum, item) => sum + parseFloat(item.foodPrice),
    0
  );
  // console.log(total);
  const price = total.toFixed(2);
  console.log(price);

  const handlePay = (id) => {
    console.log(`Paid for item with ID: ${id}`);
  };

  // Function to handle the "Delete" button click
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://event-management-server.vercel.app/selectedProducts/${id}`);
      console.log(`Deleting product with ID: ${id}`);

      refetch();

      Swal.fire({
        icon: "success",
        title: "Product Deleted",
        text: "The product has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }

    console.log(`Deleted item with ID: ${id}`);
  };


  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-semibold mb-4 text-center">Booked Data</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productsPage.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-lg">
            <img
              src={item.hallImage}
              alt={item.hallName}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <p className="text-lg font-semibold">{item.hallName}</p>
            <p className="text-sm text-gray-600 mb-2">
              Location: {item.hallLocation}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Available Date: {item.availableDate}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Decoration Packages: {item.decorationPackages}
            </p>
           
            <p className="text-sm text-gray-600 mb-2">
              Food Packages: {item.foodPackages}
            </p>
         
            <p className="text-sm text-gray-600 mb-2">
              Pay Status: {item.payStatus}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Price: {item.price}
            </p>
            <Link to="/dashboard/payment">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
            onClick={() => handlePay(item._id)}
          >
            {
              item.payStatus === "unpaid" ? `Pay :  ${item.price} tk` : 'paid'
            }
           
          </button>
        </Link>
            <button
              onClick={() => handleDelete(item._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedData;
