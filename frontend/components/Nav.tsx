import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";

const Nav = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between flex-wrap bg-white p-5 shadow-lg px-10">
      <div
        onClick={() => router.push("/")}
        className="flex items-center flex-shrink-0 cursor-pointer text-white mr-6 hoverAnimation"
      >
        <Image
          className="fill-current h-8 w-8 mr-2"
          width="80"
          height="80"
          src="/images/lego2me.png"
          alt="lego2me logo"
        ></Image>
        <span className="ml-3 font-bold tracking-tight text-3xl text-black font-Montserrat">
          Lego2me
        </span>
      </div>
      <div>
        <div>
          <Button
            component="span"
            variant="contained"
            color="error"
            onClick={handleOpen}
          >
            Get Started
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Image Upload
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please put a picture of your whole body or upper body.
              </Typography>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <Button
                  variant="contained"
                  color="error"
                  component="span"
                  className="mt-4"
                >
                  Upload
                </Button>
              </label>
            </Box>
          </Modal>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
