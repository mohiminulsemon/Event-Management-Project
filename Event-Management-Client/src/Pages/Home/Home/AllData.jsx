import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const AllData = () => {
  
  const [products, setProducts] = useState([]);
  const { user, role } = useAuth();
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user && role !== "admin" && role !== "organizer") {
      fetchSelectedProducts();
    }
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://event-management-server.vercel.app/products"
      );
      setProducts(
        response.data.filter((productData) => productData.status === "approved")
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSelectedProducts = async () => {
    try {
      const response = await axios.get(
        `https://event-management-server.vercel.app/selectedProducts/${user.email}`
      );
      setSelectedProducts(
        response.data.map((selectedProducts) => selectedProducts.productId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectedProducts = async (productId, productItem) => {
    try {
      // Check if the class is already selected by the current user
      if (selectedProducts.includes(productId)) {
        Swal.fire({
          icon: "info",
          title: "Product Already Selected",
          text: "You have already selected this Product.",
        });
        return; // Exit the function if already selected
      }

      try {
        // Assuming productItem is an object containing the product details
        const {
          _id,
          hallName,
          hallLocation,
          hallImage,
          availableDate,
          decorationPackages,
          
          foodPackages,
          price,
        } = productItem;

        // Send the _id field as the product id
        await axios.post(
          "https://event-management-server.vercel.app/selectedProducts/",
          {
            productId: _id,
            hallName,
            hallLocation,
            hallImage,
            availableDate,
            decorationPackages,
            
            foodPackages,
            price,
            bookingEmail: user?.email,
            payStatus: "unpaid",
          }
        );
      } catch (error) {
        // Handle errors
      }

      Swal.fire({
        icon: "success",
        title: "Product Selected!",
        text: "You have successfully selected the product.",
      });

      console.log("Class:", productItem);

      // Update the selected products state for the current user
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        productId,
      ]);
    } catch (error) {
      console.error("Error selecting class:", error);
      // Handle error, if any
    }
  };

  return (
    <div>
      <div className="container mx-auto mt-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Get Your events</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((hall) => (
            <div
              key={hall._id}
              className={`bg-gray-200 p-4 rounded-lg ${
                hall.payStatus === "paid" ? "bg-red-200" : ""
              }`}
            >
              <img
                src={hall.hallImage}
                alt={hall.hallName}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <p className="text-lg font-semibold">{hall.hallName}</p>
              <p className="text-sm text-gray-600 mb-2">
                Location: {hall.hallLocation}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Available Date: {hall.availableDate}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Decoration Packages: {hall.decorationPackages}
              </p>

              <p className="text-sm text-gray-600 mb-2">
                Food Packages: {hall.foodPackages}
              </p>

              <p className="text-sm text-gray-600 mb-4">Price: {hall.price} tk</p>

              {user ? (
                role !== "admin" && role !== "organizer" && hall.payStatus !== "paid" ? (
                  <button
                    onClick={() => handleSelectedProducts(hall._id, hall)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full disabled:opacity-50"
                  >
                    Select
                  </button>
                ) : (
                  <p className="text-red-500">
                    {hall.payStatus === "paid" ? "Not available" : ""}
                  </p>
                )
              ) : (
                <p className="text-red-500">
                  <Link to="/login" className="btn btn-error">
                    <button>Log in to Purchase</button>
                  </Link>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllData;
