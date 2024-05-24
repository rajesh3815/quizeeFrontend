import { createContext, useEffect, useState } from "react";

export const quizContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isOpen, setisOpen] = useState(true);
  const [updateData, setupdateData] = useState({});
  const [isedit, setIsedit] = useState(false);
  const [updateTimer, setUpdateTimer] = useState("off");
  const [deleteId, setdeleteId] = useState();
  const [deleteModal, setdeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(true);
  const [documentId, setDocumentId] = useState();
  return (
    <>
      <quizContext.Provider
        value={{
          isOpen,
          setisOpen,
          updateData,
          setupdateData,
          isedit,
          setIsedit,
          updateTimer,
          setUpdateTimer,
          deleteId,
          setdeleteId,
          deleteModal,
          setdeleteModal,
          successModal,
          setSuccessModal,
          documentId,
          setDocumentId,
        }}
      >
        {children}
      </quizContext.Provider>
    </>
  );
};
