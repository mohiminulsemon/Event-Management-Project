import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const AddData = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Set the status field to 'pending'
      data.status = "pending";
      data.organizerEmail = user?.email;

      const response = await fetch("https://event-management-server.vercel.app/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response);
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        // Reset the form after a successful addition
        reset();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Class added successfully.",
          showConfirmButton: false,
          timer: 1500,
        });

        // Navigation to desired page
        // navigate(from, { replace: true });
      } else {
        console.error("Server responded with an error:", response.status);
      }
    } catch (error) {
      console.error("Error while sending data to the server:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Data</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="hallName" className="block font-medium mb-1">
            Hall name
          </label>
          <input
            {...register("hallName", { required: "Hall name is required" })}
            type="text"
            id="hallName"
            className="w-full border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          />
          {errors.hallName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.hallName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="hallLocation" className="block font-medium mb-1">
            Hall location
          </label>
          <input
            {...register("hallLocation", {
              required: "Hall location is required",
            })}
            type="text"
            id="hallLocation"
            className="w-full border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          />
          {errors.hallLocation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.hallLocation.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="hallImage" className="block font-medium mb-1">
            Hall image
          </label>
          <input
            {...register("hallImage", { required: "Hall image is required" })}
            type="text"
            id="hallImage"
            className="w-full border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          />
          {errors.hallImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.hallImage.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="availableDate" className="block font-medium mb-1">
            Available date
          </label>
          <input
            {...register("availableDate", {
              required: "Available date is required",
            })}
            type="date"
            id="availableDate"
            className="w-full border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          />
          {errors.availableDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.availableDate.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="organizerEmail" className="block font-medium mb-1">
            Organizer email
          </label>
          <input
            {...register("organizerEmail")}
            type="email"
            id="organizerEmail"
            defaultValue={user?.email}
            readOnly
            className="w-full border-gray-300 rounded-md p-2 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="decorationPackages"
            className="block font-medium mb-1"
          >
            Decoration Packages
          </label>
          <textarea
            {...register("decorationPackages")}
            id="decorationPackages"
            rows="3"
            className="w-full border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="decorationPrice" className="block font-medium mb-1">
            Decoration Price
          </label>
          <input
            {...register("decorationPrice", {
              required: "Decoration price is required",
            })}
            type="number"
            id="decorationPrice"
            className="w-full border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          />
          {errors.decorationPrice && (
            <p className="text-red-500 text-sm mt-1">
              {errors.decorationPrice.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="foodPackages" className="block font-medium mb-1">
            Food Packages
          </label>
          <textarea
            {...register("foodPackages")}
            id="foodPackages"
            rows="3"
            className="w-full border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="foodPrice" className="block font-medium mb-1">
            Food Price
          </label>
          <input
            {...register("foodPrice", { required: "Food price is required" })}
            type="number"
            id="foodPrice"
            className="w-full border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          />
          {errors.foodPrice && (
            <p className="text-red-500 text-sm mt-1">
              {errors.foodPrice.message}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Add Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddData;
