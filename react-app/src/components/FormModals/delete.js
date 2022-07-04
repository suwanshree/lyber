// import { useDispatch } from "react-redux";
// import { removeListing } from "../../store/listing";
// import { useHistory } from "react-router-dom";

// function DeleteListingModal({ hideModal, listing }) {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(removeListing(listing.id));
//     hideModal();
//     history.push("/listings");
//   };
//   const handleCancelClick = (e) => {
//     e.preventDefault();
//     hideModal();
//   };

//   return (
//     <div className="delete-listing-modal">
//       <form className="delete-listing-form" onSubmit={handleSubmit}>
//         <h3>
//           Are you sure you want to delete your "
//           <span id="delete-listing-title">{listing.title}</span>" Listing?
//         </h3>
//         <div id="delete-listing-buttons">
//           <button id="delete-button" type="submit">
//             Confirm Delete
//           </button>
//           <button id="cancel-button" onClick={handleCancelClick}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default DeleteListingModal;
