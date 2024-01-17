import React, { useState } from "react";
import "./messages.scss";
import api from "../../api/posts";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProgressBar } from "react-loader-spinner";
import { toast } from "react-toastify";
import { convertDateTime } from "../../../helpers/DateFns";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";

const Messages = () => {
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleDelete = (id) => {
    setSelectedItemId(id);
    setConfirmationVisible(true);
  };

  const handleConfirmDelete = () => {
    mutation.mutate(selectedItemId);
    setConfirmationVisible(false);
  };

  const handleCancelDelete = () => {
    setSelectedItemId(null);
    setConfirmationVisible(false);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => {
      return api.delete(`contacts/${id}`);
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries(["contacts"])
        .then(toast.success("Uğurla silindi"));
    },
  });

  const { isLoading, data } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => api.get("contacts"),
  });

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      const truncatedText = text.slice(0, maxLength);
      const lastSpaceIndex = truncatedText.lastIndexOf(" ");

      if (lastSpaceIndex !== -1 && lastSpaceIndex < maxLength - 1) {
        return truncatedText.slice(0, lastSpaceIndex) + "...";
      } else {
        return truncatedText + "...";
      }
    }
  };

  return (
    <div className="adminRent">
      <h4>Müraciətlər</h4>

      <div className="tableContent">
        <table>
          <thead>
            <tr>
              <th>Soyad *</th>
              <th style={{ width: "110px", padding: "12px" }}>E-poçt *</th>
              <th>Mobil nömrə *</th>
              <th>Qeyd *</th>
              <th>Tarix *</th>
              <th style={{ width: "100px" }}>Parametrlər</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div className="progressBar">
                <ProgressBar
                  height="80"
                  width="80"
                  ariaLabel="progress-bar-loading"
                  wrapperStyle={{}}
                  wrapperClass="progress-bar-wrapper"
                  borderColor="white"
                  barColor="#51E5FF"
                />
              </div>
            ) : (
              data.data?.map((item) => (
                <tr key={item?.id}>
                  <td>{truncateText(item?.full_name, 300)}</td>
                  <td>{item?.email}</td>
                  <td>{truncateText(item?.number, 300)}</td>
                  <td>{item?.note}</td>
                  <td>{convertDateTime(item?.created_at)}</td>
                  <td style={{ margin: "auto", padding: "0 40px" }}>
                    <button onClick={() => handleDelete(item?.id)}>
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {confirmationVisible && <ConfirmModal title={"Müraciəti"} handleConfirmDelete={handleConfirmDelete} handleCancelDelete={handleCancelDelete}/> }
      </div>
    </div>
  );
};

export default Messages;
