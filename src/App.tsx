import "./App.css";
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import { createContext, useContext, useState } from "react";
import { ContactResponseModal } from "./modal/ContactModal";
import DialogBox from "./components/DialogBox";

export interface ContactsList {
  open: boolean;
  setOpen: (c: boolean) => void;
  contactList: ContactResponseModal[];
  setContactList: (c: ContactResponseModal[]) => void;
  currentContact?: ContactResponseModal;
  setCurrentContact: (c: ContactResponseModal) => void;
}

export const emptyContact: ContactResponseModal = {
  id: "",
  contactName: "",
  contactNumber: "",
  location: "",
};

export const ContactContext = createContext<ContactsList>({
  open: false,
  setOpen: () => {},
  contactList: [],
  setContactList: () => {},
  currentContact: { id: "", contactName: "", contactNumber: "", location: "" },
  setCurrentContact: () => {},
});
export const useContactContext = () => useContext(ContactContext);

function App() {
  const [contactList, setContactList] = useState<ContactResponseModal[]>([]);
  const [currentContact, setCurrentContact] = useState<ContactResponseModal>();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <ContactContext.Provider
      value={{
        open,
        setOpen,
        contactList,
        setContactList,
        currentContact,
        setCurrentContact,
      }}
    >
      <ContactForm />
      <Contacts />
      <DialogBox />
    </ContactContext.Provider>
  );
}

export default App;
