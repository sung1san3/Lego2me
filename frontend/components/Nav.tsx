import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled, SxProps, Theme } from "@mui/material/styles";
import { isMainThread } from "worker_threads";
import axios from "axios";
import FormData from "form-data";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { hairState, topState, bottomState } from "../recoil/states";

const Nav: React.FunctionComponent = () => {
  const router = useRouter();

  // 구독하는 아톰의 값만 반환한다.
  const hairStateValue = useRecoilValue(hairState);
  const topStateValue = useRecoilValue(topState);
  const bottomStateValue = useRecoilValue(bottomState);

  // 값을 변경하는 함수만 반환
  const setTopUseSetRecoilState = useSetRecoilState(topState);
  const setBottomUseSetRecoilState = useSetRecoilState(bottomState);

  // 설정된 기본값으로 리셋
  const resetHair = useResetRecoilState(hairState);
  const resetTop = useResetRecoilState(topState);
  const resetBottom = useResetRecoilState(bottomState);

  // Image Upload Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const Input = styled("input")({
    display: "none",
  });
  const sxBox: SxProps<Theme> = (theme: Theme) => {
    return {
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
  };

  const setFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files instanceof FileList) {
      const fd = new FormData();
      const upload_file = e.target.files[0];
      console.log(upload_file);
      fd.append("img", upload_file);
      //fd.append("title", upload_file.name);

      //이미지 업로드 체크를 해당 api로 대체
      axios.get("http://localhost:8001/movies/5").then((res) => {
        const imgPathTop = "/items/top/";
        const imgPathBottom = "/items/bottom/";

        const objTop = res.data.top;
        const objBottom = res.data.bottom;

        const resultTop = "".concat(imgPathTop, objTop, ".png");
        const resultBottom = "".concat(imgPathBottom, objBottom, ".png");

        console.log(resultTop);
        console.log(resultBottom);

        if (
          hairStateValue !== "/items/default.png" ||
          topStateValue !== "/items/default.png" ||
          bottomStateValue !== "/items/default.png"
        ) {
          resetHair();
          resetTop();
          resetBottom();
        }
        setTopUseSetRecoilState(`${resultTop}`);
        setBottomUseSetRecoilState(`${resultBottom}`);
        router.push("/result");
      });
    }
  };

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
            <Box sx={sxBox}>
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
                  onChange={(e) => setFile(e)}
                />
                <Button
                  variant="contained"
                  color="error"
                  component="span"
                  className="mt-4"
                  // onClick={uplodeFile}
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
