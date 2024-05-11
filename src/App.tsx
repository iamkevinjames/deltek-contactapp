import "./App.css";
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import { createContext, useContext, useState } from "react";
import { ContactResponseModal } from "./modal/ContactModal";

export interface ContactsList {
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
  contactList: [],
  setContactList: () => {},
  currentContact: { id: "", contactName: "", contactNumber: "", location: "" },
  setCurrentContact: () => {},
});
export const useContactContext = () => useContext(ContactContext);

function App() {
  const [contactList, setContactList] = useState<ContactResponseModal[]>([]);
  const [currentContact, setCurrentContact] = useState<ContactResponseModal>();
  return (
    <ContactContext.Provider
      value={{ contactList, setContactList, currentContact, setCurrentContact }}
    >
      <ContactForm />
      <Contacts />
    </ContactContext.Provider>
  );
}

export default App;
