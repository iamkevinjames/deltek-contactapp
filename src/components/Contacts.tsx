import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  tableCellClasses,
  styled,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import React, { useEffect } from "react";
import axios from "axios";
import { ContactResponseModal } from "../modal/ContactModal";
import { useContactContext } from "../App";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function Contacts() {
  const { contactList, setContactList, setCurrentContact } =
    useContactContext();

  useEffect(() => {
    const contacts = axios({
      url: "https://localhost:7232/getContactsList",
      method: "GET",
    })
      .then((response) => {
        setContactList(response.data);
        return response;
      })
      .catch((error) => console.log(error));

    console.log(contacts);
  }, [setContactList]);

  const onEdit = (contact: ContactResponseModal) => {
    setCurrentContact(contact);
  };

  const onDelete = (id: string) => {
    axios({
      url: `https://localhost:7232/deleteContact?id=${id}`,
      method: "DELETE",
    })
      .then((response) => {
        setContactList(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="m-auto p-4 m-4 col-sm-12 col-md-11 col-lg-8">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow className="row">
              <StyledTableCell className="col-1">Sl. No.</StyledTableCell>
              <StyledTableCell className="col-4">Contact Name</StyledTableCell>
              <StyledTableCell className="col-2">
                Contact Number
              </StyledTableCell>
              <StyledTableCell className="col-2">Location</StyledTableCell>
              <StyledTableCell className="col-1">Edit</StyledTableCell>
              <StyledTableCell className="col-1">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contactList.map((contact, index) => (
              <StyledTableRow key={contact.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {contact.contactName}
                </StyledTableCell>
                <StyledTableCell>{contact.contactNumber}</StyledTableCell>
                <StyledTableCell>{contact.location}</StyledTableCell>
                <StyledTableCell role="button">
                  <div onClick={(event) => onEdit(contact)}>
                    <Edit />
                  </div>
                </StyledTableCell>
                <StyledTableCell role="button">
                  <div onClick={(event) => onDelete(contact.id)}>
                    <Delete />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Contacts;
