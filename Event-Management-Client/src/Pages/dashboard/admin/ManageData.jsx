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
      const response = await axios.get(
        "https://event-management-server.vercel.app/products"
      );
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
      {" "}
      <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>{" "}
      <div className="overflow-x-auto">
        {" "}
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          {" "}
          <thead>
            {" "}
            <tr>
              {" "}
              <th className="px-4 py-2 border border-gray-300">Image</th>{" "}
              <th className="px-4 py-2 border border-gray-300">Hall Name</th>{" "}
              <th className="px-4 py-2 border border-gray-300">Location</th>{" "}
              <th className="px-4 py-2 border border-gray-300">
                Available Dates
              </th>{" "}
              <th className="px-4 py-2 border border-gray-300">
                decoration Packages
              </th>{" "}
              <th className="px-4 py-2 border border-gray-300">
                food packages
              </th>{" "}
              <th className="px-4 py-2 border border-gray-300">Status</th>{" "}
              <th className="px-4 py-2 border border-gray-300">Action</th>{" "}
            </tr>{" "}
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-2 border border-gray-300">
                  <img
                    src={product.hallImage}
                    alt={product.hallName}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {product.hallName}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {product.hallLocation}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {product.availableDate}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {product.decorationPackages}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {product.foodPackages}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {product.status}
                </td>
                <td className="px-4 py-2 border border-gray-300">
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    handleApproval(
                      product._id,
                      product.status === "approved" ? "pending" : "approved"
                    )
                  }
                  className={`btn btn-sm ${
                    product.status === "approved" ? "btn-error" : "btn-success"
                  }`}
                >
                  {product.status === "approved" ? "Deny" : "Approve"}
                </button>
                <button
                  onClick={() => handleFeedbackModal(product._id)}
                  className="btn btn-sm btn-primary"
                >
                  Feedback
                </button>
              </div>
            </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Feedback</span>
              </label>
              <textarea
                className="textarea h-24 textarea-bordered"
                placeholder="Enter your feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-action">
              <button
                onClick={handleSendFeedback}
                className="btn btn-primary"
                disabled={!feedback}
              >
                Send
              </button>
              <button onClick={() => setShowModal(false)} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageData;