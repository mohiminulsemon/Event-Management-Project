import { useState, useEffect } from "react";
import axios from "axios";
import "daisyui/dist/full.css";

const ManageData = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [currentEventId, setCurrentEventId] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://event-management-server.vercel.app/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle approving or denying a class
  const handleApproval = async (EventId, status) => {
    try {
      const response = await axios.patch(
        `https://event-management-server.vercel.app/products/${EventId}`,
        { status }
      );

      // Update the class status on the client-side after successful server update
      const updatedClasses = products.map((product) =>
        product._id === EventId ? { ...product, status } : product
      );
      setProducts(updatedClasses);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFeedbackModal = (EventId) => {
    setCurrentEventId(EventId); // Set the current class ID
    setShowModal(true); // Open the feedback modal
  };

  const handleSendFeedback = async () => {
    try {
      console.log("Feedback:", feedback);

      const response = await axios.post(
        `https://event-management-server.vercel.app/products/${currentEventId}/feedback`,
        { feedback }
      );

      const updatedClasses = products.map((product) =>
        product._id === currentEventId ? { ...product, feedback } : product
      );
      setProducts(updatedClasses);

      // Reset the feedback state and hide the modal
      setFeedback("");
      setCurrentEventId("");
      setShowModal(false);
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Hall Name</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Available Dates</th>
              <th className="px-4 py-2">decoration Packages</th>
              <th className="px-4 py-2">decoration price</th>
              <th className="px-4 py-2">food packages</th>
              <th className="px-4 py-2">food price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-2">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="px-4 py-2">{product.hallName}</td>
                <td className="px-4 py-2">{product.hallLocation}</td>
                <td className="px-4 py-2">{product.availableDate}</td>
                <td className="px-4 py-2">{product.decorationPackages}</td>
                <td className="px-4 py-2">{product.decorationPrice}</td>
                <td className="px-4 py-2">{product.foodPackages}</td>
                <td className="px-4 py-2">{product.foodPrice}</td>
                <td className="px-4 py-2">{product.status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() =>
                      handleApproval(
                        product._id,
                        product.status === "approved" ? "pending" : "approved"
                      )
                    }
                    className={`btn btn-ghost ${
                      product.status === "approved"
                        ? "btn-denied"
                        : "btn-approved"
                    }`}
                  >
                    {product.status === "approved" ? "Deny" : "Approve"}
                  </button>

                  <button
                    onClick={() => handleFeedbackModal(product._id)}
                    className="btn btn-ghost"
                  >
                    Send Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Send Feedback</h3>
            <textarea
              className="block w-full px-4 py-2 mb-4 resize-none border rounded-md"
              rows="4"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={() => handleSendFeedback()}
                className="btn-action btn-send-feedback mr-2"
              >
                Send
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn-action btn-cancel-feedback"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageData;