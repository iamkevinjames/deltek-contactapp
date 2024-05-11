import React, { useState, useEffect } from "react";
import { Button, TextField, Card, Typography } from "@mui/material";
import {
  ContactRequestModal,
  ContactResponseModal,
} from "../modal/ContactModal";
import axios from "axios";
import { emptyContact, useContactContext } from "../App";
import { error } from "console";

function ContactForm() {
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [location, setLocation] = useState("");

  const { setContactList, currentContact, setCurrentContact, setOpen } =
    useContactContext();

  const addContact = () => {
    const createContact: ContactRequestModal = {
      contactName: contactName,
      contactNumber: contactNumber,
      location: location,
    };
    const updateContact: ContactResponseModal = {
      id: currentContact?.id ?? "",
      contactName: contactName,
      contactNumber: contactNumber,
      location: location,
    };
    if (contactName && contactNumber && location) {
      if (contactNumber.length === 10) {
        axios({
          url: `https://localhost:7232/${
            currentContact?.id ? "updateContact" : "addContact"
          }`,
          method: currentContact?.id ? "PUT" : "POST",
          data: currentContact?.id ? updateContact : createContact,
        })
          .then((response) => {
            setContactList(response.data);
            setContactName("");
            setContactNumber("");
            setLocation("");
            setCurrentContact(emptyContact);
          })
          .catch((error) => console.log(error));
      } else {
        setOpen(true);
      }
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    setContactName(currentContact?.contactName ?? "");
    setContactNumber(currentContact?.contactNumber ?? "");
    setLocation(currentContact?.location ?? "");
  }, [currentContact]);

  return (
    <div className="bg-white position-sticky top-0">
      <div className="col-10 col-sm-8 col-md-6 col-lg-4 m-auto mt-5">
        <Card className="d-flex flex-column  p-3 gap-2">
          <Typography className="text-center" variant="h4" component="h2">
            Contact
          </Typography>
          <TextField
            type="text"
            label="Name"
            variant="standard"
            required={true}
            InputLabelProps={{
              shrink: true,
            }}
            value={contactName}
            onChange={(event) => setContactName(event.target.value)}
          />
          <TextField
            type="text"
            label="Mobile Number"
            variant="standard"
            required={true}
            InputLabelProps={{
              shrink: true,
            }}
            value={contactNumber}
            onChange={(event) =>
              setContactNumber(() => {
                if (
                  (event.target.value === "" ||
                    !Number.isNaN(parseInt(event.target.value))) &&
                  (contactNumber.length < 10 || event.target.value.length < 10)
                ) {
                  return event.target.value;
                }
                return contactNumber;
              })
            }
          />
          <TextField
            type="text"
            label="Location"
            variant="standard"
            required={true}
            InputLabelProps={{
              shrink: true,
            }}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
          <Button variant="outlined" onClick={addContact}>
            {currentContact?.id ? "Update" : "Add"} Contact
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default ContactForm;
